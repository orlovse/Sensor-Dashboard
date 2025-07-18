'use client';

import { useState } from 'react';
import Chart from '@/components/Chart/Chart';
import ReadingsTable from '@/components/ReadingsTable/ReadingsTable';
import { useReadings } from '@/hooks/useReadings';
import { useSensors } from '@/hooks/useSensors';
import styles from './page.module.css';

function Dashboard() {
	const { data: sensors = [] } = useSensors();
	const [sensorId, setSensorId] = useState<number>(sensors[0]?.id || 0);

	const readingsQuery = useReadings(sensorId);

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
