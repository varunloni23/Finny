"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { Chart } from "@/components/chart";
import { FinnyIntegrationDemo } from "@/components/finny-integration-demo";
import { expenseApi, type Expense } from "@/lib/api";

export default function FinanceDashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState({ firstName: 'User' });

  useEffect(() => {
    loadDashboardData();
    loadUserProfile();
  }, []);

  const loadUserProfile = () => {
    const savedProfile = localStorage.getItem('finny-profile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setUserProfile(parsedProfile);
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load real expense data from database
      const expenseData = await expenseApi.getExpenses();
      setExpenses(expenseData.expenses.slice(0, 4)); // Show only recent 4 expenses
      setTotalExpenses(expenseData.total);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Error loading dashboard data:', err);
      // Set empty state on error
      setExpenses([]);
      setTotalExpenses(0);
    } finally {
      setLoading(false);
    }
  };

  // Calculate expense distribution from real data
  const categories = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Other'];
  const expenseData = categories.map(category => {
    const categoryTotal = expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    return { name: category, value: categoryTotal };
  }).filter(item => item.value > 0);

  // Calculate monthly metrics
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatAmount = (amount: string | number) => {
    return parseFloat(amount.toString()).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading your financial dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {userProfile.firstName}! Here&apos;s your financial overview
        </p>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600 text-sm">{error}</p>
            <p className="text-red-500 text-xs mt-2">
              Some features may not work without database connection
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All time expenses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{monthlyExpenses.length} expenses this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expenses.length}</div>
            <p className="text-xs text-muted-foreground">Expense entries tracked</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : '0.00'}
            </div>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Finny Integration Demo */}
      <div className="grid grid-cols-1 gap-6">
        <FinnyIntegrationDemo />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <div className="text-center">
                  <p>No expense data to display</p>
                  <p className="text-sm">Add expenses to see distribution</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No expenses found</p>
                  <p className="text-sm">Go to the Expenses page to add your first expense</p>
                </div>
              ) : (
                expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-muted-foreground">{expense.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${formatAmount(expense.amount)}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(expense.date)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-primary">Expense Tracking</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your expenses are now stored in real-time in the Neon database. 
                  All data is persistent and synchronized across sessions.
                  {expenses.length > 0 && ` You have ${expenses.length} expense records totaling $${totalExpenses.toFixed(2)}.`}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-primary">Getting Started</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {expenses.length === 0 
                    ? "Start by adding your first expense using the Expenses page. Your data will be automatically saved to the database."
                    : "Continue tracking your expenses to build a comprehensive financial overview. Use the expense categories to organize your spending patterns."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}