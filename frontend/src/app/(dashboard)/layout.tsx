import Sidebar from '@/components/Sidebar/Sidebar';
import styles from './layout.module.css';
import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode; }) {
	return (
		<div className={styles.layoutContainer}>
			<Sidebar/>

			<main className={styles.layoutMain}>
				{children}
			</main>
		</div>
	);
}