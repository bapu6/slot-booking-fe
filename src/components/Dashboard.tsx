import { useState } from "react";
import { toast } from "react-toastify";
import { customFetch } from "../utils/api";
import { ISlot } from "../interfaces/slot";

const Dashboard = () => {
  const [tower, setTower] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<ISlot[]>([]);

  // Tower dropdown options
  const towerNumbers = Array.from({ length: 10 }, (_, i) => i + 1);
  /**
   * API call to fetch all the available slots
   * filtered by tower and date
   */
  const handleSearch = async () => {
    if (!tower || !date) {
      toast.error("Please enter both tower and date");
      return;
    }

    try {
      const { data, success } = await customFetch({
        path: `slots?tower=${tower}&date=${date}`,
        method: "GET",
      });
      console.log('data', data)
      if (success) setSlots((data as { data: ISlot[] })?.data);
    } catch (error) {
      toast.error("Failed to fetch slots");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-xl mt-10 md:mt-6 lg:mt-12">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tower">
            Tower<span className="text-red-500">*</span>
          </label>
          <select
            id="tower"
            value={tower}
            onChange={(e) => setTower(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-sky-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          >
            <option value="">Select tower number</option>
            {towerNumbers?.map((num) => (
              <option key={num} value={num}>
                Tower {num}
              </option>
            ))}
          </select>

        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date">
            Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-sky-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Search
        </button>
      </div>
      {slots.length > 0 && (
        <div className="mt-6">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-6 border-b text-left">Slot ID</th> {/* Adjusted padding and alignment */}
                <th className="py-2 px-6 border-b text-left">Action</th> {/* Adjusted padding and alignment */}
              </tr>
            </thead>
            <tbody>
              {slots?.map((slot) => (
                <tr key={slot?.slotId}>
                  <td className="py-2 px-6 border-b text-left">{slot?.slotId}</td> {/* Adjusted padding and alignment */}
                  <td className="py-2 px-6 border-b text-left"> {/* Adjusted padding and alignment */}
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;