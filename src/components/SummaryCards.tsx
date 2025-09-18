import React from 'react';
import { formatMoney } from '../utils';
import styles from './SummaryCards.module.css';

type Props = {
    balance: number;
    recommendedSavings: number;
    totalExpenses: number;
};

const SummaryCards: React.FC<Props> = ({ balance, recommendedSavings, totalExpenses }) => {
    return (
        <div className={styles.grid}>
            <div className={`${styles.card} ${styles.green}`}>
                <h3 className={styles.caption}>Saldo actual</h3>
                <p className={styles.value}>{formatMoney(balance)}</p>
            </div>
            <div className={`${styles.card} ${styles.red}`}>
                <h3 className={styles.caption}>Gastos del mes</h3>
                <p className={styles.value}>{formatMoney(totalExpenses)}</p>
            </div>
            <div className={`${styles.card} ${styles.blue}`}>
                <h3 className={styles.caption}>Ahorro recomendado</h3>
                <p className={styles.value}>{formatMoney(recommendedSavings)}</p>
            </div>
        </div>
    );
};

export default SummaryCards;
