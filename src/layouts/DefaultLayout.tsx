import { Link, Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    return (
        <div className='flex flex-col min-h-dvh'>
            <nav className='border-b border-black py-4 flex justify-center gap-x-4'>
                <Link to={'/'}>Home</Link>
                <Link to={'/login'}>Login</Link>
                <Link to={'/signup'}>SignUp</Link>
                <Link to={'/mypage'}>MyPage</Link>
            </nav>
            <div className='w-4/5 flex-grow mx-auto my-4'>
                <Outlet />
            </div>
        </div>
    );
};

export default DefaultLayout;
