'use client';

import SensorTable from '@/app/(dashboard)/sensors/_components/SensorsTable/SensorsTable';
import styles from './page.module.css';

function SensorsPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Sensors</h1>
      <div className={styles.card}>
        <SensorTable />
      </div>
    </main>
  );
}

export default SensorsPage;
