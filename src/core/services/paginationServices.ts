import { useAppStore } from "@/core/stores/appStore";

export interface SetPaginationProps {
  key: string;
  page?: number;
  perPage: number;
  count?: number;
}

export const setPagination = ({
  key,
  page,
  perPage,
  count,
}: SetPaginationProps) => {
  const { setState } = useAppStore;
  setState((state) => ({
    ...state,
    paginations: {
      ...state.paginations,
      [key]: {
        page,
        perPage,
        count,
      },
    },
  }));
};
