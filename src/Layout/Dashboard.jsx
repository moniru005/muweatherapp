import { Outlet } from "react-router-dom";
import useWeatherApi from "../Hooks/useWeatherApi";
import useAuth from "../Hooks/useAuth";
import DashboardMenus from "../Pages/Dashboard/DashboardMenus";
import "./Dashboard.css";

const Dashboard = () => {
  const weather = useWeatherApi();
  console.log(weather);
  const { user } = useAuth();

  return (
    <div className="flex mx-auto justify-center max-w-6xl ">
      <div className="flex px-4 lg:px-0 flex-col lg:flex-row items-start justify-center w-full gap-6 lg:gap-4">
        {/* Dashboard Sidebar */}
        <div className="w-full lg:w-3/12">
          <div className="text-md font-workSans flex flex-col lg:flex-row gap-2 bg-slate-800 rounded-lg px-4 py-4">
            <ul className="sidebar flex flex-col gap-2 font-medium w-full ">
              <div className="py-2 text-white">
                <p className="uppercase text-xl pb-2">{user.displayName}</p>
                <p>{user.metadata.lastSignInTime}</p>
              </div>

              <div className="text-white font-workSans flex flex-col lg:flex-row  p-4 ">
                <ul className="sidebar flex flex-col font-medium  w-full">
                  <DashboardMenus />
                </ul>
              </div>
            </ul>
          </div>
        </div>

        {/* Dashboard Contents */}
        <div className="w-full lg:w-9/12 flex  bg-white ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
