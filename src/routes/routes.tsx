import MainLayout from "@/components/layout/MainLayout";
import About from "@/pages/About/About";
import AllProducts from "@/pages/AllProducts/AllProducts";
import Home from "@/pages/Home/Home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import App from "@/App";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "@/utils/routesGenerator";
import { userPaths } from "./user.route";
import ProductDetails from "@/components/layout/ProductDetails";
import Cart from "@/pages/Cart/Cart";
import VerifyOrder from "@/pages/VerifyOrder/VerifyOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allProducts",
        element: <AllProducts />,
      },
      {
        path: "/allProducts/:id",
        element: <ProductDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "verifyOrder",
        element: <VerifyOrder />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "user",
    element: (
      <ProtectedRoute role="user">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
  },
]);

export default router;
