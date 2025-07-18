import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { api } from '@/services/api';
import type { Reading } from '@/services/api/types';

export function useReadings(sensorId: number) {
	const qc = useQueryClient();

	const query = useQuery<Reading[]>({
		queryKey: ['readings', sensorId],
		queryFn: () => api.getReadings(sensorId),
		enabled: !!sensorId,
	});

	useEffect(() => {
		if (!sensorId) return;

                const ws = new WebSocket(
                        `${location.origin.replace(/^http/, 'ws')}/ws/readings?sensor_id=${sensorId}`,
                );

		ws.onmessage = (evt) => {
			const reading: Reading = JSON.parse(evt.data);
			if (reading.sensor_id !== sensorId) return;

			qc.setQueryData<Reading[]>(['readings', sensorId], (old = []) => [
				reading,
				...old.slice(0, 99),
			]);
		};

                return () => {
                        if (ws.readyState <= WebSocket.OPEN) {
                                ws.close();
                        }
                };
	}, [sensorId, qc]);

	return query;
}
