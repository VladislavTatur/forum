import { createBrowserRouter } from "react-router-dom";
import {HomePage} from "../../pages/HomePage";
import App from "../../App";
import {PostPage} from "../../pages/PostPage";
import {ProfilePage} from "../../pages/ProfilePage";
import {PostsPage} from "../../pages/PostsPage.tsx";
import {UsersPage} from "../../pages/UsersPage.tsx";

export const ROUTES = {
    main: '/',
    home: '/home',
    post: '/post',
    posts: '/posts',
    profile: '/profile',
    users: '/users',
}

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
                path: ROUTES.post,
                element: <PostPage />,
            },
            {
                path: ROUTES.profile,
                element: <ProfilePage />,
            },
            {
                path: ROUTES.posts,
                element: <PostsPage />,
            },
            {
                path: ROUTES.users,
                element: <UsersPage />,
            },
        ]
    }
])