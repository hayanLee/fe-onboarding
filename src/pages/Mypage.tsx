import { useQuery } from '@tanstack/react-query';
import api from '../api/api';

const Mypage = () => {
    const { data: userInfo, isPending } = useQuery({
        queryKey: ['user'],
        queryFn: () => api.auth.fetchUser(),
    });

    if (isPending) return <div>Loading...</div>;

    return (
        <div>
            <h4>id : {userInfo.id}</h4>
            <h4>nickname : {userInfo.nickname}</h4>
            <label htmlFor='profile'>프로필 이미지 :</label>
            <img src={userInfo.avatar} alt='유저 프로필 이미지' />
            <input type='file' id='profile' />
        </div>
    );
};

export default Mypage;
