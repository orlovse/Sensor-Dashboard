'use client';

import {
        getCoreRowModel,
        getSortedRowModel,
        useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import DataTable from '@/components/DataTable/DataTable';
import styles from './ReadingsTable.module.css';
import type { Reading } from '@/services/api/types';
import type { ColumnDef, SortingState } from '@tanstack/react-table';

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
            <DataTable table={table} />
        </div>
        );
}

export default ReadingsTable;
