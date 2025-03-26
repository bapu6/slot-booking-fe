/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
//app imports
import Paginator from '../../core/Paginator';
import { userInfoService } from '../../services/userInfo.service';
import Filter from './Filter';
import { calculate_age } from '../../utils/functions'
import { IFilter, IUserInfo } from '../../interfaces/app.interface';
import { IStore } from '../../interfaces/store';
import { CURRENT_PAGE, PAGE_LIMIT, TOTAL_PAGES } from '../../utils/constants';


const Patients: React.FC = () => {
    const navigate = useNavigate();
    const { data: user } = useSelector((store: IStore) => store.user);
    const [loading, setLoading] = useState(false);

    //List of patients
    const [patients, setPatients] = useState<IUserInfo[]>([]);

    //Filter state
    const [filter, setFilter] = useState<{ name: string }>({ name: '' });
    const handleFilter = (values: IFilter) => {
        console.log(filter)
        setFilter(values);
    };

    //Pagination state
    const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);
    const [totalPages, setTotalPages] = useState(TOTAL_PAGES);
    const [pageLimit, setPageLimit] = useState(PAGE_LIMIT);
    const [totalPatients, setTotalPatients] = useState<number>();

    //handles Patients Pagination
    const handlePagination = (page: number, limit: any) => {
        console.log(limit)
        setCurrentPage(page);
        setPageLimit(limit);
    };

    //Fetch list of Patients
    const getPatients = async () => {
        setLoading(true);
        const patientsResponse: any = await userInfoService.fetchPatients(user._id!, currentPage, pageLimit, filter);
        if (patientsResponse) {
            setPatients(patientsResponse.patients);
            setTotalPages(Math.ceil(patientsResponse?.length / pageLimit))
            setTotalPatients(patientsResponse.length);
        }
        setLoading(false);
    };

    //Get Patients on component load
    useEffect(() => {
        getPatients();
    }, [currentPage, pageLimit, filter.name!]);

    //On load 
    if (loading) return <Loader />

    return (
        <div className=' flex-1 sm:flex-col gap-4 p-5 text-gray-600'>
            <div className='flex justify-between items-center text-gray-900'>
                <h1 className='text-3xl'>Assigned Patients</h1>
                <div className='bg-slate-400 p-4 rounded-3xl text-center '>
                    <strong>Total Patients </strong>
                    <p className='text-4xl'>  {String(totalPatients).padStart(4, '0')}</p>
                </div>
            </div>
            <div className='flex  text-gray-600 justify-between items-center'>
                <Filter onFilter={handleFilter}></Filter>
                <div className='flex flex-col sm:justify-end sm:items-end mb-5'>
                    <Paginator currentPage={currentPage} totalPages={totalPages} pageLimit={pageLimit} handlePagination={handlePagination} />
                </div>
            </div>

            <table className='border-2 border-gray-500 w-full mt-2'>
                <tbody>
                    <tr className=' text-center bg-slate-400 text-gray-800'>
                        <th className='py-2'>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th></th>
                    </tr >
                    {patients.map(patient => (
                        <tr key={patient._id} className='border-2 border-gray-500 text-center'>
                            <td>{patient.name}</td>
                            <td>{calculate_age(new Date(patient.dob))}</td>
                            <td>{patient.gender}</td>
                            <td className='py-1'>
                                <button className='px-3 py-1 w-fit rounded-3xl f border-blue-500 text-blue-500 hover:bg-blue-600
               hover:text-white'   onClick={() => navigate('/activity', { state: { patient } })}>
                                    See Activity
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Patients;