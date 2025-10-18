"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { Chart } from "@/components/chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { expenseApi, type Expense, type NewExpenseData } from "@/lib/api";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Food',
  });

  const categories = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Other'];

  // Load expenses on component mount
  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await expenseApi.getExpenses();
      setExpenses(data.expenses);
      setTotalExpenses(data.total);
    } catch (err) {
      setError('Failed to load expenses. Please check your database connection.');
      console.error('Error loading expenses:', err);
      // Fallback to empty state
      setExpenses([]);
      setTotalExpenses(0);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async () => {
    if (!newExpense.description || !newExpense.amount) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      const expenseData: NewExpenseData = {
        category: newExpense.category,
        amount: parseFloat(newExpense.amount),
        date: newExpense.date,
        description: newExpense.description,
      };

      await expenseApi.createExpense(expenseData);
      
      // Reset form
      setNewExpense({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Food',
      });

      // Reload expenses to get updated data
      await loadExpenses();
    } catch (err) {
      setError('Failed to add expense. Please try again.');
      console.error('Error adding expense:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await expenseApi.deleteExpense(id);
      await loadExpenses(); // Reload expenses
    } catch (err) {
      setError('Failed to delete expense. Please try again.');
      console.error('Error deleting expense:', err);
    }
  };

  // Calculate expense distribution for chart
  const expenseData = categories.map(category => {
    const categoryTotal = expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    return { name: category, value: categoryTotal };
  }).filter(item => item.value > 0);

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatAmount = (amount: string | number) => {
    return parseFloat(amount.toString()).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Expenses</h1>
        <p className="text-muted-foreground">Track and manage your expenses with real-time database storage</p>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600 text-sm">{error}</p>
            {error.includes('database') && (
              <p className="text-red-500 text-xs mt-2">
                Make sure your Neon database is configured in .env.local
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Expense</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newExpense.description}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewExpense({...newExpense, description: e.target.value})}
                    placeholder="Expense description"
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={newExpense.amount}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewExpense({...newExpense, amount: e.target.value})}
                    placeholder="0.00"
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newExpense.date}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewExpense({...newExpense, date: e.target.value})}
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newExpense.category} 
                    onValueChange={(value: string) => setNewExpense({...newExpense, category: value})}
                    disabled={submitting}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                onClick={handleAddExpense} 
                disabled={submitting || !newExpense.description || !newExpense.amount}
              >
                {submitting ? 'Adding...' : 'Add Expense'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses ({expenses.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenses.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No expenses found. Add your first expense above!</p>
                  </div>
                ) : (
                  expenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{expense.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {expense.category} • {formatDate(expense.date)}
                        </p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <p className="font-medium">${formatAmount(expense.amount)}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalExpenses.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {expenses.length} expense{expenses.length !== 1 ? 's' : ''} recorded
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expense Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              {expenseData.length > 0 ? (
                <Chart 
                  data={expenseData} 
                  type="pie" 
                  dataKey="value"
                  categoryKey="name"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>No expense data to display</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}