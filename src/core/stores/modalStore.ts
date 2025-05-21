import { AppStoreState, ModalStoreState } from "@/core/domain/storeDomain"


export const createModalStore = (set: (fn: (state: AppStoreState) => Partial<AppStoreState>) => void): ModalStoreState => {
    return ({
        closeModal: (key: string) => {
            set((state) => ({
                ...state,
                isOpen: {
                    ...state.isOpen,
                    [key]: false,
                }
            }))
        },

        openModal: (key: string) => {
            set((state) => ({
                ...state,
                isOpen: {
                    ...state.isOpen,
                    [key]: true,
                }
            }))
        },
        setMessage(key: string, message: string) {
            set((state) => ({
                ...state,
                messages: {
                    ...state.messages,
                    [key]: message,
                }
            }))
        },
        isOpen: {},
        messages: {},
    })
}