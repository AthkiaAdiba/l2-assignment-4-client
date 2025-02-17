import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen gap-5">
      <div>
        <Sidebar />
      </div>
      <div className="mt-12 lg:mt-10 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
