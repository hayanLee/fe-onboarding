import { Link, Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    return (
        <div>
            <nav>
                <Link to={'/'}>Home</Link>
                <Link to={'/login'}>Login</Link>
                <Link to={'/signup'}>SignUp</Link>
                <Link to={'/mypage'}>MyPage</Link>
            </nav>
            <Outlet />
        </div>
    );
};

export default DefaultLayout;
