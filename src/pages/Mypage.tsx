import { useRef, useState } from 'react';

import Loading from '../components/Loading';
import { useUpdateProfileMutation } from '../hooks/mutations';
import { useFetchQuery } from '../hooks/queries';

const Mypage = () => {
    const { data: userInfo, isPending } = useFetchQuery();
    const { submitFormData } = useUpdateProfileMutation();
    const nicknameRef = useRef<HTMLInputElement>(null);
    const [ImgUrl, setImgUrl] = useState<string>('');
    const [ImgFile, setImgFile] = useState<File | null>(null);

    if (isPending) return <Loading />;

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
            <div className='border rounded p-4 flex gap-x-4'>
                <label className='flex'>
                    <img
                        src={userInfo.avatar}
                        alt='유저 프로필 이미지'
                        className='aspect-square w-48 h-48 object-cover'
                    />
                </label>
                <div className='flex flex-col'>
                    <h4>ID : {userInfo.id}</h4>
                    <h4>Nickname : {userInfo.nickname}</h4>
                </div>
            </div>

            <h3 className='text-xl font-semibold mt-8'>Profile Update</h3>
            <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
                <div className='flex justify-center'>
                    {ImgUrl ? (
                        <img src={ImgUrl} alt='' className='aspect-square w-48 h-48' />
                    ) : (
                        <div className='text-gray-500 text-center aspect-square w-48 h-48 border object-cover'>
                            미리 보기 화면
                        </div>
                    )}
                </div>
                <input type='file' id='profile' name='avatar' onChange={handleChange} />
                <input type='text' id='nickname' name='nickname' ref={nicknameRef} placeholder='nickname' />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default Mypage;
