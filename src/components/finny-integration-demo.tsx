"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { Mic, Phone, MessageCircle, TrendingUp, BarChart3 } from 'lucide-react';

export function FinnyIntegrationDemo() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'voice',
      title: 'Voice Chat with Finny',
      description: 'Talk directly to Finny about your finances using natural voice commands',
      icon: Mic,
      color: 'bg-blue-500',
      examples: [
        "What's the price of Apple stock?",
        "Help me create a budget plan",
        "How is my portfolio performing?",
        "Should I invest in crypto right now?"
      ]
    },
    {
      id: 'stocks',
      title: 'Real-Time Market Data',
      description: 'Get live stock prices, crypto values, and market analysis',
      icon: TrendingUp,
      color: 'bg-green-500',
      examples: [
        "Show me Tesla's current price",
        "What's Bitcoin worth today?",
        "Get me the latest market news",
        "Analyze my investment returns"
      ]
    },
    {
      id: 'planning',
      title: 'Financial Planning',
      description: 'Personalized advice for budgeting, investing, and financial goals',
      icon: BarChart3,
      color: 'bg-purple-500',
      examples: [
        "Help me plan for retirement",
        "Create an emergency fund strategy",
        "Optimize my investment portfolio",
        "Calculate loan payments"
      ]
    },
    {
      id: 'advice',
      title: 'AI Financial Advisor',
      description: 'Get expert financial guidance tailored to your situation',
      icon: MessageCircle,
      color: 'bg-orange-500',
      examples: [
        "Is now a good time to buy a house?",
        "How much should I save each month?",
        "What's the best investment strategy for me?",
        "Should I pay off debt or invest?"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          const isActive = activeFeature === feature.id;
          
          return (
            <Card 
              key={feature.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isActive ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setActiveFeature(isActive ? null : feature.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-lg ${feature.color} flex items-center justify-center`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {feature.description}
                </p>
                
                {isActive && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Try saying:</p>
                    <ul className="space-y-1">
                      {feature.examples.map((example, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          &quot;{example}&quot;
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-blue-500" />
            <span>How to Use Your Voice Assistants</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-medium mb-1">Choose Assistant</h3>
              <p className="text-sm text-muted-foreground">
                Use settings (bottom-left) to pick Finny, OmniDimension, or both
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-medium mb-1">Connect</h3>
              <p className="text-sm text-muted-foreground">
                Click the voice widget(s) in the bottom-right corner
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-medium mb-1">Talk</h3>
              <p className="text-sm text-muted-foreground">
                Speak naturally about your financial questions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>


    </div>
  );
}