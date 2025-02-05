import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { MdDashboard, MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { verifyToken } from "@/utils/verifyToken";
import { RiShoppingBasketLine } from "react-icons/ri";
import { FaHome, FaUsers } from "react-icons/fa";
import { useGetSingleUserQuery } from "@/redux/features/admin/user.api";
import { AiOutlineProduct } from "react-icons/ai";
import { GoListOrdered } from "react-icons/go";

// type TRoute = {
//   path: string;
//   name: string;
//   id: number;
//   icon: ReactNode;
// };

const Sidebar = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const [openSidebar, setOpenSidebar] = useState(false);

  const user = verifyToken(token as string);
  const { data: singleUser } = useGetSingleUserQuery(currentUser?.userId);

  const userRoutes = [
    {
      path: `/${user?.role}/dashboard`,
      name: "Dashboard",
      id: 1,
      icon: <MdDashboard />,
    },
    {
      path: `/${user?.role}/myOrders`,
      name: "My Orders",
      id: 2,
      icon: <RiShoppingBasketLine />,
    },
    {
      path: `/`,
      name: "Home",
      id: 3,
      icon: <FaHome />,
    },
  ];

  const adminRoutes = [
    {
      path: `/${user?.role}/dashboard`,
      name: "Dashboard",
      id: 1,
      icon: <MdDashboard />,
    },
    {
      path: `/${user?.role}/allOrders`,
      name: "All Orders",
      id: 2,
      icon: <GoListOrdered />,
    },
    {
      path: `/${user?.role}/allUsers`,
      name: "All Users",
      id: 3,
      icon: <FaUsers />,
    },
    {
      path: `/${user?.role}/addProduct`,
      name: "Add Product",
      id: 4,
      icon: <AiOutlineProduct />,
    },
    {
      path: `/${user?.role}/allProducts`,
      name: "All Products",
      id: 5,
      icon: <AiOutlineProduct />,
    },
    {
      path: `/`,
      name: "Home",
      id: 6,
      icon: <FaHome />,
    },
  ];

  const routes = user?.role === "admin" ? adminRoutes : userRoutes;

  return (
    <>
      {/* Sidebar Toggle Button for Mobile (Hidden when Sidebar is Open) */}
      {!openSidebar && (
        <button
          onClick={() => setOpenSidebar(true)}
          className="lg:hidden p-1 text-3xl text-white bg-gray-900 fixed z-50 rounded-md"
        >
          <IoMdMenu />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`h-full p-3 pt-8 space-y-2 w-60 bg-gray-900 text-white fixed lg:relative top-0 left-0 transform transition-transform duration-300 ease-in-out z-50 ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Close Button for Mobile */}
        <button
          onClick={() => setOpenSidebar(false)}
          className="lg:hidden absolute text-4xl top-0 right-0 text-white rounded-md"
        >
          <MdOutlineClose />
        </button>

        {/* User Info */}
        <div className="flex items-center p-2 space-x-4">
          <img
            src={singleUser?.data?.image}
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">{singleUser?.data?.name}</h2>
            <span className="flex items-center space-x-1">
              <Link
                to={`/${user?.role}/myProfile`}
                className="text-base hover:underline text-gray-400"
              >
                View profile
              </Link>
            </span>
          </div>
        </div>
        {/* Navigation Links */}
        <div className="divide-y divide-gray-700">
          <ul className="pt-2 pb-4 pl-4 space-y-4 text-sm">
            {routes.map((route) => (
              <li key={route.id} className="flex items-center gap-2 text-lg">
                {route.icon}
                <Link to={route.path}>{route.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
