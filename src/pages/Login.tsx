import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { LoginInfo } from '../types/todo.type';

const Login = () => {
    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { mutate } = useMutation({
        mutationFn: (formData: LoginInfo) => api.auth.logIn(formData),
        onSuccess: () => {
            alert('로그인 성공');
            navigate('/');
        },
        onError: () => alert('로그인 실패'),
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

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
