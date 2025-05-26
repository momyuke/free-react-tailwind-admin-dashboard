import { PaginationStoreState } from "@/core/domain/storeDomain";

export const createPaginationStore = (): PaginationStoreState => {
  return {
    paginations: {},
  };
};
