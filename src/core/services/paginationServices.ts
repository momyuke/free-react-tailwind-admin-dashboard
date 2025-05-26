import { useAppStore } from "@/core/stores/appStore";

export interface SetPaginationProps {
  key: string;
  page?: number;
  perPage: number;
}

export const setPagination = ({ key, page, perPage }: SetPaginationProps) => {
  const { setState } = useAppStore;
  setState((state) => ({
    ...state,
    paginations: {
      ...state.paginations,
      [key]: {
        page: page,
        perPage: perPage,
      },
    },
  }));
};
