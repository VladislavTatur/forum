import { lazy } from 'react';

import { createHashRouter, Navigate } from 'react-router-dom';

import { AuthLayout } from '@shared/components/layouts/AuthLayout.tsx';
import { MainLayout } from '@shared/components/layouts/MainLayout.tsx';
import { ProtectedRoute } from '@shared/components/ProtectedRoute.tsx';
import { ROUTES } from '@shared/constants/links.ts';

const LoginPage = lazy(() => import('@pages/LoginPage.tsx'));
const PostPage = lazy(() => import('@pages/PostPage.tsx'));
const PostsPage = lazy(() => import('@pages/PostsPage.tsx'));
const ProfilePage = lazy(() => import('@pages/ProfilePage.tsx'));
const ProfileSettingsPage = lazy(() => import('@pages/ProfileSettingsPage.tsx'));
const UsersPage = lazy(() => import('@pages/UsersPage.tsx'));

export const router = createHashRouter([
  {
    path: ROUTES.main,
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to={ROUTES.posts} replace /> },
      {
        path: ROUTES.posts,
        element: <PostsPage />,
      },
      {
        path: 'posts/:id',
        element: <PostPage />,
      },
      {
        path: ROUTES.profile,
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.users,
        element: <UsersPage />,
      },
      {
        path: ROUTES.settings,
        element: (
          <ProtectedRoute>
            <ProfileSettingsPage />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <Navigate to={ROUTES.login} replace /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [{ path: ROUTES.login, element: <LoginPage /> }],
  },
]);
