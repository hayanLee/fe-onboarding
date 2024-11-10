import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('accessToken');
    if (!isAuthenticated) return <Navigate to='/login' replace />;
    return <Outlet />;
};

export default ProtectedRoute;
