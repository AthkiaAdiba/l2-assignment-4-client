import AddProducts from "@/pages/Admin/AddProducts";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AllOrders from "@/pages/Admin/AllOrders";
import AllProductsOfAdmin from "@/pages/Admin/AllProductsOfAdmin";
import AllUsers from "@/pages/Admin/AllUsers";
import UpdateProduct from "@/pages/Admin/UpdateProduct";
import MyProfile from "@/pages/MyProfile/MyProfile";

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
  {
    name: "Add Product",
    path: "addProduct",
    element: <AddProducts />,
  },
  {
    name: "All Products",
    path: "allProducts",
    element: <AllProductsOfAdmin />,
  },
  {
    name: "All Products",
    path: "allProducts",
    element: <AllProductsOfAdmin />,
  },
  {
    name: "My Profile",
    path: "myProfile",
    element: <MyProfile />,
  },
  {
    path: "allProducts/:productId",
    element: <UpdateProduct />,
  },
];
