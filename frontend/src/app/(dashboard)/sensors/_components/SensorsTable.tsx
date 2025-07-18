'use client';
import {
	createColumnHelper,
	useReactTable,
	getCoreRowModel,
	flexRender,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useSensorMutations, useSensors } from '@/hooks/useSensors';
import type { Sensor } from '@/services/api/types';

function SensorTable() {
	const { data = [], isLoading } = useSensors();
	const { remove } = useSensorMutations();
	const [editSensor, setEditSensor] = useState<Sensor | undefined>(undefined);
	const [isOpen, setOpen] = useState(false);

	const column = createColumnHelper<Sensor>();
	const columns = [
		column.accessor('id', { header: 'ID' }),
		column.accessor('name', { header: 'Name' }),
		column.accessor('location', { header: 'Location' }),
		column.display({
			id: 'actions',
			cell: ({ row }) => (
    <>
        <button onClick={() => { setEditSensor(row.original); setOpen(true); }}>✏️</button>
        <button onClick={() => remove.mutate(row.original.id)}>🗑️</button>
    </>
			),
		}),
	];

	const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

	if (isLoading) return <p>Loading…</p>;

	return (
		<>
			<button onClick={() => { setEditSensor(undefined); setOpen(true); }}>➕ Add sensor</button>

			<table>
				<thead>
					{table.getHeaderGroups().map((hg) => (
						<tr key={hg.id}>
							{hg.headers.map((h) => (
								<th key={h.id}>{flexRender(h.column.columnDef.header, h.getContext())}</th>
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
		</>
	);
}

export default SensorTable;
