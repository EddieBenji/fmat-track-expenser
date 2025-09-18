import React, { useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { AppState, Transaction, Rule } from './types';
import { computeBalance, recommendedBuckets } from './utils';
import IncomeSetup from './components/IncomeSetup';
import TransactionForm from './components/TransactionForm';
import TransactionsTable from './components/TransactionsTable';
import SummaryCards from './components/SummaryCards';
import Charts from './components/Charts';
import styles from './App.module.css';

const initialState: AppState = {
  monthlyIncome: 10000,
  rule: { needs: 0.5, wants: 0.3, savings: 0.2 },
  transactions: [],
};

const App: React.FC = () => {
  const [state, setState] = useLocalStorage<AppState>('expense-tracker', initialState);

  const addTransaction = (tx: Transaction) => {
    setState({ ...state, transactions: [tx, ...state.transactions] });
  };

  const deleteTransaction = (id: string) => {
    setState({ ...state, transactions: state.transactions.filter(t => t.id !== id) });
  };

  const { totalExpenses, balance, setRules } = useMemo(() => {
    const expenses = state.transactions.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
    const bal = computeBalance(state.monthlyIncome, state.transactions);
    const rec = recommendedBuckets(state.monthlyIncome, state.rule);
    return { totalExpenses: expenses, balance: bal, setRules: rec };
  }, [state]);

  const onChangeIncome = (val: number) => setState({ ...state, monthlyIncome: val });
  const onChangeRule = (rule: Rule) => setState({ ...state, rule });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tracker de Gastos Personales</h1>
        <p className={styles.subtitle}>Del aula a la industria: hábitos financieros + herramientas</p>
      </header>

      <IncomeSetup
        monthlyIncome={state.monthlyIncome}
        rule={state.rule}
        onChangeIncome={onChangeIncome}
        onChangeRule={onChangeRule}
      />

      <SummaryCards
        balance={balance}
        totalExpenses={totalExpenses}
        setRules={setRules}
      />

      <TransactionForm onAdd={addTransaction} />

      <TransactionsTable
        transactions={state.transactions}
        onDelete={deleteTransaction}
      />

      <Charts transactions={state.transactions} />

      <footer className={styles.footer}>
        <small>Hecho en el taller — publica tu versión en Vercel 🚀</small>
      </footer>
    </div>
  );
};

export default App;
