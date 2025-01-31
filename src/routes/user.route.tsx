import MyOrders from "@/pages/User/MyOrders";
import UserDashboard from "@/pages/User/UserDashboard";
import { MdDashboard } from "react-icons/md";
import { RiShoppingBasketLine } from "react-icons/ri";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "My Orders",
    path: "myOrders",
    element: <MyOrders />,
  },
];

export const sidebarPaths = [
  {
    path: `dashboard`,
    name: "Dashboard",
    id: 1,
    icon: <MdDashboard />,
  },
  {
    path: `myOrders`,
    name: "My Orders",
    id: 2,
    icon: <RiShoppingBasketLine />,
  },
];
