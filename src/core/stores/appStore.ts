import { AppStoreState } from '@/core/domain/storeDomain';
import { createAccountStore } from '@/core/stores/accountStore';
import { createAuthStore } from '@/core/stores/authStore';
import { createModalStore } from '@/core/stores/modalStore';
import { create } from 'zustand';

export const useAppStore = create<AppStoreState>((set, get) => ({
    ...createAuthStore(set, get),
    ...createModalStore(set),
    ...createAccountStore(set),
}));
