"use client";

import { useState } from 'react';
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

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState([
    { id: 1, name: 'Bitcoin', type: 'crypto', amount: 5000.00, symbol: 'BTC', quantity: 0.25, purchasePrice: 40000.00 },
    { id: 2, name: 'Apple Inc', type: 'stock', amount: 2500.00, symbol: 'AAPL', quantity: 10, purchasePrice: 150.00 },
    { id: 3, name: 'Ethereum', type: 'crypto', amount: 3000.00, symbol: 'ETH', quantity: 2.5, purchasePrice: 1200.00 },
  ]);

  const [newInvestment, setNewInvestment] = useState({
    name: '',
    type: 'stock',
    amount: '',
    symbol: '',
    quantity: '',
    purchasePrice: '',
  });

  const types = ['stock', 'crypto', 'mutual fund', 'gold', 'other'];

  const investmentData = [
    { name: 'Stocks', value: 2500 },
    { name: 'Crypto', value: 8000 },
    { name: 'Mutual Funds', value: 0 },
    { name: 'Gold', value: 0 },
    { name: 'Other', value: 0 },
  ];

  const marketData = [
    { name: 'Jan', btc: 40000, eth: 2500, aapl: 150 },
    { name: 'Feb', btc: 42000, eth: 2700, aapl: 155 },
    { name: 'Mar', btc: 45000, eth: 3000, aapl: 160 },
    { name: 'Apr', btc: 48000, eth: 3200, aapl: 165 },
    { name: 'May', btc: 50000, eth: 3500, aapl: 170 },
    { name: 'Jun', btc: 52000, eth: 3800, aapl: 175 },
  ];

  const handleAddInvestment = () => {
    if (newInvestment.name && newInvestment.amount) {
      const investment = {
        id: investments.length + 1,
        ...newInvestment,
        amount: parseFloat(newInvestment.amount),
        quantity: parseFloat(newInvestment.quantity) || 0,
        purchasePrice: parseFloat(newInvestment.purchasePrice) || 0,
      };
      setInvestments([investment, ...investments]);
      setNewInvestment({
        name: '',
        type: 'stock',
        amount: '',
        symbol: '',
        quantity: '',
        purchasePrice: '',
      });
    }
  };

  const totalInvestments = investments.reduce((sum, investment) => sum + investment.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Investments</h1>
        <p className="text-muted-foreground">Track and manage your investments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Investment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newInvestment.name}
                    onChange={(e) => setNewInvestment({...newInvestment, name: e.target.value})}
                    placeholder="Investment name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input
                    id="symbol"
                    value={newInvestment.symbol}
                    onChange={(e) => setNewInvestment({...newInvestment, symbol: e.target.value})}
                    placeholder="Symbol (e.g. AAPL)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select 
                    value={newInvestment.type} 
                    onValueChange={(value) => setNewInvestment({...newInvestment, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newInvestment.amount}
                    onChange={(e) => setNewInvestment({...newInvestment, amount: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newInvestment.quantity}
                    onChange={(e) => setNewInvestment({...newInvestment, quantity: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchasePrice">Purchase Price</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={newInvestment.purchasePrice}
                    onChange={(e) => setNewInvestment({...newInvestment, purchasePrice: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <Button onClick={handleAddInvestment}>Add Investment</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.map((investment) => (
                  <div key={investment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{investment.name} ({investment.symbol})</p>
                      <p className="text-sm text-muted-foreground capitalize">{investment.type} • {investment.quantity} units</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${investment.amount.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Bought at ${investment.purchasePrice.toFixed(2)}</p>
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
              <CardTitle>Total Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalInvestments.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <Chart 
                data={investmentData} 
                type="pie" 
                dataKey="value"
                categoryKey="name"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <Chart 
                data={marketData} 
                type="line" 
                dataKey="btc"
                categoryKey="name"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}