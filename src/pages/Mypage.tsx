import { useRef, useState } from 'react';
import useUpdateProfile from '../hooks/mutations/useUpdateProfile';
import useFetchQuery from '../hooks/queries/useFetchQuery';

const Mypage = () => {
    const { data: userInfo, isPending } = useFetchQuery();
    const { submitFormData } = useUpdateProfile();
    const nicknameRef = useRef<HTMLInputElement>(null);
    const [ImgUrl, setImgUrl] = useState<string>('');
    const [ImgFile, setImgFile] = useState<File | null>(null);

    if (isPending) return <div>Loading...</div>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];

        const objectUrl = URL.createObjectURL(file);
        setImgUrl(objectUrl);
        setImgFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (ImgFile) submitFormData(ImgFile, { nickname: nicknameRef.current?.value || '' });
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
                <label htmlFor='profile' className='flex'>
                    프로필 이미지 :{ImgUrl && <img src={ImgUrl} alt='' className='aspect-square w-32 h-32' />}
                </label>
                <input type='file' id='profile' name='avatar' onChange={handleChange} />
                <label htmlFor='nickname'>nickname : </label>
                <input type='text' id='nickname' name='nickname' ref={nicknameRef} />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default Mypage;
