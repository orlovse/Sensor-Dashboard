'use client';

import { useState } from 'react';
import Link from 'next/link';
import Chart from '@/components/Chart/Chart';
import ReadingsTable from '@/components/ReadingsTable/ReadingsTable';
import { useReadings } from '@/hooks/useReadings';
import { useSensors } from '@/hooks/useSensors';
import styles from './page.module.css';

function Dashboard() {
        const { data: sensors = [], isLoading } = useSensors();
        const [sensorId, setSensorId] = useState<number>(sensors[0]?.id || 0);

        const readingsQuery = useReadings(sensorId);

        if (isLoading) {
                return (
                        <main className={styles.main}>
                                <p>Loading…</p>
                        </main>
                );
        }

        if (sensors.length === 0) {
                return (
                        <main className={styles.main}>
                                <div className={styles.emptyState}>
                                        <p>No sensors found. <Link href="/sensors">Add a sensor</Link> to get started.</p>
                                </div>
                        </main>
                );
        }

        return (
                <main className={styles.main}>
                        <div className={styles.header}>
                                <h1 className={styles.title}>Real-Time Sensor Dashboard</h1>

                                <label className={styles.sensorSelect}>
                                        Sensor:
                                        <select
                                                value={sensorId}
                                                onChange={(e) => setSensorId(Number(e.target.value))}
                                        >
                                                {sensors.map((sensor) => (
                                                        <option key={sensor.id} value={sensor.id}>
                                                                {sensor.name}
                                                        </option>
                                                        ))}
                                        </select>
                                </label>
                        </div>

                        <div className={styles.card}>
                                <Chart data={readingsQuery.data ?? []} />
                        </div>

                        <div className={styles.card}>
                                <ReadingsTable data={readingsQuery.data ?? []} isLoading={readingsQuery.isLoading} />
                        </div>
                </main>
        );
}

export default Dashboard;
