import axios from 'axios';
import React, { use } from 'react';
import { AuthContext } from '../Context/ContextProvider';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

const useAxiosSecure = () => {

    const {user} = use(AuthContext)

    const token = user?.accessToken

    // console.log(token);

    axiosInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Barer ${token}`

        return config
    })

    return axiosInstance
};



export default useAxiosSecure;