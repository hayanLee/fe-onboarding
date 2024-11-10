import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Mypage from '../pages/Mypage';
import Signup from '../pages/Signup';
import ProtectedRoute from './protectedRoute';

const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

const isAuthenticated = !!getAccessToken();

const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <Signup /> },
            {
                element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
                children: [{ path: '/mypage', element: <Mypage /> }],
            },
        ],
    },
]);

export default router;
