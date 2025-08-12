import axios from 'axios';
import {toast} from "react-toastify";

export const instantClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST_ADDRESS ?? process.env.HOST_ADDRESS,
    withCredentials: true,
})


instantClient.interceptors.request.use(async (config) => {
        config.headers = {
            Accept: 'application/json',
        };

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instantClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    error => {
        if (error.response?.status === 401) {
            // ✅ هندل گلوبال خطای 401
            // مثلاً: حذف توکن، رفتن به لاگین، نمایش toast
            toast.error("لطفا مجددا به سیستم وارد شوید");
            window.location.href = '/auth/login';
        }

        return Promise.reject(error)
    }
);


