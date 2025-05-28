import { ClientStoreState } from "@/core/domain";
import {} from "@/core/stores/modalStore";

export const createClientStore = (): ClientStoreState => ({
  clients: [],
  selectedClient: {
    address: "",
    createdAt: "",
    email: "",
    id: "",
    isActive: 0,
    name: "",
    phoneNumber: "",
    pic: "",
  },
});
