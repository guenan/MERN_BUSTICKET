import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

export {axiosInstance};