import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@pages/Home";
import { LogIn, NotFound, SignUp } from "./pages";
import PrivateRoute from "@routes/PrivateRoute";
import MainLayout from "@layouts/MainLayout";
import PublicRoute from "@routes/PublicRoute";

const router = createBrowserRouter([
    {
      path: '/',
      element: <PrivateRoute><MainLayout/></PrivateRoute>,
      children: [
        {index: true, element: <Home/>}
      ]  
    },
    {path: '/login', element: <PublicRoute><LogIn/></PublicRoute>},
    {path: '/signup', element: <PublicRoute><SignUp/></PublicRoute>},
    {path: '*', element: <PublicRoute><NotFound/></PublicRoute>}
])

export default function AppRouter() {
    return <RouterProvider router={router}/>
}