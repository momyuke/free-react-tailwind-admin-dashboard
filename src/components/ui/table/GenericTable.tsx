import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toTitleCase } from "@/core/utils";

export type Column<T> = {
  key: keyof T;
  label?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type GenericTableProps<T> = {
  data: T[];
  columns?: Column<T>[];
};

export function GenericTable<T extends object>({
  data,
  columns,
}: GenericTableProps<T>) {
  if (!data || data.length === 0) return <p>No Data</p>;

  const headers =
    columns ??
    Object.keys((data[0] ?? {}) as (keyof T)[]).map((key) => ({
      key,
      label: toTitleCase(key),
      render: null,
    }));

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div>
        <Table className="max-w-full overflow-x-auto">
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {headers.map((value) => (
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {value.label ?? String(value.key)}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data?.map((row, idx) => (
              <TableRow key={idx}>
                {headers.map((col) => {
                  const key = col.key as keyof T;
                  const cellValue = row[key];
                  return (
                    <TableCell
                      key={String(col.key)}
                      className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(cellValue)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
