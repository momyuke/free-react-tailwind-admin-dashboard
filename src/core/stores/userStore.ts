import { loginApi } from "@/core/api/userApi";
import { User } from "@/core/domain";
import { create } from 'zustand';

interface UserStoreState {
    user: User,
    login: (user: User) => void
}


export const useUserStore = create<UserStoreState>()((_) => ({
    async login(user) {
        loginApi(user)
        return;
    },

    user: {
        password: '',
        username: '',
    }
}))