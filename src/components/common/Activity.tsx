/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from 'react-router';
import Sidebar from '../Sidebar';


const Activity = () => {
    const location = useLocation();
    const { patient } = location.state || {};
    const goal = patient.goal;
    const currentProgress = patient.actualProgress;
    return (
        <>
            <Sidebar />
            <div className="min-h-screen  flex flex-col items-center py-5 text-gray-600 ">
                <div className="w-full md:w-3/4 lg:w-1/2 p-6 bg-white rounded-lg border-2 border-gray-500">
                    {/* Header Section */}
                    <div className="flex justify-between items-center pb-4">
                        <div>
                            <p><strong>Recent Activity: </strong>{currentProgress[0].date}</p>
                            <p><strong>Pateint Name: </strong>{patient.name}</p>
                            <p><strong>Pateint Dob: </strong>{new Date(patient.dob).toDateString()}</p>
                        </div>
                    </div>


                    {/* Metrics Section */}
                    <div className="flex flex-col md:grid-cols-3 gap-4 mt-4">
                        {/* Steps Card */}
                        <div className="bg-yellow-50 p-4 rounded-2xl border-2 border-gray-400 w-1/2 shadow">
                            <h4 className="text-sm font-semibold text-gray-600">Steps</h4>
                            <p className="text-xl font-bold">{currentProgress[0].steps} / {goal?.steps} steps</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${(currentProgress[0]?.steps / goal.steps) * 100}%` }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{Math.round((currentProgress[0]?.steps / goal.steps) * 100)}% completed</p>
                        </div>
                        {/* Water intake Card */}
                        <div className="bg-green-50 p-4 rounded-2xl border-2 border-gray-400 w-1/2 shadow">
                            <h4 className="text-sm font-semibold text-gray-600">Water Intake</h4>
                            <p className="text-xl font-bold">{currentProgress[0].waterIntake} / {goal.waterIntake} ltrs</p>
                        </div>
                        {/* Sleep Card */}
                        <div className="bg-blue-50 p-4 rounded-2xl border-2 border-gray-400 w-1/2 shadow">
                            <h4 className="text-sm font-semibold text-gray-600">Sleep</h4>
                            <p className="text-xl font-bold">{currentProgress[0]?.sleepHours} hrs</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(currentProgress[0]?.sleepHours / goal.sleepHours) * 100}%` }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{Math.round((currentProgress[0]?.sleepHours / goal?.sleepHours) * 100)}% completed</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Activity;