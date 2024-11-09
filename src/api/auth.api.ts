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
        const res = await this.#axios.post('/login', loginInfo);
        this.setAccessToken(res.data.accessToken);
        return res.data;
    }
    setAccessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }
    async fetchUser() {
        const accessToken = localStorage.getItem('accessToken') ?? '';
        const res = await this.#axios.get('/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
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
}

export default Auth;
