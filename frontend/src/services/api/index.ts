import type { Json, Reading, RequestParams, Sensor, SensorIn } from '@/services/api/types';

const API_BASE = '/api';

export async function request<T>(
	path: string,
	{ json, headers, ...init }: RequestParams = {},
): Promise<T> {
	const res = await fetch(`${API_BASE}${path}`, {
		headers: {
			'Content-Type': json ? 'application/json' : '',
			...headers,
		},
		body: json ? JSON.stringify(json) : undefined,
		credentials: 'include',
		...init,
	});

	if (!res.ok) {
		throw new Error(`${res.status}: ${res.statusText}`);
	}

	return res.json();
}

export const http = {
	get: <T>(path: string, init?: RequestParams) => request<T>(path, init),
	post: <T>(path: string, json: Json, init?: RequestParams) =>
		request<T>(path, { method: 'POST', json, ...init }),
	put:  <T>(path: string, json: Json, init?: RequestParams) =>
		request<T>(path, { method: 'PUT', json, ...init }),
	delete:  <T>(path: string, init?: RequestParams) =>
		request<T>(path, { method: 'DELETE', ...init }),
};

export const api = {
	getSensors: () => http.get<Sensor[]>('/sensors'),
	createSensor: (payload: SensorIn)=> http.post<SensorIn>('/sensors', payload),
	updateSensor: (id: number, data: SensorIn) => http.put<Sensor>(`/sensors/${id}/`, data),
	deleteSensor: (id: number) => http.delete<void>(`/sensors/${id}/`),
	getReadings: (sensorId: number, limit = 100) => http.get<Reading[]>(`/readings?sensor_id=${sensorId}&limit=${limit}`),
};
