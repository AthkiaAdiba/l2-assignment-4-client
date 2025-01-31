import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AllOrders from "@/pages/Admin/AllOrders";
import AllUsers from "@/pages/Admin/AllUsers";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "All Users",
    path: "allUsers",
    element: <AllUsers />,
  },
  {
    name: "All Orders",
    path: "allOrders",
    element: <AllOrders />,
  },
];
