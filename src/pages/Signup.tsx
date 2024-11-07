const Signup = () => {
    return (
        <div>
            <form className='flex flex-col gap-y-2'>
                <input type='email' placeholder='email' />
                <input type='password' placeholder='password' />

                <button>Sign up</button>
            </form>
        </div>
    );
};

export default Signup;
