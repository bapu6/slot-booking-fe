import UserInfo from "./UserInfo";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { IStore } from "../interfaces/store";
import Patients from "./common/PateintsList";

const Dashboard = () => {
  const { data: user } = useSelector((store: IStore) => store.user);

  return (
    <div className="flex sm:flex">
      <div className="w-1/5">
        <Sidebar />
      </div>
      {user.role === "provider" ? (
        <div className="flex w-full flex-col">
          <Patients />
        </div>
      ) : (
        <div className="flex justify-center items-center h-full w-full">
          <UserInfo />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
