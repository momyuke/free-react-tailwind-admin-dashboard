import { COOKIE_USER_KEY, defaultUser } from "@/core/domain";
import { AuthStoreState } from "@/core/domain/storeDomain";
import { getCookie } from "@/core/utils";

export const createAuthStore = (): AuthStoreState => {
  return {
    user:
      JSON.parse(getCookie(COOKIE_USER_KEY, { defaultValue: "{}" })) ??
      defaultUser,
  };
};
