import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router";
import { Suspense, lazy } from "react";
import PrivateRoute from "@routes/PrivateRoute";
import PublicRoute from "@routes/PublicRoute";
import MainLayout from "@layouts/MainLayout";
import AuthLayout from "@layouts/AuthLayout";
import LoadingSpinner from "@components/common/LoadingSpinner";
import ErrorBoundary from "@components/errors/ErrorBoundary";
import NotFound from "@components/errors/NotFound";


const Home = lazy(() => import("@pages/Home"));
const Auth = lazy(() => import("@pages/auth/Auth"));


const routesConfig: RouteObject[] = [
  {
    element: <PrivateRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Home />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <PublicRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Auth />
              </Suspense>
            ),
          },
          {
            path: "signup", 
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Auth />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFound />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
  },
];


const router = createBrowserRouter(routesConfig);

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;