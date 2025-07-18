'use client';

import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import type { Reading } from '@/services/api/types';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import styles from './ReadingsTable.module.css';

const columns: ColumnDef<Reading>[] = [
	{
		accessorKey: 'timestamp',
		header: 'Time',
		cell: (info) => new Date(info.getValue<string>()).toLocaleTimeString(),
	},
	{ accessorKey: 'temperature', header: '°C' },
	{ accessorKey: 'humidity', header: '% RH' },
];

function ReadingsTable({ data, isLoading }: {
	data: Reading[];
	isLoading: boolean;
}) {
	const [sorting, setSorting] = useState<SortingState>([
		{ id: 'timestamp', desc: true },
	]);

	const table = useReactTable({
		data,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	if (isLoading) return <p>Loading data…</p>;

        return (
        <div className={styles.wrapper}>
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
                                {h.column.getIsSorted() === 'asc' ? ' ▲' : h.column.getIsSorted() === 'desc' ? ' ▼' : ''}
                            </th>
						))}
                    </tr>
				))}
            </thead>

            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
						))}
                    </tr>
				))}
            </tbody>
        </table>
    </div>
	);
}

export default ReadingsTable;
