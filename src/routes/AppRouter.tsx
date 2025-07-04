import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router';
import { Suspense } from 'react';
import PublicRoute from '@routes/PublicRoute';
import MainLayout from '@layouts/MainLayout';
import AuthLayout from '@layouts/AuthLayout';
import LoadingSpinner from '@components/common/LoadingSpinner';
import ErrorBoundary from '@components/errors/ErrorBoundary';
import NotFound from '@components/errors/NotFound';
import PrivateRoute from './PrivateRoute';
import { Auth, InboxPage, TodayPage } from '@pages/index';

const routesConfig: RouteObject[] = [
  {
    path: '/auth',
    element: <PublicRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <Auth />,
          },
          {
            path: 'signup',
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
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: 'today',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <TodayPage />
              </Suspense>
            ),
          },
          {
            path: 'inbox',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <InboxPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
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
