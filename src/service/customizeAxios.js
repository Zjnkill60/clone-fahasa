import axios from 'axios';
import 'dotenv'


const baseURL = import.meta.env.VITE_URL_BACKEND
console.log('baseURL : ', baseURL)
const instance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    withCredentials: true,

});

const handleRefreshToken = async () => {
    return await instance.get('auth/refreshToken')
}
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.config && error.response?.status == 401 && error.response?.data?.message == "Token invalid !") {
        let res = await handleRefreshToken()
        console.log(res)
        if (res && res.data) {
            error.config.headers['Authorization'] = `Bearer ${res.data.access_token}`
            localStorage.setItem('access_token', res.data.access_token)
            return axios.request(error.config)
        }
    }

    return error.response?.data ?? Promise.reject(error)
});

export default instance
