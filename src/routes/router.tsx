import { createBrowserRouter, redirect } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Mypage from '../pages/Mypage';
import Signup from '../pages/Signup';
import ProtectedRoute from './protectedRoute';

const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

const authLoader = () => {
    const isAuthenticated = !!getAccessToken();
    if (!isAuthenticated) return redirect('/login');
    return null;
};

const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <Signup /> },
            {
                element: <ProtectedRoute />,
                children: [{ path: '/mypage', element: <Mypage />, loader: authLoader }],
            },
        ],
    },
]);

export default router;
