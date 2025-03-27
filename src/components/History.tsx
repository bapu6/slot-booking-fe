import { useSelector } from "react-redux";
import { ISlot } from "../interfaces/slot";
import { IStore } from "../interfaces/store";
import { customFetch } from "../utils/api";
import { useEffect, useState } from "react";
import { SlotService } from "../services/slot.service";
import { toast } from "react-toastify";
import { ISlotObject } from "../interfaces/user";

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
  //handles slot release
  const hanldeSlotRelease = async (slot: ISlotObject) => {
    console.log(slot.date);
    const slotDetails: ISlotObject = {
      tower: slot.tower,
      slotId: slot.slotId,
      date: new Date(slot.date).toISOString().split("T")[0],
      userId: slot.userId,
    };
    const book = await SlotService.releaseSlot(slotDetails);
    if (book.success) {
      toast.success(book.message);
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
            <p>Booked By: {item.createdBy}</p>
            <p>Booked Date: {new Date(item.bookedDate).toLocaleDateString()}</p>
            {user?.role == "admin" && <p>User ID: {item.userId}</p>}
            <p>Status: {item.status}</p>
            <button
              onClick={() => hanldeSlotRelease(item)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Release
            </button>
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
              <th className="py-2 px-4 border-b text-left">Action</th>
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
                <td className="py-2 px-4 border-b">{item.createdBy}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(item?.createdAt as string).toDateString()}
                </td>
                {user?.role == "admin" && (
                  <td className="py-2 px-4 border-b">{item.userId}</td>
                )}
                <td className="py-2 px-4 border-b">{item.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => hanldeSlotRelease(item)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                  >
                    Release
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
