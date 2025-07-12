export interface SensorIn { name: string; location?: string }

export interface Sensor extends SensorIn { id: number }

export interface Reading {
	id: number;
	sensor_id: number;
	timestamp: string;
	temperature: number;
	humidity: number;
}

export type Json = unknown;

export interface RequestParams extends RequestInit {
	json?: unknown;
}
