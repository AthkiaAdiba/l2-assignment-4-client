import { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { SlHandbag } from "react-icons/sl";
import Login from "@/pages/Login/LoginModal";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import PopOver from "./PopOver";
import { GoPerson } from "react-icons/go";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  // console.log(user);

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
          <div className="flex items-center gap-7">
            {/* {!user && <Login />} */}
            {!user && (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-[#1e2525] text-white p-2"
              >
                <GoPerson /> LOG IN/SIGN UP
              </Link>
            )}
            {user && <PopOver />}

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
          {!user && <Login />}
          {/* <button className="flex items-center gap-2 bg-[#1e2525] text-white p-2">
            <GoPerson /> LOG IN/SIGN UP
          </button> */}
          {user && <PopOver />}
        </div>

        {/* Drawer Menu */}
        {isDrawerOpen && (
          <div
            className={`lg:hidden absolute duration-1000 ${
              isDrawerOpen ? "top-16" : "-top-96"
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

export default Navbar;
