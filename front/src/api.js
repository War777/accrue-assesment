import axios from 'axios';
import {
    applyAuthTokenInterceptor,
    getAccessToken,
    getBrowserLocalStorage
} from 'axios-jwt';

const BASE_URL = 'http://localhost:3000';

const axiosInstance = axios.create({ baseURL: BASE_URL });

const getStorage = getBrowserLocalStorage;

applyAuthTokenInterceptor(
    axiosInstance,
    {
        getStorage,
        requestRefresh: (refreshToken) => { console.log('requestRefresh', refreshToken); },
        header: 'Authorization',
        headerPrefix: 'Bearer',
    },
);

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
);

export default axiosInstance;
