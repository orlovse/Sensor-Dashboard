'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    const pathname = usePathname();

    console.log('pathname', pathname)

    const links = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/sensors', label: 'Sensors' },
    ];

	return (
        <aside className={styles.aside}>
            <nav>
                <ul className={styles.navList}>
                    {links.map(({ href, label }) => (
                        <li
                            key={href}
                            className={styles.navListItem}
                        >
                            <Link
                                href={href}
                                className={`${styles.navListLink} ${pathname.startsWith(href) ? styles.active : ''}`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
	);
}