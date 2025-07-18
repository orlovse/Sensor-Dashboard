'use client';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import styles from './Chart.module.css';
import type { Reading } from '@/services/api/types';

function Chart({ data }: { data: Reading[] }) {
        return (
        <div className={styles.chartWrapper}>
            <ResponsiveContainer>
                <LineChart data={[...data].reverse()}>
                    <XAxis dataKey="timestamp" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
                    <YAxis yAxisId="left" domain={['dataMin - 1', 'dataMax + 1']} />
                    <YAxis yAxisId="right" orientation="right" domain={[30, 70]} hide />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="temperature" strokeWidth={2} dot={false} />
                    <Line yAxisId="right" type="monotone" dataKey="humidity" strokeDasharray="3 3" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
	);
}

export default Chart;
