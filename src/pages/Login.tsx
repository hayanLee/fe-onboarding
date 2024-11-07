const Login = () => {
    return (
        <div>
            <form className='flex flex-col gap-y-2'>
                <input type='email' placeholder='email' />
                <input type='password' placeholder='password' />

                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;
