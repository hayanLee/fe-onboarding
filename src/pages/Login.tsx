import { useRef } from 'react';
import useLoginMutation from '../hooks/mutations/useLoginMutation';

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { mutate } = useLoginMutation();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const email = emailRef.current?.value.trim();
        const password = passwordRef.current?.value.trim();

        if (!email || !password) {
            alert('입력란을 모두 입력해주세요');
            return;
        }

        const formData = { id: email, password };
        mutate(formData);
    };
    return (
        <div>
            <form className='flex flex-col gap-y-2' onSubmit={handleSubmit}>
                <input type='email' placeholder='email' ref={emailRef} />
                <input type='password' placeholder='password' ref={passwordRef} />

                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;
