export interface Client {
  address: string;
  createdAt: string;
  email: string;
  id: string;
  isActive: number;
  name: string;
  phoneNumber: string;
  pic: string;
}

export const defaultClient: Client = {
  id: "",
  name: "",
  phoneNumber: "",
  pic: "",
  email: "",
  address: "",
  createdAt: "",
  isActive: 0,
};
