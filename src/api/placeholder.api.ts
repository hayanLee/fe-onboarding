import { AxiosInstance } from 'axios';

class Placeholder {
    #axios;
    constructor(axios: AxiosInstance) {
        this.#axios = axios;
    }
    async getTodos() {
        const response = await this.#axios.get('/todos');
        return response.data;
    }
}

export default Placeholder;
