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
    is_active: number;       // Could also be `boolean` if you plan to map 0/1
    created_at: string;      // Use `Date` if you plan to parse it as a date
}


export interface AuthCredential {
    username: string;
    password: string;
}

