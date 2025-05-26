import { AppStoreState } from "@/core/domain/storeDomain";
import { createAccountStore } from "@/core/stores/accountStore";
import { createAuthStore } from "@/core/stores/authStore";
import { createClientStore } from "@/core/stores/clientStore";
import { createModalStore } from "@/core/stores/modalStore";
import { createPaginationStore } from "@/core/stores/paginationStore";
import { create } from "zustand";

export const useAppStore = create<AppStoreState>(() => ({
  ...createAuthStore(),
  ...createModalStore(),
  ...createAccountStore(),
  ...createClientStore(),
  ...createPaginationStore(),
}));
