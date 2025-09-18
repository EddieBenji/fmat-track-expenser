import React, { useState } from 'react';
import type { Transaction } from '../types';
import styles from './TransactionForm.module.css';

type Props = { onAdd: (tx: Transaction) => void };

const defaultCategories: string[] = ['Comida', 'Transporte', 'Ocio', 'Servicios', 'Salud', 'Belleza', 'Renta', 'Ahorro', 'Otros'];

const TransactionForm: React.FC<Props> = ({ onAdd }) => {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>(defaultCategories[0]);
  const [note, setNote] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;
    onAdd({
      id: crypto.randomUUID(),
      type,
      amount,
      category,
      date: new Date().toISOString(),
      note,
    });
    setAmount(0);
    setNote('');
    setCategory(defaultCategories[0]);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
      <h2 className={styles.title}>Nueva transacción</h2>

      <div className={styles.row}>
        <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')} className={styles.input}>
          <option value="income">Ingreso</option>
          <option value="expense">Gasto</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={styles.input}>
          {defaultCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

      </div>

      <div className={styles.row}>

        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className={styles.input}
          min={0}
        />
        <input
          type="text"
          placeholder="Nota (opcional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.btn}>Agregar</button>
    </form>
  );
};

export default TransactionForm;
