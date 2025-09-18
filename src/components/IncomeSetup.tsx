import type { FC } from 'react';
import type { Rule } from '../types';
import styles from './IncomeSetup.module.css';

type Props = {
    monthlyIncome: number;
    rule: Rule;
    onChangeIncome: (val: number) => void;
    onChangeRule: (rule: Rule) => void;
};

const IncomeSetup: FC<Props> = ({ monthlyIncome, rule, onChangeIncome, onChangeRule }) => {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Configuración de ingresos</h2>

            <label className={styles.label}>
                <span>Ingreso mensual</span>
                <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => onChangeIncome(Number(e.target.value))}
                    className={styles.input}
                    min={0}
                />
            </label>

            <div className={styles.row}>
                <label className={styles.label}>
                    <span>% Necesidades</span>
                    <input
                        type="number"
                        value={rule.needs * 100}
                        onChange={(e) => onChangeRule({ ...rule, needs: Number(e.target.value) / 100 })}
                        className={styles.input}
                        min={0}
                        max={100}
                    />
                </label>
                <label className={styles.label}>
                    <span>% Deseos</span>
                    <input
                        type="number"
                        value={rule.wants * 100}
                        onChange={(e) => onChangeRule({ ...rule, wants: Number(e.target.value) / 100 })}
                        className={styles.input}
                        min={0}
                        max={100}
                    />
                </label>
                <label className={styles.label}>
                    <span>% Ahorro</span>
                    <input
                        type="number"
                        value={rule.savings * 100}
                        onChange={(e) => onChangeRule({ ...rule, savings: Number(e.target.value) / 100 })}
                        className={styles.input}
                        min={0}
                        max={100}
                    />
                </label>
            </div>
            <p className={styles.hint}>Sugerencia común: 50%/30%/20%, pero ajústalo a tu realidad.</p>
        </div>
    );
};

export default IncomeSetup;
