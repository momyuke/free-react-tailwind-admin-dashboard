import { axiosApi } from "@/core/api";
import { User } from "@/core/domain";

const USER = '/user';

export const loginApi = async (user: User) => {
    return await axiosApi.post(`${USER}/login`, user);
}
