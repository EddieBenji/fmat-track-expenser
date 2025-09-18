import React from 'react';
import type { Transaction } from '../types';
import { formatMoney } from '../utils';
import styles from './TransactionsTable.module.css';

type Props = { transactions: Transaction[]; onDelete: (id: string) => void };

const TransactionsTable: React.FC<Props> = ({ transactions, onDelete }) => {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Historial</h2>
            {transactions.length === 0 ? (
                <p className={styles.empty}>No hay transacciones registradas.</p>
            ) : (
                <ul className={styles.list}>
                    {transactions.map((tx) => (
                        <li key={tx.id} className={styles.item}>
                            <div>
                                <p className={styles.amount}>
                                    {tx.type === 'expense' ? '-' : '+'}{formatMoney(tx.amount)}
                                </p>
                                <p className={styles.meta}>
                                    {tx.category} — {new Date(tx.date).toLocaleDateString()}
                                </p>
                                {tx.note && <p className={styles.note}>{tx.note}</p>}
                            </div>
                            <button onClick={() => onDelete(tx.id)} className={styles.delete}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionsTable;
