/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@/core/domain/clientDomain";
import { User } from "@/core/domain/userDomain";

export interface AuthStoreState {
  user: User;
}

export interface ModalStoreState {
  isOpen: any;
  messages: any;
}

export interface AccountStoreState {
  accounts: User[];
}

export interface ClientStoreState {
  clients: Client[];
  selectedClient?: Client;
}

export interface PaginationStoreState {
  paginations: any;
}

export type AppStoreState = ModalStoreState &
  AccountStoreState &
  AuthStoreState &
  ClientStoreState &
  PaginationStoreState;
