import { ApiResponse, GENERAL_ERROR_KEY, GENERAL_ERROR_MESSAGE } from '@/core/domain';
import { useAppStore } from '@/core/stores/appStore';
import { getCookie } from '@/core/utils';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';


export const axiosApi = axios.create({ baseURL: import.meta.env.VITE_BASE_API_URL })

const onErrorResponse = (err: any) => {
     const {response} = err as AxiosError
    const data = response?.data as ApiResponse<any>
    const {openModal, setMessage} = useAppStore.getState()
    setMessage(GENERAL_ERROR_KEY, data.message ?? GENERAL_ERROR_MESSAGE);
    openModal(GENERAL_ERROR_KEY)
}

const onRequest = (request: InternalAxiosRequestConfig<any>) => {
    const token = getCookie('token');
    request.headers.set('Authorization', token);
    return request;
}

axiosApi.interceptors.response.use((response) => response, onErrorResponse)
axiosApi.interceptors.request.use(onRequest)

