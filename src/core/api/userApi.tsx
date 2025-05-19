import { axiosApi } from "@/core/api";
import { ApiResponse, AuthCredential, User } from "@/core/domain";


export const loginApi = async (authCredential: AuthCredential): Promise<User> => {
    const result = await axiosApi.post('/auth/login', authCredential);
    const response: ApiResponse<User> = result.data as ApiResponse<User>
    return response.data;
}
