import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { LoginInfo } from '../../types/todo.type';

const useLoginMutation = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (formData: LoginInfo) => api.auth.logIn(formData),
        onSuccess: () => {
            alert('로그인 성공');
            navigate('/');
        },
        onError: () => alert('로그인 실패'),
    });
};

export default useLoginMutation;
