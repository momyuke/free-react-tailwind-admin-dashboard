import { ClientStoreState } from "@/core/domain";
import {} from "@/core/stores/modalStore";

export const createClientStore = (): ClientStoreState => ({
  clients: [],
});
