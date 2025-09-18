export type Rule = { needs: number; wants: number; savings: number }; // ej: 0.5 / 0.3 / 0.2

export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;      // positivo
  category: string;
  date: string;        // ISO
  note?: string;
};

export type AppState = {
  monthlyIncome: number;
  rule: Rule;
  transactions: Transaction[];
};
