import axios from 'axios';


export const axiosApi = axios.create({ baseURL: import.meta.env.VITE_BASE_API_URL })
console.log(import.meta.env.VITE_BASE_API_URL);

axiosApi.interceptors.response.use((response) => {
    return response;
})

axiosApi.interceptors.request.use((request) => {
    return request;
})


