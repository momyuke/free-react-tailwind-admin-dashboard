import { loginApi } from "@/core/api/userApi";
import { AuthCredential, User } from "@/core/domain";
import { create } from 'zustand';

interface UserStoreState {
    user: User,
    login: (credential: AuthCredential) => void
}

const defaultUser: User = {
    account_id: "",
    role_id: "",
    role_name: "",
    employee_code: "",
    full_name: "",
    email: "",
    phone_number: "",
    token: "",
    is_super_admin: false,
    is_active: 0,
    created_at: "",
}


export const useUserStore = create<UserStoreState>()((set) => ({
    async login(authCredential) {
        const result = await loginApi(authCredential)
        set(_ => ({ user: result }))
    },

    user: defaultUser
}))