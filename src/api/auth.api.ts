import { AxiosInstance } from 'axios';
import { LoginInfo, SignUpInfo } from '../types/todo.type';

class Auth {
    #axios;

    constructor(axios: AxiosInstance) {
        this.#axios = axios;
    }
    async signUp(signupInfo: SignUpInfo) {
        const res = await this.#axios.post('/register', signupInfo);
        return res.data;
    }
    async logIn(loginInfo: LoginInfo) {
        const res = await this.#axios.post('/login?expiresIn=2m', loginInfo);
        this.setAccessToken(res.data.accessToken);

        const parsedUrl = new URL(res.request.responseURL);
        const expiresIn = new URLSearchParams(parsedUrl.search).get('expiresIn');
        this.setExpireToken(expiresIn);

        return res.data;
    }
    async fetchUser() {
        try {
            const accessToken = localStorage.getItem('accessToken') ?? '';
            if (this.isTokenExpired()) {
                alert('토큰이 만료되었습니다.');
                this.logout();
                return;
            }

            const res = await this.#axios.get('/user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.data;
        } catch (error) {
            console.error('Failed to fetch user:', error);
            throw error;
        }
    }
    async updateProfile(updatedProfile) {
        const accessToken = localStorage.getItem('accessToken') ?? '';
        const res = await this.#axios.patch('/profile', updatedProfile, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    }

    setAccessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }
    setExpireToken(expiresIn: string | null) {
        const expirationTime = this.calcExpireTokenTime(expiresIn);
        localStorage.setItem('expireToken', expirationTime);
    }
    calcExpireTokenTime(expiresIn: string) {
        if (!expiresIn) return Date.now() + 1000 * 60 * 60;

        const match = expiresIn.match(/^(\d+)(s|m|h)$/);
        if (match) {
            const value = parseInt(match[1]);
            const unit = match[2];

            let millisec = 0;
            if (unit === 's') millisec = 1000 * value;
            if (unit === 'm') millisec = 1000 * 60 * value;
            if (unit === 'h') millisec = 1000 * 60 * 60 * value;

            return Date.now() + millisec;
        }
    }
    isTokenExpired() {
        const expireTime = localStorage.getItem('expireToken');
        return expireTime ? Date.now() > parseInt(expireTime) : true;
    }
    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expireToken');
        window.location.href = '/login'; // 로그인 페이지로 리디렉션
    }
}

export default Auth;
