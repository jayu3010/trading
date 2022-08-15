// import { useContext } from 'react';
import axios from 'axios';
import config from 'config';
import { useNavigate } from 'react-router-dom';

// const baseURL = config.get('apiBaseUrl');
const baseURL = config.apiBaseUrl;

const useAxios = () => {
    const navigate = useNavigate();
    // const { accessToken , setAlert } = useContext(null);
    const accessToken = '';
    const token = accessToken || localStorage.getItem('accessToken');

    const instance = axios.create({
        baseURL,
        // withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
    });

    instance.interceptors.request.use(async (req) => {
        req.headers.Authorization = `Bearer ${token}`;
        // const user = jwt_decode(token);

        // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        // if (!isExpired) return req;
        // const response = await axios.post(`${baseURL}/auth/refresh`, {
        //     refresh: localStorage.getItem('refresh')
        // });
        // localStorage.setItem('access', JSON.stringify(response.data.access));
        // localStorage.setItem('refresh', JSON.stringify(response.data.refresh));
        // req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
    });

    instance.interceptors.response.use(
        (req) => req,
        async (error) => {
            // eslint-disable-next-line no-alert
            // const originalRequest = error.config;
            // if (!error.response?.data?.auth) {
            //     localStorage.removeItem('accessToken');
            //     navigate('/login');
            // }
            // // eslint-disable-next-line no-underscore-dangle
            // if (error.response.status === 401 && error.config && !error.config._isRetry) {
            //     localStorage.removeItem('accessToken');
            //     navigate('/login');
            //     // eslint-disable-next-line no-underscore-dangle
            //     // originalRequest._isRetry = true;
            //     // try {
            //     //     const response = await axios.get(`${baseURL}/auth/refresh`, { withCredentials: true });
            //     //     localStorage.setItem('accessToken', response.data.accessToken);
            //     //     return instance.request(originalRequest);
            //     // } catch (e) {
            //     //     console.log('Unauthorized');
            //     // }
            // }
            // throw error;
        }
    );
    return instance;
};

export default useAxios;
