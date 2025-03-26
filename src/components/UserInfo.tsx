import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { capitalize } from "lodash";

import { IStore } from "../interfaces/store";
import { customFetch } from "../utils/api";
import { IUserInfo } from "../interfaces/user";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const { data: user } = useSelector((store: IStore) => store?.user);

  const getUserInfo = async () => {
    const { data, success } = await customFetch<null, IUserInfo>({
      path: `/user-info/${user?._id}`,
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
    <div className="mx-auto bg-white shadow-md rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 my-12 border">
      <h2 className="text-3xl font-bold mb-6 text-center">User Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Name:</label>
          <p className="text-gray-900">{userInfo?.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Email:</label>
          <p className="text-gray-900">{userInfo?.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Phone:</label>
          <p className="text-gray-900">{userInfo?.phone}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">
            Date of Birth:
          </label>
          <p className="text-gray-900">
            {new Date(userInfo?.dob || "").toLocaleDateString()}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Gender:</label>
          <p className="text-gray-900">{capitalize(userInfo?.gender)}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">
            Medications:
          </label>
          <p className="text-gray-900">
            {userInfo?.medications.join(", ") || "None"}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">
            Allergies:
          </label>
          <p className="text-gray-900">
            {userInfo?.allergies.join(", ") || "None"}
          </p>
        </div>
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 font-semibold">
            Preventive Care:
          </label>
          {userInfo?.preventiveCare.map((care, index) => (
            <div key={index} className="text-gray-900 mb-2">
              <p>Test: {care.test || "Nil"}</p>
              <p>Date: {new Date(care.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 font-semibold">Goal:</label>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-gray-900">Steps: {userInfo?.goal.steps}</p>
            <p className="text-gray-900">
              Sleep Hours: {userInfo?.goal.sleepHours}
            </p>
            <p className="text-gray-900">
              Water Intake: {userInfo?.goal.waterIntake}
            </p>
          </div>
        </div>
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 font-semibold">
            Actual Progress:
          </label>
          {userInfo?.actualProgress?.map((progress, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md mb-2"
            >
              <p>
                Date:{" "}
                {new Date(
                  (progress as unknown as { date: Date })?.date
                ).toLocaleDateString()}
              </p>
              <p>Steps: {progress?.steps}</p>
              <p>Sleep Hours: {progress?.sleepHours}</p>
              <p>Water Intake: {progress?.waterIntake}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
