'use client';

import SensorTable from '@/app/(dashboard)/sensors/_components/SensorsTable';

function SensorsPage() {
	return (
		<main style={{ padding: 24 }}>
			<h1>Sensors</h1>
			<SensorTable />
		</main>
	);
}

export default SensorsPage;
