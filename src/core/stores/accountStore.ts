import { getAccountsApi } from "@/core/api/accountApi"
import { User } from "@/core/domain"
import { AccountStoreState, AppStoreState } from "@/core/domain/storeDomain"


export const createAccountStore = (set: (fn: (state: AppStoreState) => Partial<AppStoreState>) => void): AccountStoreState => {
    return ({
        async getAccounts() {
            const accounts: User[] = await getAccountsApi();
            set((_) => ({accounts: accounts})); 
        },
       accounts: []
    })
}