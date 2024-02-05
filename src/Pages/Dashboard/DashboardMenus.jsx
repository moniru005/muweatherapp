import { FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DashboardMenus = () => {
  return (
    <div>
      <NavLink to="/dashboard/allUsers" className={`flex items-center gap-2`}>
        <FaUsers className="text-green-400 text-2xl"></FaUsers>
        <button className="w-full  text-left hover:bg-slate-500 p-2 hover:p-2 rounded-lg hover:rounded-lg">Users List</button>
      </NavLink>
    </div>
  );
};

export default DashboardMenus;
