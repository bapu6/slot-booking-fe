import { useSelector } from "react-redux";
import { ISlot } from "../interfaces/slot";
import { IStore } from "../interfaces/store";
import { customFetch } from "../utils/api";
import { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState<ISlot[]>([]);
  const { data: user } = useSelector((store: IStore) => store?.user);

  const fetchHistory = async () => {
    const { data, success } = await customFetch<null, ISlot[]>({
      path: "/slots/history",
    });
    console.log("data", data);
    if (success) {
      setHistory(data);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <p className="font-bold text-[18px]">All your booking history</p>
      <div className="block md:hidden mt-6">
        {history?.map((item: ISlot) => (
          <div
            key={item.slotId}
            className="history-card p-4 mb-4 border rounded shadow bg-blue-100"
          >
            <p>Tower: {item.tower}</p>
            <p>Slot ID: {item.slotId}</p>
            <p>Date: {new Date(item.date).toLocaleDateString()}</p>
            <p>Booked By: {item.bookedBy}</p>
            <p>Booked Date: {new Date(item.bookedDate).toLocaleDateString()}</p>
            {user?.role == "admin" && <p>User ID: {item.userId}</p>}
            <p>Status: {item.status}</p>
            <p>Toggle Status</p>
          </div>
        ))}
      </div>
      <div className="hidden md:block mt-6">
        <table className="min-w-full bg-gray-100">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-left">Tower</th>
              <th className="py-2 px-4 border-b text-left">Slot ID</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Booked By</th>
              <th className="py-2 px-4 border-b text-left">Booked Date</th>
              {user?.role == "admin" && (
                <th className="py-2 px-4 border-b text-left">User ID</th>
              )}
              <th className="py-2 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {history?.map((item: ISlot) => (
              <tr key={item.slotId} className="bg-white hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{item.tower}</td>
                <td className="py-2 px-4 border-b">{item.slotId}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{item.bookedBy}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(item.bookedDate).toLocaleDateString()}
                </td>
                {user?.role == "admin" && (
                  <td className="py-2 px-4 border-b">{item.userId}</td>
                )}
                <td className="py-2 px-4 border-b">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
