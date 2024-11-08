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
        return res.data;
    }
    async getUser() {}
    async updateProfile() {}
}

export default Auth;
