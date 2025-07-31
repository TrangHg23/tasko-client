import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router';
import { lazy, Suspense } from 'react';
import PublicRoute from '@routes/PublicRoute';
import MainLayout from '@layouts/MainLayout';
import AuthLayout from '@layouts/AuthLayout';
import LoadingSpinner from '@components/common/LoadingSpinner';
import ErrorBoundary from '@components/errors/ErrorBoundary';
import NotFound from '@components/errors/NotFound';
import PrivateRoute from './PrivateRoute';
import { Auth } from '@pages/index';

const InboxPage = lazy(() => import('@pages/InboxPage'));
const TodayPage = lazy(() => import('@pages/TodayPage'));
const UpcomingPage = lazy(() => import('@pages/UpcomingPage'));
const CategoryPage = lazy(() => import('@pages/CategoryPage'));

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
          {
            path: 'upcoming',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <UpcomingPage />
              </Suspense>
            ),
          },
          {
            path: 'category/:slug',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <CategoryPage />
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
