"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles } from "lucide-react";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  sources: string[];
}

interface CustomAnswer {
  answer: string;
  sources?: string[];
  followUpQuestions?: string[];
}

interface AIRecommendationsProps {
  userId: number;
}

export function AIRecommendations({ userId }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [customAnswer, setCustomAnswer] = useState<CustomAnswer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock recommendations for demonstration
    const mockRecommendations: Recommendation[] = [
      {
        id: "1",
        title: "Overspending Alert",
        description: "You're spending 25% more on dining out this month compared to your budget.",
        category: "Spending",
        priority: "high",
        sources: ["transaction_analysis.pdf", "budget_report.pdf"]
      },
      {
        id: "2",
        title: "Savings Opportunity", 
        description: "You could save $150/month by switching to a high-yield savings account.",
        category: "Savings",
        priority: "medium",
        sources: ["interest_comparison.pdf"]
      },
      {
        id: "3",
        title: "Investment Suggestion",
        description: "Consider rebalancing your portfolio to include more tech stocks based on market trends.",
        category: "Investment",
        priority: "medium",
        sources: ["portfolio_analysis.pdf", "market_report.pdf"]
      }
    ];
    
    // Load mock recommendations
    setRecommendations(mockRecommendations);
  }, []);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }

    setLoading(true);
    setError(null);
    setCustomAnswer(null);

    try {
      const response = await fetch(`/api/rag/query?userId=${userId}&question=${encodeURIComponent(question)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get answer');
      }

      setCustomAnswer(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing your question');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI-Powered Financial Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Ask a specific question about your finances:</h3>
            <div className="flex gap-2">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., How can I optimize my monthly budget?"
                className="flex-1"
                disabled={loading}
              />
              <Button onClick={handleAskQuestion} disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Ask"
                )}
              </Button>
            </div>
            
            {error && (
              <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {customAnswer && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="space-y-2">
                  <p className="font-medium">AI Response:</p>
                  <p>{customAnswer.answer}</p>
                  {customAnswer.sources && customAnswer.sources.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium">Sources:</p>
                      <ul className="list-disc list-inside">
                        {customAnswer.sources.map((source: string, index: number) => (
                          <li key={index}>{source}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {customAnswer.followUpQuestions && customAnswer.followUpQuestions.length > 0 && (
                    <div className="text-sm text-muted-foreground mt-2">
                      <p className="font-medium">Follow-up Questions:</p>
                      <ul className="list-disc list-inside">
                        {customAnswer.followUpQuestions.map((followUp: string, index: number) => (
                          <li key={index}>{followUp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{rec.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(rec.priority)}`}>
                    {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {rec.category}
                  </span>
                  {rec.sources.map((source, index) => (
                    <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            
            {recommendations.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No recommendations available. Upload financial documents to get personalized insights.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}