import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { IStore } from "../interfaces/store";
import { customFetch } from "../utils/api";
import { IUserInfo } from "../interfaces/user";
import { SyntheticEvent, useEffect, useState } from "react";
import { PATCH } from "../constants/api";

interface IProfileUpdate {
  name: string;
  allergies: string[];
  medications: string[];
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [name, setName] = useState("");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);

  const { data: user } = useSelector((store: IStore) => store?.user);
  console.log("userInfo", userInfo);
  const getUserInfo = async () => {
    const { data, success } = await customFetch<null, IUserInfo>({
      path: `/user-info/${user?._id}`,
    });

    if (success) {
      setUserInfo(data);
    }
  };

  const updateUserInfo = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    const { data, success } = await customFetch<IProfileUpdate, IUserInfo>({
      path: `/user-info/${user?._id}`,
      method: PATCH,
      data: { name, allergies, medications },
    });

    if (success) {
      setUserInfo(data);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Sidebar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              onChange={(e) => setName(e?.target?.value)}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Allergies
            </label>
            <input
              onChange={(e) => setAllergies(e?.target?.value?.split(",") || [])}
              //   disabled={true}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Medication
            </label>
            <input
              onChange={(e) =>
                setMedications(e?.target?.value?.split(",") || [])
              }
              disabled={true}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            onClick={updateUserInfo}
            className="border borer-blue py-1 px-2 bg-blue-500 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
