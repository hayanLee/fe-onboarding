import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Mypage from '../pages/Mypage';
import Signup from '../pages/Signup';

const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <Signup /> },
            { path: '/mypage', element: <Mypage /> },
        ],
    },
]);

export default router;
