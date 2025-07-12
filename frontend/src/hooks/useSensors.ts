import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import type { Sensor, SensorIn } from '@/services/api/types';

export function useSensors() {
	return useQuery<Sensor[]>({
		queryKey: ['sensors'],
		queryFn: api.getSensors,
	});
}

export function useSensorMutations() {
	const qc = useQueryClient();
	const invalidate = () => qc.invalidateQueries({ queryKey: ['sensors'] });

	return {
		create: useMutation({ mutationFn: api.createSensor, onSuccess: invalidate }),
		update: useMutation({
			mutationFn: ({ id, data }: { id: number; data: SensorIn }) =>
				api.updateSensor(id, data),
			onSuccess: invalidate,
		}),
		remove: useMutation({
			mutationFn: api.deleteSensor,
			onSuccess: invalidate,
		}),
	};
}
