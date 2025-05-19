import axios from 'axios';


export const axiosApi = axios.create({ baseURL: 'https://teguhtriprasetya.com' })

axiosApi.interceptors.response.use((response) => {
    return response;
})

axiosApi.interceptors.request.use((request) => {
    return request;
})


