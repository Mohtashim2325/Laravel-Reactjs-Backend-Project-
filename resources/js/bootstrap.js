import axios from 'axios';

axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true; // if using Sanctum
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axios;
export { axios as http };