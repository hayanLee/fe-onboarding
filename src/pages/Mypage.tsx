import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import api from '../api/api';

const Mypage = () => {
    const queryClient = useQueryClient();
    const [formData, setformData] = useState<{ avatar: File | null; nickname: string }>({
        avatar: null,
        nickname: '',
    });
    const { data: userInfo, isPending } = useQuery({
        queryKey: ['user'],
        queryFn: () => api.auth.fetchUser(),
    });

    const { mutate } = useMutation({
        mutationFn: (formData) => {
            const data = new FormData();
            if (formData.avatar) data.append('avatar', formData.avatar);
            data.append('nickname', formData.nickname);
            return api.auth.updateProfile(data);
        },
        onSuccess: () => {
            alert('변경되었습니다');
            queryClient.invalidateQueries(['user']);
        },
    });

    if (isPending) return <div>Loading...</div>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        if (name === 'avatar') {
            setformData((prev) => ({ ...prev, avatar: files?.[0] || null }));
        } else {
            setformData((prev) => ({ ...prev, nickname: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
    };

    return (
        <div>
            <h3 className='text-xl font-semibold'>Profile</h3>
            <div>
                <h4>ID : {userInfo.id}</h4>
                <h4>Nickname : {userInfo.nickname}</h4>
                <label className='flex'>
                    <h4>Profile</h4>
                    <img src={userInfo.avatar} alt='유저 프로필 이미지' className='aspect-square w-32 h-32' />
                </label>
            </div>

            <h3 className='text-xl font-semibold mt-8'>Profile Update</h3>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <label htmlFor='profile'>프로필 이미지 :</label>
                <input type='file' id='profile' name='avatar' onChange={handleChange} />
                <label htmlFor='nickname'>nickname : </label>
                <input type='text' id='nickname' name='nickname' value={formData.nickname} onChange={handleChange} />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default Mypage;
