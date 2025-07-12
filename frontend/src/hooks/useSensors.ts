import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import type { Sensor, SensorIn } from '@/services/api/types';

export function useSensors() {
	return useQuery<Sensor[]>({
		queryKey: ['sensors'],
		queryFn: api.getSensors,
	});
}

export function useCreateSensor() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data: SensorIn) => api.createSensor(data),
		onSuccess: () => qc.invalidateQueries({ queryKey: ['sensors'] }),
	});
}
