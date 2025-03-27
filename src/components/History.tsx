import { useSelector } from "react-redux";
import { ISlot } from "../interfaces/slot";
import { IStore } from "../interfaces/store";

const History = () => {
  const { data: user } = useSelector((store: IStore) => store?.user);

  const data: ISlot[] = [
    {
      tower: 1,
      slotId: 101,
      date: "2025-03-26T00:00:00Z",
      bookedBy: "605c72b2f1b2b2a1b2c3d4e5",
      bookedDate: "2025-03-25T00:00:00Z",
      userId: "605c72b2f1b2b2a1b2c3d4e6",
      status: 0,
    },
    {
      tower: 2,
      slotId: 102,
      date: "2025-03-27T00:00:00Z",
      bookedBy: "605c72b2f1b2b2a1b2c3d4e7",
      bookedDate: "2025-03-26T00:00:00Z",
      userId: "605c72b2f1b2b2a1b2c3d4e8",
      status: 1,
    },
    {
      tower: 3,
      slotId: 103,
      date: "2025-03-28T00:00:00Z",
      bookedBy: "605c72b2f1b2b2a1b2c3d4e9",
      bookedDate: "2025-03-27T00:00:00Z",
      userId: "605c72b2f1b2b2a1b2c3d4ea",
      status: 0,
    },
  ];

  return (
    <div className="p-4">
      <p className="font-bold text-[18px]">All your booking history</p>
      <div className="block md:hidden mt-6">
        {data?.map((item: ISlot) => (
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
            {data?.map((item: ISlot) => (
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
