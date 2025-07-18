'use client';

import { useState } from 'react';
import Chart from '@/components/Chart/Chart';
import ReadingsTable from '@/components/ReadingsTable/ReadingsTable';
import { useReadings } from '@/hooks/useReadings';
import { useSensors } from '@/hooks/useSensors';

function Dashboard() {
	const { data: sensors = [] } = useSensors();
	const [sensorId, setSensorId] = useState<number>(sensors[0]?.id || 0);

	const readingsQuery = useReadings(sensorId);

	return (
		<main>
			<h1>Real-Time Sensor Dashboard</h1>

			<label>
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

			<Chart data={readingsQuery.data ?? []} />

			<ReadingsTable data={readingsQuery.data ?? []} isLoading={readingsQuery.isLoading} />
		</main>
	);
}

export default Dashboard;
