import { setPagination } from "@/core/services";
import { useAppStore } from "@/core/stores/appStore";

interface PaginationProps {
  onChange: (page: number, perPage: number) => void;
  key: string;
}

const PER_PAGE_OPTIONS = [5, 10, 20, 50];

export const Pagination = (props: PaginationProps) => {
  const { paginations } = useAppStore();
  const selectedPagination = paginations[props.key];
  const { page, perPage, count } = selectedPagination ?? {
    page: 1,
    perPage: 10,
    count: 0,
  };
  const totalPages = Math.round(count / perPage);

  const goToPage = (newPage: number) => {
    props.onChange(newPage, perPage);
    setPagination({ key: props.key, perPage, page: newPage, count });
  };

  const changePerPage = (newPerPage: number) => {
    props.onChange(page, newPerPage);
    setPagination({ key: props.key, perPage: newPerPage, page: page, count });
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-white dark:bg-gray-800 x justify-end pr-20 mt-5">
      {/* Per Page Dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-300">
          Rows per page:
        </label>
        <select
          value={perPage}
          onChange={(e) => changePerPage(parseInt(e.target.value))}
          className="rounded-md px-2 py-1 bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none"
        >
          {PER_PAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        className="px-3 py-1 dark:text-white rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
        onClick={() => goToPage(1)}
        disabled={page === 1}
      >
        ⏮
      </button>
      <button
        className="px-3 dark:text-white py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
      >
        ◀
      </button>

      <button
        className={`px-3 py-1 rounded-lg transition dark:text-sky-50 bg-blue-600 text-white`}
      >
        {page}
      </button>

      <button
        className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:text-sky-50 dark:hover:bg-gray-600 transition disabled:opacity-50"
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages}
      >
        ▶
      </button>
      <button
        className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
        onClick={() => goToPage(totalPages)}
        disabled={page >= totalPages}
      >
        ⏭
      </button>
    </div>
  );
};
