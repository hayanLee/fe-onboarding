import axios from 'axios';
import Auth from './auth.api';
import Placeholder from './placeholder.api';

const SERVER_URL = 'https://moneyfulpublicpolicy.co.kr';
class API {
    #axios;
    #server_axios;
    ph;
    auth;
    constructor() {
        this.#axios = axios.create({
            baseURL: `${import.meta.env.VITE_JSONPLACEHOLDER}`,
        });
        this.#server_axios = axios.create({
            baseURL: SERVER_URL,
        });

        this.ph = new Placeholder(this.#axios);
        this.auth = new Auth(this.#server_axios);
    }
}

const api = new API();
export default api;
