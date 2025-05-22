export interface User {
    account_id: string;
    role_id: string;
    role_name: string;
    employee_code: string;
    full_name: string;
    email: string;
    phone_number: string;
    token: string;
    is_super_admin: boolean;
    is_active: number;       
    created_at: string;
}


export interface AuthCredential {
    username: string;
    password: string;
}

export const COOKIE_TOKEN_KEY = 'token';

export const defaultUser: User = {
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
