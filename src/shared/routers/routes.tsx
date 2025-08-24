import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '@pages/HomePage.tsx';
import { PostPage } from '@pages/PostPage.tsx';
import { ProfilePage } from '@pages/ProfilePage.tsx';
import { UsersPage } from '@pages/UsersPage.tsx';

import App from '../../App';

export const ROUTES = {
  main: '/',
  home: '/home',
  post: (id: string) => `/posts/${id}`,
  profile: '/profile',
  users: '/users',
};

export const router = createBrowserRouter([
  {
    path: ROUTES.main,
    element: <App />,
    children: [
      {
        path: ROUTES.home,
        element: <HomePage />,
      },
      {
        path: 'posts/:id',
        element: <PostPage />,
      },
      {
        path: ROUTES.profile,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.users,
        element: <UsersPage />,
      },
    ],
  },
]);
