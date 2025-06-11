export interface User {
  accountId: string;
  roleId: string;
  roleName: string;
  employeeCode: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  token: string;
  isSuperAdmin: boolean;
  isActive: number;
  createdAt: string;
}

export interface AuthCredential {
  username: string;
  password: string;
}

export const COOKIE_TOKEN_KEY = "token";
export const COOKIE_USER_KEY = "logged_user";

export const defaultUser: User = {
  accountId: "",
  roleId: "",
  roleName: "",
  employeeCode: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  token: "",
  isSuperAdmin: false,
  isActive: 0,
  createdAt: "",
};
