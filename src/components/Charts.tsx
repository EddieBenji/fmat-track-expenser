import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { Transaction } from '../types';
import styles from './Charts.module.css';

type Props = { transactions: Transaction[] };

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4', '#84cc16'];

const Charts: React.FC<Props> = ({ transactions }) => {
    const expenses = transactions.filter((t) => t.type === 'expense');

    const data = Object.values(
        expenses.reduce((acc: Record<string, { name: string; value: number }>, tx) => {
            if (!acc[tx.category]) acc[tx.category] = { name: tx.category, value: 0 };
            acc[tx.category].value += tx.amount;
            return acc;
        }, {})
    );

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Gastos por categoría</h2>
            <div className={styles.chartWrap}>
                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie data={data} dataKey="value" nameKey="name" outerRadius={95}>
                            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Charts;
