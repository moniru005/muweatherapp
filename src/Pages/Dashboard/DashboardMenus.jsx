import { FaUser, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DashboardMenus = () => {
  return (
    <div className="flex flex-col gap-2">
      <NavLink to="/dashboard/addUser" className={`flex items-center hover:bg-slate-500 gap-2`}>
        <FaUser className="text-white text-2xl"></FaUser>
        <button className="w-full text-lg text-left p-2 rounded-lg hover:rounded-lg">
          Add User
        </button>
      </NavLink>
      <NavLink to="/dashboard/allUsers" className={`flex items-center hover:bg-slate-500 gap-2`}>
        <FaUsers className="text-white text-3xl"></FaUsers>
        <button className="w-full text-lg text-left p-2 rounded-lg hover:rounded-lg">
          Users List
        </button>
      </NavLink>
    </div>
  );
};

export default DashboardMenus;
