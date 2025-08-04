/* eslint-disable @typescript-eslint/no-explicit-any */

import { Client } from "@/core/domain/clientDomain";
import { IProject } from "@/core/domain/projectDomain";
import { User } from "@/core/domain/userDomain";
import { IInvoice } from "./invoiceDomain";

export interface AuthStoreState {
  user: User;
}

export interface ModalStoreState {
  isOpen: any;
  messages: any;
}

export interface AccountStoreState {
  accounts: User[];
  selectedAccount?: User;
}


export interface InvoiceStoreState {
  invoices: IInvoice[],
  selectedInvoice?: IInvoice
}

export interface ClientStoreState {
  clients: Client[];
  selectedClient?: Client;
}

export interface ProjectStoreState {
  projects: IProject[];
  selectedProject?: IProject;
}

export interface PaginationStoreState {
  paginations: any;
}

export type AppStoreState = ModalStoreState &
  AccountStoreState &
  AuthStoreState &
  ClientStoreState &
  PaginationStoreState &
  ProjectStoreState & InvoiceStoreState;
