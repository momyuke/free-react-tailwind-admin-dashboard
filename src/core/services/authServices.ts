import { loginApi } from "@/core/api/userApi";
import {
  AuthCredential,
  COOKIE_TOKEN_KEY,
  COOKIE_USER_KEY,
  defaultUser,
  LoadingKeys,
} from "@/core/domain";
import { closeModal, openModal } from "@/core/services/modalServices";
import { useAppStore } from "@/core/stores/appStore";
import { deleteCookie, setCookie } from "@/core/utils";

export const login = async (authCredential: AuthCredential) => {
  const { setState } = useAppStore;
  openModal(LoadingKeys.LOADING_LOGIN);
  try {
    const result = await loginApi(authCredential);
    setState(() => ({ user: result }));
    setCookie(COOKIE_TOKEN_KEY, result.token);
    setCookie(COOKIE_USER_KEY, JSON.stringify(result));
    return true;
  } catch (e) {
    console.log(e);
  } finally {
    closeModal(LoadingKeys.LOADING_LOGIN);
  }
  return false;
};

export const logout = () => {
  const { setState } = useAppStore;
  deleteCookie("token");
  setState(() => ({ user: defaultUser }));
};
