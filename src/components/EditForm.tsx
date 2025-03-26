import { IGoal } from "../interfaces/goal"

const EditForm = ({ goal }: { goal: IGoal }) => {

    return (
        <>
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Current Goal</h3>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Steps</th>
                            <th className="px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sleep Hours</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Water Intake</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b border-gray-200">{goal.steps}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{goal.sleepHours}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{goal.waterIntake}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{goal.updatedAt} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EditForm