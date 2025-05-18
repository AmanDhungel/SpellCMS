import React from "react";

type Column<T> = {
  header: string;
  accessor: keyof T;
  className?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  actionColumn?: (row: T) => React.ReactNode; // Add this prop
};

function Table<T>({ columns, data, keyField, actionColumn }: TableProps<T>) {
  return (
    <div className="overflow-x-auto w-full  md:w-3/4 m-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-800 rounded-lg shadow">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className={`px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider ${
                  col.className || ""
                }`}>
                {col.header}
              </th>
            ))}
            {actionColumn && (
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {data.map((row) => (
            <tr
              key={String(row[keyField])}
              className="hover:bg-gray-50 dark:hover:bg-gray-900 transition">
              {columns.map((col, index) => (
                <td
                  key={index}
                  className={`px-4 py-3 text-sm text-gray-900 dark:text-gray-100   sm:max-w-[2rem] md:max-w-[10rem] max-w-[5rem] overflow-hidden overflow-ellipsis ${
                    col.className || ""
                  }`}>
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : String(row[col.accessor])}
                </td>
              ))}
              {actionColumn && (
                <td className="px-4 py-3 flex space-y-2">
                  {actionColumn(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
