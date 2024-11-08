import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import api from '../api/api';
import { SignUpInfo } from '../types/todo.type';

const Signup = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nicknameRef = useRef<HTMLInputElement>(null);

    const { mutate } = useMutation({ mutationFn: (formData: SignUpInfo) => api.auth.signUp(formData) });
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        const nickname = nicknameRef.current.value.trim() || crypto.randomUUID();

        if (!email || !password) {
            alert('입력란을 모두 입력해주세요');
            return;
        }

        const formData = { id: email, password, nickname };
        mutate(formData);
    };
    return (
        <div>
            <form className='flex flex-col gap-y-2' onSubmit={handleSubmit}>
                <input type='email' placeholder='email' ref={emailRef} />
                <input type='password' placeholder='password' ref={passwordRef} />
                <input type='text' placeholder='nickname' ref={nicknameRef} />

                <button type='submit'>Sign up</button>
            </form>
        </div>
    );
};

export default Signup;
