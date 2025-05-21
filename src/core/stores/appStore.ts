import { AppStoreState } from '@/core/domain/storeDomain';
import { createModalStore } from '@/core/stores/modalStore';
import { createUserStore } from '@/core/stores/userStore';
import { create } from 'zustand';

export const useAppStore = create<AppStoreState>((set, get) => ({
    ...createUserStore(set, get),
    ...createModalStore(set),
}));
