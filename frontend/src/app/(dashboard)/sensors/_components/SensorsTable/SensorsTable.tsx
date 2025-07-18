'use client';
import {
        createColumnHelper,
        useReactTable,
        getCoreRowModel,
        getSortedRowModel,
        flexRender,
} from '@tanstack/react-table';
import { useState } from 'react';
import SensorFormDialog from '@/app/(dashboard)/sensors/_components/SensorFormDialog/SensorFormDialog';
import { useSensorMutations, useSensors } from '@/hooks/useSensors';
import styles from './SensorsTable.module.css';
import type { Sensor } from '@/services/api/types';
import type { SortingState } from '@tanstack/react-table';

function SensorTable() {
        const { data = [], isLoading } = useSensors();
        const { remove } = useSensorMutations();
        const [editSensor, setEditSensor] = useState<Sensor | undefined>(undefined);
        const [isOpen, setOpen] = useState(false);
        const [sorting, setSorting] = useState<SortingState>([]);

	const column = createColumnHelper<Sensor>();
        const columns = [
                column.accessor('id', {
                        header: () => 'ID',
                        sortingFn: 'auto',
                }),
                column.accessor('name', {
                        header: () => 'Name',
                        sortingFn: 'auto',
                }),
                column.accessor('location', {
                        header: () => 'Location',
                        sortingFn: 'auto',
                }),
                column.display({
                        id: 'actions',
                        cell: ({ row }) => (
                                <div className={styles.actions}>
                                        <button
                                                className={styles.iconButton}
                                                aria-label="Edit"
                                                onClick={() => {
                                                        setEditSensor(row.original);
                                                        setOpen(true);
                                                }}
                                        >
                                                ✏️
                                        </button>
                                        <button
                                                className={`${styles.iconButton} ${styles.delete}`}
                                                aria-label="Delete"
                                                onClick={() => remove.mutate(row.original.id)}
                                        >
                                                🗑️
                                        </button>
                                </div>
                        ),
                }),
        ];

        const table = useReactTable({
                data,
                columns,
                state: { sorting },
                onSortingChange: setSorting,
                getCoreRowModel: getCoreRowModel(),
                getSortedRowModel: getSortedRowModel(),
        });

        if (isLoading) return <p>Loading…</p>;

        const handleAdd = () => {
                setEditSensor(undefined);
                setOpen(true);
        };

        return (
                <>
                        {data.length === 0 ? (
                                <div className={styles.empty}>
                                        <p>No sensors yet. Add your first sensor.</p>
                                        <button className={styles.addButton} onClick={handleAdd}>
                                                ➕ Add sensor
                                        </button>
                                </div>
                        ) : (
                                <>
                                        <button className={styles.addButton} onClick={handleAdd}>
                                                ➕ Add sensor
                                        </button>

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
                                                                        {h.column.getIsSorted() ? (
                                                                                h.column.getIsSorted() === 'asc' ? ' \u25B2' : ' \u25BC'
                                                                        ) : ''}
                                                                </th>
                                                        ))}
                                                </tr>
                                        ))}
                                </thead>
                                <tbody>
                                        {table.getRowModel().rows.map((row) => (
                                                <tr key={row.id}>
                                                        {row.getVisibleCells().map((cell) => (
                                                                <td key={cell.id} className={cell.column.id === 'actions' ? styles.actions : undefined}>
                                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                                </td>
                                                        ))}
                                                </tr>
                                        ))}
                                </tbody>
                        </table>
                                </>
                        )}

                        <SensorFormDialog
                                open={isOpen}
                                onOpenChange={setOpen}
                                initial={editSensor}
                        />
                </>
        );
}

export default SensorTable;
