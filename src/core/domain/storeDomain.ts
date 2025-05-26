import { AuthCredential, User } from "@/core/domain/userDomain";

export interface AuthStoreState {
    user: User,
    login: (credential: AuthCredential) => Promise<boolean>
    logout: () => void
}

export interface ModalStoreState {
    isOpen: any;
    messages: any;
    openModal: (key: string) => void;
    closeModal: (key: string) => void;
    setMessage: (key: string, message: string) => void;
}

export interface AccountStoreState {
    accounts: User[];
    getAccounts: () => Promise<void>;
}

export interface ClientStoreState {
    clients: User[],
}


export type AppStoreState = ModalStoreState  & AccountStoreState & AuthStoreState
