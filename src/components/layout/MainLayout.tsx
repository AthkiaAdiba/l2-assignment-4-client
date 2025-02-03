import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#faf7f0]">
      <div className="px-2 md:px-6 xl:px-28">
        <Navbar></Navbar>
      </div>
      {/* <HomeSidebar /> */}
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
