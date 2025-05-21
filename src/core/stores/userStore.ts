import { loginApi } from "@/core/api/userApi";
import { AuthCredential, COOKIE_TOKEN_KEY, LOADING_LOGIN_KEY, User } from "@/core/domain";
import { AppStoreState, UserStoreState } from "@/core/domain/storeDomain";
import { deleteCookie, setCookie } from "@/core/utils";


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


export const createUserStore = (set: (fn: (state: AppStoreState) => Partial<AppStoreState>) => void, get: () => AppStoreState): UserStoreState => {
    return ({
        async login(authCredential: AuthCredential) {
            get().openModal(LOADING_LOGIN_KEY);
            try {
                const result = await loginApi(authCredential)
                set(_ => ({ user: result }))
                setCookie(COOKIE_TOKEN_KEY, result.token);
                return true;
            } catch (e) {
                return false;
            } finally {
                get().closeModal(LOADING_LOGIN_KEY)
            }
        },
        logout() {
            deleteCookie('token');
            set(() => ({user: defaultUser}))
        },
        user: defaultUser
    })
}