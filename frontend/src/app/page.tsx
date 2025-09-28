"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { Chart } from "@/components/chart";

export default function FinanceDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockExpenses = [
    { id: 1, title: 'Groceries', amount: 120.50, date: '2023-06-15', category: 'Food' },
    { id: 2, title: 'Gas', amount: 45.00, date: '2023-06-14', category: 'Transportation' },
    { id: 3, title: 'Netflix', amount: 15.99, date: '2023-06-10', category: 'Entertainment' },
    { id: 4, title: 'Electricity', amount: 85.25, date: '2023-06-05', category: 'Utilities' },
  ];

  const mockInvestments = [
    { id: 1, name: 'Bitcoin', type: 'crypto', amount: 5000.00, symbol: 'BTC', quantity: 0.25 },
    { id: 2, name: 'Apple Inc', type: 'stock', amount: 2500.00, symbol: 'AAPL', quantity: 10 },
    { id: 3, name: 'Ethereum', type: 'crypto', amount: 3000.00, symbol: 'ETH', quantity: 2.5 },
  ];

  const mockMarketData = [
    { name: 'Jan', btc: 40000, eth: 2500, aapl: 150 },
    { name: 'Feb', btc: 42000, eth: 2700, aapl: 155 },
    { name: 'Mar', btc: 45000, eth: 3000, aapl: 160 },
    { name: 'Apr', btc: 48000, eth: 3200, aapl: 165 },
    { name: 'May', btc: 50000, eth: 3500, aapl: 170 },
    { name: 'Jun', btc: 52000, eth: 3800, aapl: 175 },
  ];

  const expenseData = [
    { name: 'Food', value: 450 },
    { name: 'Transportation', value: 200 },
    { name: 'Entertainment', value: 150 },
    { name: 'Utilities', value: 300 },
    { name: 'Other', value: 100 },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDashboardData({
        user: { firstName: 'John', lastName: 'Doe' },
        expenses: mockExpenses,
        investments: mockInvestments,
        expenseInsights: 'You are spending 15% more on groceries this month compared to last month. Consider meal planning to reduce costs.',
        investmentRecommendations: 'Your portfolio is performing well. Consider diversifying into tech stocks for long-term growth.',
        marketData: mockMarketData,
      });
      setLoading(false);
    }, 1000);
  }, []);

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
        <p className="text-muted-foreground">Welcome back, {dashboardData?.user.firstName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,560.75</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,345.25</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$10,500.00</div>
            <p className="text-xs text-muted-foreground">+3.8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">756</div>
            <p className="text-xs text-muted-foreground">+12 points from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Market Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <Chart 
              data={mockMarketData} 
              type="line" 
              dataKey="btc"
              categoryKey="name"
            />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.expenses.map((expense: any) => (
                <div key={expense.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{expense.title}</p>
                    <p className="text-sm text-muted-foreground">{expense.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${expense.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{expense.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.investments.map((investment: any) => (
                <div key={investment.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{investment.name}</p>
                    <p className="text-sm text-muted-foreground">{investment.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${investment.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{investment.quantity} {investment.symbol}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Financial Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-primary">Expense Analysis</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {dashboardData?.expenseInsights}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-primary">Investment Advice</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {dashboardData?.investmentRecommendations}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}