"use client";

import { useState, ChangeEvent } from 'react';
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

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Groceries', amount: 120.50, date: '2023-06-15', category: 'Food' },
    { id: 2, title: 'Gas', amount: 45.00, date: '2023-06-14', category: 'Transportation' },
    { id: 3, title: 'Netflix', amount: 15.99, date: '2023-06-10', category: 'Entertainment' },
    { id: 4, title: 'Electricity', amount: 85.25, date: '2023-06-05', category: 'Utilities' },
    { id: 5, title: 'Dinner', amount: 65.00, date: '2023-06-01', category: 'Food' },
  ]);

  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Food',
  });

  const categories = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Other'];

  const expenseData = [
    { name: 'Food', value: 450 },
    { name: 'Transportation', value: 200 },
    { name: 'Entertainment', value: 150 },
    { name: 'Utilities', value: 300 },
    { name: 'Other', value: 100 },
  ];

  const handleAddExpense = () => {
    if (newExpense.title && newExpense.amount) {
      const expense = {
        id: expenses.length + 1,
        ...newExpense,
        amount: parseFloat(newExpense.amount),
      };
      setExpenses([expense, ...expenses]);
      setNewExpense({
        title: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Food',
      });
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Expenses</h1>
        <p className="text-muted-foreground">Track and manage your expenses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Expense</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newExpense.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewExpense({...newExpense, title: e.target.value})}
                    placeholder="Expense title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newExpense.amount}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewExpense({...newExpense, amount: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newExpense.date}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewExpense({...newExpense, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newExpense.category} 
                    onValueChange={(value: string) => setNewExpense({...newExpense, category: value})}
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
              <Button onClick={handleAddExpense}>Add Expense</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{expense.title}</p>
                      <p className="text-sm text-muted-foreground">{expense.category} • {expense.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${expense.amount.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expense Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <Chart 
                data={expenseData} 
                type="pie" 
                dataKey="value"
                categoryKey="name"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}