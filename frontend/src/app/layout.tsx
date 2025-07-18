import { Geist, Geist_Mono } from 'next/font/google';
import Providers from '@/app/providers';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Sensor Dashboard',
	description: 'Real-time sensor data visualization',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
