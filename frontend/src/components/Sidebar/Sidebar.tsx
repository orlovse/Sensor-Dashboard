import Link from 'next/link';
import styles from './Sidebar.module.css';

export default function Sidebar() {
	return (
        <aside className={styles.aside}>
            <nav>
                <ul className={styles.navList}>
                    <li className={styles.navListItem}>
                        <Link href="/dashboard" className="">
                            Dashboard
                        </Link>
                    </li>
                    <li className={styles.navListItem}>
                        <Link href="/sensors" className="">
                            Sensors
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
	);
}