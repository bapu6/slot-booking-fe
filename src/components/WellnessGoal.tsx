import { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import { useSelector } from 'react-redux';
import { IStore } from '../interfaces/store';
import { IUser } from '../interfaces/user';
import { customFetch } from '../utils/api';
import EditForm from './EditForm';
import { IGoal } from '../interfaces/goal';

const WellnessGoal = () => {
    const { data: currentUser } = useSelector((store: IStore) => store.user);
    const [goal, setGoal] = useState({ steps: 0, sleepHours: 0, waterIntake: 0, createdAt: '', updatedAt: '' });
    const [currentProgress, setCurrentProgress] = useState({ steps: 0, sleepHours: 0, waterIntake: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProgress, setUpdatedProgress] = useState(currentProgress);

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const response = await customFetch<null, IUser>({
                    path: `goals/${currentUser?._id}`,
                    method: 'GET'
                });
                if (response.success) {
                    setGoal(response?.data as unknown as IGoal);
                    setCurrentProgress(response?.data as unknown as IGoal); // Assuming current progress is part of the goal data
                }
            } catch (error) {
                console.error('Error fetching goal:', error);
            }
        };

        if (currentUser?._id) {
            fetchGoal();
        }
    }, [currentUser]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setUpdatedProgress({
            ...updatedProgress,
            [name]: value
        });
    };

    const handleSaveClick = async () => {
        console.log('goal.updatedAt', goal.updatedAt)
        try {
            const response = await customFetch({
                path: `patients/${currentUser?._id}/goal`,
                method: 'POST',
                data: updatedProgress
            });
            if (response.success) {
                setGoal(response.data as IGoal);
                setCurrentProgress(response.data as IGoal);
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    };
    const formatDateInIndianFormat = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };
    const todayDate = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });


    return (
        <>
            <Sidebar />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
                <div className="bg-white shadow-md rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-6">
                    {/* Header Section */}
                    <div className="flex justify-between items-center border-b pb-4">
                        <h2 className="text-xl font-semibold">Wellness Goal</h2>
                        {currentUser?.role !== 'provider' && (<button onClick={handleEditClick} className="text-blue-500 hover:text-blue-700">Edit</button>)}

                    </div>

                    {/* Health Tips Section */}
                    <div className="my-4">
                        {currentUser.role !== 'provider' && (
                            <h3 className="text-sm font-semibold text-gray-700">See your current Goal and Edit</h3>)}
                    </div>

                    {/* Metrics Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {/* Sleep Card */}
                        <div className="bg-blue-50 p-4 rounded-lg shadow">
                            <h4 className="text-sm font-semibold text-gray-600">Sleep</h4>
                            <p className="text-xl font-bold">{currentProgress.sleepHours} hrs</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(currentProgress.sleepHours / 8) * 100}%` }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{Math.round((currentProgress.sleepHours / 8) * 100)}% completed</p>
                        </div>

                        {/* Active Time Card */}
                        <div className="bg-green-50 p-4 rounded-lg shadow">
                            <h4 className="text-sm font-semibold text-gray-600">Water Intake/day (liters)</h4>
                            <p className="text-xl font-bold"> {currentProgress.waterIntake}ltr</p>
                            <p className="text-xs text-gray-500">max target 4ltr/day</p>
                        </div>

                        {/* Steps Card */}
                        <div className="bg-yellow-50 p-4 rounded-lg shadow">
                            <h4 className="text-sm font-semibold text-gray-600">Steps</h4>
                            <p className="text-xl font-bold">{currentProgress.steps} / 5000 steps</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${(currentProgress.steps / 5000) * 100}%` }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{Math.round((currentProgress.steps / 5000) * 100)}% completed</p>
                        </div>
                    </div>

                    {/* Edit Form */}
                    {isEditing && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-4">Update Your Progress</h3>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Steps</label>
                                    <input
                                        type="number"
                                        name="steps"
                                        value={updatedProgress.steps}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sleep Hours</label>
                                    <input
                                        type="number"
                                        name="sleepHours"
                                        value={updatedProgress.sleepHours}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Water Intake (liters)</label>
                                    <input
                                        type="number"
                                        name="waterIntake"
                                        value={updatedProgress.waterIntake}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {formatDateInIndianFormat(goal.updatedAt) !== todayDate && (
                                    <button
                                        type="button"
                                        onClick={handleSaveClick}
                                        className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Save
                                    </button>
                                )}
                            </form>
                        </div>
                    )}
                    <EditForm goal={goal} />

                </div>



            </div>
        </>
    );
};

export default WellnessGoal;