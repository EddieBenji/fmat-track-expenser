import type { Rule, Transaction } from './types';

export const recommendedBuckets = (income: number, rule: Rule) => ({
    needs: income * rule.needs,
    wants: income * rule.wants,
    savings: income * rule.savings,
});

export const computeBalance = (income: number, txs: Transaction[]) => {
    const sumIn = txs.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
    const sumOut = txs.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
    return income + sumIn - sumOut;
};

export const formatMoney = (n: number) =>
    n.toLocaleString(undefined, { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

export const startOfMonthISO = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
export const endOfMonthISO = (d = new Date()) => new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString();
