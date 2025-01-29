import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-[#faf7f0] px-2 md:px-6 xl:px-28">
      <Navbar></Navbar>
      {/* <HomeSidebar /> */}
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
