export interface Expense {
  id: string;
  category: string;
  amount: string;
  date: Date;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewExpenseData {
  category: string;
  amount: number;
  date: string;
  description?: string;
}

export interface ExpensesResponse {
  expenses: Expense[];
  total: number;
}

// API calls for expenses
export const expenseApi = {
  // Get all expenses
  getExpenses: async (): Promise<ExpensesResponse> => {
    const response = await fetch('/api/expenses');
    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }
    return response.json();
  },

  // Create new expense
  createExpense: async (expense: NewExpenseData): Promise<Expense> => {
    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    });
    if (!response.ok) {
      throw new Error('Failed to create expense');
    }
    return response.json();
  },

  // Update expense
  updateExpense: async (id: string, expense: Partial<NewExpenseData>): Promise<Expense> => {
    const response = await fetch(`/api/expenses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    });
    if (!response.ok) {
      throw new Error('Failed to update expense');
    }
    return response.json();
  },

  // Delete expense
  deleteExpense: async (id: string): Promise<void> => {
    const response = await fetch(`/api/expenses/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete expense');
    }
  },

  // Get specific expense
  getExpense: async (id: string): Promise<Expense> => {
    const response = await fetch(`/api/expenses/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch expense');
    }
    return response.json();
  },
};