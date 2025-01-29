import { useState } from "react";
import { GoPerson } from "react-icons/go";
import logo from "../../assets/logo.png";
import { RxCross1 } from "react-icons/rx";
import { HiMenuAlt1 } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import { SlHandbag } from "react-icons/sl";
import profile from "../../assets/profile.jpg";

const HomeSidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  type TRoute = {
    path: string;
    name: string;
    id: number;
  };

  const routes = [
    { path: "/", name: "Home", id: 1 },
    { path: "/allProducts", name: "All Products", id: 2 },
    { path: "/about", name: "About", id: 3 },
  ];

  return (
    <nav>
      <div className="container mx-auto">
        {/* Navbar for large screens */}
        <div className="hidden lg:flex justify-between items-center py-4">
          <div className="flex items-center gap-6">
            <div>
              <img src={logo} alt="" className="h-24 w-24" />
            </div>
            <ul className="flex gap-10 text-xl font-semibold">
              {routes.map((route: TRoute) => (
                <NavLink
                  className={({ isActive }) => (isActive ? "underline" : "")}
                  key={route.id}
                  to={route.path}
                >
                  {route.name}
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-7 hover:underline">
            <button className="flex items-center gap-2 bg-[#1e2525] text-white p-2">
              <GoPerson /> LOG IN/SIGN UP
            </button>
            <Link to="" className="flex hidden items-center gap-1">
              <img
                src={profile}
                alt=""
                className="h-12 w-12 rounded-full bg-white"
              />
              <p className="text-lg font-semibold">ATHKIA ADIBA</p>
            </Link>
            <div className="relative">
              <button className="flex items-center gap-2 text-xl font-medium">
                <SlHandbag /> CART
              </button>
              <p className="relative -mt-10 ml-3 text-2xl font-bold text-red-600">
                1
              </p>
            </div>
          </div>
        </div>

        {/* Navbar for small and medium screens */}
        <div className="flex justify-between items-center py-4 lg:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="text-3xl"
            >
              {isDrawerOpen === true ? (
                <RxCross1></RxCross1>
              ) : (
                <HiMenuAlt1></HiMenuAlt1>
              )}
            </button>
            <div>
              <img src={logo} alt="" className="h-14 w-14" />
            </div>
          </div>
          <button className="flex hidden items-center gap-2 bg-[#1e2525] text-white p-2">
            <GoPerson /> LOG IN/SIGN UP
          </button>
          <Link to="" className="flex items-center gap-1">
            <img
              src={profile}
              alt=""
              className="h-10 w-10 rounded-full bg-white"
            />
            <p>ATHKIA ADIBA</p>
          </Link>
        </div>

        {/* Drawer Menu */}
        {isDrawerOpen && (
          <div
            className={`lg:hidden absolute duration-1000 ${
              isDrawerOpen ? "top-44" : "-top-96"
            }`}
          >
            <ul className="space-y-4 p-4 bg-[#faf7f0] text-xl font-medium">
              {routes.map((route: TRoute) => (
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "underline" : "")}
                    key={route.id}
                    to={route.path}
                  >
                    {route.name}
                  </NavLink>
                </li>
              ))}
              <div className="relative">
                <button className="flex items-center gap-2 text-lg font-medium">
                  <SlHandbag /> CART
                </button>
                <p className="relative -mt-10 ml-3 text-2xl font-bold text-red-600">
                  1
                </p>
              </div>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HomeSidebar;
