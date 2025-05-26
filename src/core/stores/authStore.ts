import { loginApi } from "@/core/api/userApi";
import { AuthCredential, COOKIE_TOKEN_KEY, COOKIE_USER_KEY, defaultUser, LOADING_LOGIN_KEY } from "@/core/domain";
import { AppStoreState, AuthStoreState } from "@/core/domain/storeDomain";
import { deleteCookie, getCookie, setCookie } from "@/core/utils";

export const createAuthStore = (set: (fn: (state: AppStoreState) => Partial<AppStoreState>) => void, get: () => AppStoreState): AuthStoreState => {
    return ({
        async login(authCredential: AuthCredential) {
            get().openModal(LOADING_LOGIN_KEY);
            try {
                const result = await loginApi(authCredential)
                set(_ => ({ user: result }))
                setCookie(COOKIE_TOKEN_KEY, result.token);
                setCookie(COOKIE_USER_KEY, JSON.stringify(result));
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
        user: JSON.parse(getCookie(COOKIE_USER_KEY, {defaultValue: '{}'})) ?? defaultUser
    })
}
