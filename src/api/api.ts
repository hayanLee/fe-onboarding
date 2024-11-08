import axios from 'axios';
import Placeholder from './placeholder.api';

class API {
    #axios;
    ph;
    constructor() {
        this.#axios = axios.create({
            baseURL: `${import.meta.env.VITE_JSONPLACEHOLDER}`,
        });
        this.ph = new Placeholder(this.#axios);
    }
}

const api = new API();
export default api;
