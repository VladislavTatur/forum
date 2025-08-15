import { createBrowserRouter } from "react-router-dom";
import {HomePage} from "../../pages/HomePage";
import App from "../../App";
import {PostPage} from "../../pages/PostPage";
import {ProfilePage} from "../../pages/ProfilePage";

export const Path = {
    main: '/',
    home: '/home',
    post: '/posts',
    profile: '/profile',
}

export const router = createBrowserRouter([
    {
        path: Path.main,
        element: <App />,
        children: [
            {
                path: Path.home,
                element: <HomePage />,
            },
            {
                path: Path.post,
                element: <PostPage />,
            },
            {
                path: Path.profile,
                element: <ProfilePage />,
            },
        ]
    }
])