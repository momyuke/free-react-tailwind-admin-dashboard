import { COOKIE_TOKEN_KEY } from "@/core/domain";
import { getCookie } from "@/core/utils";
import { Navigate, Outlet } from "react-router";

interface AuthorizedRouteProps {
  isNeedAuthorized?: boolean;
}

export const AuthorizedRoute = ({
  isNeedAuthorized = true,
}: AuthorizedRouteProps) => {
  const token = getCookie(COOKIE_TOKEN_KEY);

  if (!token && isNeedAuthorized) {
    return <Navigate to={"/signin"} replace />;
  }

  if (token && !isNeedAuthorized) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};
