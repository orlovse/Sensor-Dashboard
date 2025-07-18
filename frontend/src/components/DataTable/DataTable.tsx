'use client';

import { flexRender } from '@tanstack/react-table';
import styles from './DataTable.module.css';
import type { RowData , Table } from '@tanstack/react-table';

interface DataTableProps<T extends RowData> {
  table: Table<T>;
  getCellClassName?: (columnId: string) => string | undefined;
}

function DataTable<T extends RowData>({ table, getCellClassName }: DataTableProps<T>) {
  return (
    <table className={styles.table}>
      <thead>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((h) => (
              <th
                key={h.id}
                onClick={h.column.getToggleSortingHandler()}
                className={styles.headerCell}
              >
                {flexRender(h.column.columnDef.header, h.getContext())}
                {h.column.getIsSorted() === 'asc'
                  ? ' \u25B2'
                  : h.column.getIsSorted() === 'desc'
                  ? ' \u25BC'
                  : ''}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={getCellClassName?.(cell.column.id)}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
