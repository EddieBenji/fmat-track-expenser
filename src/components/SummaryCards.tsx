import React from 'react';
import { formatMoney } from '../utils';
import styles from './SummaryCards.module.css';

type Props = {
    balance: number;
    setRules: { needs: number; wants: number; savings: number };
    totalExpenses: number;
};

const SummaryCards: React.FC<Props> = ({ balance, setRules, totalExpenses }) => {
    return (<>
        <div className={styles.grid}>
            <div className={`${styles.card} ${styles.yellow}`}>
                <h3 className={styles.caption}>Objetivo de gastos del mes (Necesidades + deseos)</h3>
                <p className={styles.value}>{formatMoney(setRules.needs + setRules.wants)}</p>
            </div>
            <div className={`${styles.card} ${styles.blue}`}>
                <h3 className={styles.caption}>Objetivo de ahorro</h3>
                <p className={styles.value}>{formatMoney(setRules.savings)}</p>
            </div>
        </div>
        <div className={styles.grid}>
            <div className={`${styles.card} ${styles.green}`}>
                <h3 className={styles.caption}>Saldo actual</h3>
                <p className={styles.value}>{formatMoney(balance)}</p>
            </div>
            <div className={`${styles.card} ${styles.red}`}>
                <h3 className={styles.caption}>Gastos del mes</h3>
                <p className={styles.value}>{formatMoney(totalExpenses)}</p>
            </div>
        </div>
    </>);
};

export default SummaryCards;
