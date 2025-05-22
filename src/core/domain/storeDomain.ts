import { AuthCredential, User } from "@/core/domain/userDomain";

export interface UserStoreState {
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

export interface ClientStoreState {
    clients: User[],
}


export type AppStoreState = ModalStoreState & UserStoreState
