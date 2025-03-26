import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IStore } from "../interfaces/store";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const { data: user } = useSelector((store: IStore) => store.user);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 pt-16`}
      >
        <div className="p-4">
          <ul>
            <li className="mt-4 font-bold text-white">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {user.role === "patient" && (
              <>
                <li className="mt-4 font-bold text-white">
                  <Link to="/profile">My Profile</Link>
                </li>
                <li className="mt-4 font-bold text-white">
                  <Link to="/wellnessgoal">Wellness Goals</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <button
          className="lg:hidden bg-blue-500 text-white p-2 rounded"
          onClick={toggleSidebar}
        >
          {isOpen ? "Hide Sidebar" : "Show Sidebar"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
