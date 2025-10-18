"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { Chart } from "@/components/chart";

export default function CreditPage() {
  const creditScoreHistory = [
    { month: 'Jan', score: 720 },
    { month: 'Feb', score: 725 },
    { month: 'Mar', score: 730 },
    { month: 'Apr', score: 735 },
    { month: 'May', score: 742 },
    { month: 'Jun', score: 756 },
  ];

  const factors = [
    { name: 'Payment History', value: 35, color: '#10b981' },
    { name: 'Credit Utilization', value: 30, color: '#3b82f6' },
    { name: 'Length of Credit', value: 15, color: '#f59e0b' },
    { name: 'Credit Mix', value: 10, color: '#ef4444' },
    { name: 'New Credit', value: 10, color: '#8b5cf6' },
  ];

  const recommendations = [
    { id: 1, title: 'Pay credit card balance in full', description: 'Paying your balance in full each month can improve your credit utilization ratio.', impact: 'High' },
    { id: 2, title: 'Keep old accounts open', description: 'Closing old accounts can shorten your credit history and lower your score.', impact: 'Medium' },
    { id: 3, title: 'Avoid new credit inquiries', description: 'Multiple hard inquiries in a short period can negatively impact your score.', impact: 'Medium' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Credit Score</h1>
        <p className="text-muted-foreground">Monitor and improve your credit score</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Credit Score Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-5xl font-bold">756</div>
                  <div className="text-muted-foreground">Excellent</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-500">+12</div>
                  <div className="text-muted-foreground">from last month</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Credit Score History</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <Chart 
                data={creditScoreHistory} 
                type="line" 
                dataKey="score"
                categoryKey="month"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((recommendation) => (
                  <div key={recommendation.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{recommendation.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        recommendation.impact === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {recommendation.impact} Impact
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {recommendation.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Factors Affecting Your Score</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <Chart 
                data={factors} 
                type="pie" 
                dataKey="value"
                categoryKey="name"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Credit Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Current Utilization</span>
                    <span className="text-sm font-medium">22%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '22%' }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Ideal: Below 30%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}