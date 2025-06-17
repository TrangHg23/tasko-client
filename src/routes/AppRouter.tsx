import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@pages/Home";
import PrivateRoute from "@routes/PrivateRoute";
import MainLayout from "@layouts/MainLayout";
import PublicRoute from "@routes/PublicRoute";
import AuthLayout from "@layouts/AuthLayout";
import Auth from "@pages/auth/Auth";
import NotFound from "@pages/NotFound";

const router = createBrowserRouter([
  {
    element: <PrivateRoute />, 
    children: [
      {
        path: "/",
        element: <MainLayout />, 
        children: [
          { index: true, element: <Home /> }
        ]
      }
    ]
  },
  {
    path: "/auth",
    element: <PublicRoute />, 
    children: [
      {
        element: <AuthLayout />, 
        children: [
          { path: "login", element: <Auth /> },
          { path: "signup", element: <Auth /> }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <PublicRoute />, 
    children: [
      { index: true, element: <NotFound /> }
    ]
  }
]);


export default function AppRouter() {
    return <RouterProvider router={router}/>
}