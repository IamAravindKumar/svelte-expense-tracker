import { writable } from 'svelte/store';

function createExpenseStore() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        add: (expense) => {
            const newExpense = {}
            newExpense['expenseDate'] = expense.expenseDate
            newExpense['category'] = expense.category
            newExpense['amount'] = parseFloat(expense.amount)
            newExpense['expenseID'] = new Date().valueOf()

            update((expenses) => {
                expenses = [...expenses, newExpense]
                return expenses
            })
        },
        delete: (expenseID) => {
            update((expenses) => {
                expenses = expenses.filter(e => e.expenseID !== expenseID)
                return expenses
            })
        },
    }
}

export const expenses = createExpenseStore()