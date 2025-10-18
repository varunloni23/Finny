import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    // Try to call the Finny backend API
    try {
      const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3001';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({ response: data.response });
      }
    } catch {
      console.log('Backend not available, using mock responses');
    }
    
    // Fallback to enhanced mock responses with financial logic
    const finnyResponse = generateFinancialResponse(message);
    
    return NextResponse.json({ 
      response: finnyResponse,
      source: 'mock' // Indicates this is a mock response
    });
    
  } catch (error) {
    console.error('Error in Finny chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

function generateFinancialResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Stock price queries
  if (lowerMessage.includes('stock') || lowerMessage.includes('price')) {
    if (lowerMessage.includes('apple') || lowerMessage.includes('aapl')) {
      return "Apple (AAPL) is currently trading at $245.27, down $8.77 or 3.45% from yesterday's close. The market cap is $3.64 trillion with a volume of 61.78 million shares. Would you like me to explain what might be driving this movement or analyze if it fits your investment strategy?";
    } else if (lowerMessage.includes('tesla') || lowerMessage.includes('tsla')) {
      return "Tesla (TSLA) is trading at $413.49, down $22.05 or 5.06% today. The stock has been volatile recently due to EV market competition and delivery numbers. Would you like me to analyze Tesla's fundamentals or compare it to other EV stocks?";
    } else if (lowerMessage.includes('google') || lowerMessage.includes('googl') || lowerMessage.includes('alphabet')) {
      return "Alphabet (GOOGL) is at $236.57, down $4.96 or 2.05% today. The stock has been performing well with strong cloud growth and AI developments. Would you like me to dive deeper into Google's recent earnings or AI initiatives?";
    } else if (lowerMessage.includes('microsoft') || lowerMessage.includes('msft')) {
      return "Microsoft (MSFT) is trading at $510.96. The stock has been strong due to Azure cloud growth and AI integration. Their quarterly results have consistently beaten expectations. Want me to analyze their cloud business prospects?";
    } else {
      return "I can help you get real-time stock prices! Which specific stock are you interested in? I can provide current prices, market analysis, and help you understand what's driving the movement for stocks like Apple, Tesla, Google, Microsoft, and many others.";
    }
  }
  
  // Cryptocurrency queries  
  else if (lowerMessage.includes('bitcoin') || lowerMessage.includes('btc') || lowerMessage.includes('crypto')) {
    if (lowerMessage.includes('bitcoin') || lowerMessage.includes('btc')) {
      return "Bitcoin is currently trading at $112,247.89. It's been consolidating in this range recently. Crypto markets are highly volatile, so only invest what you can afford to lose. Are you considering Bitcoin as part of a diversified portfolio, or do you want to understand the technology better?";
    } else if (lowerMessage.includes('ethereum') || lowerMessage.includes('eth')) {
      return "Ethereum is at $3,807.37 right now. ETH has strong fundamentals with the upcoming network upgrades and growing DeFi ecosystem. However, remember that crypto is very risky. What's your experience level with cryptocurrency investing?";
    } else {
      return "Cryptocurrency can be a small part of a diversified portfolio, but it's very volatile and risky. I recommend never investing more than 5-10% of your portfolio in crypto. Which cryptocurrencies are you interested in learning about?";
    }
  }
  
  // Budget and savings
  else if (lowerMessage.includes('budget') || lowerMessage.includes('save') || lowerMessage.includes('money') || lowerMessage.includes('expense')) {
    return "Great question about budgeting! I recommend the 50-30-20 rule as a starting point: 50% of after-tax income for needs (rent, groceries, utilities), 30% for wants (entertainment, dining out), and 20% for savings and debt repayment. What's your current monthly take-home income? I can help you create a personalized budget.";
  }
  
  // Investment and portfolio
  else if (lowerMessage.includes('invest') || lowerMessage.includes('portfolio') || lowerMessage.includes('retirement') || lowerMessage.includes('401k')) {
    if (lowerMessage.includes('retirement') || lowerMessage.includes('401k')) {
      return "Retirement planning is crucial! If your employer offers a 401k match, contribute at least enough to get the full match - it's free money. For long-term retirement savings, I recommend low-cost index funds. What's your age and current retirement savings situation?";
    } else {
      return "Investment planning depends on your age, risk tolerance, and goals. For beginners, I recommend starting with diversified index funds - they're low-cost and spread risk across many companies. What's your investment timeline and risk comfort level?";
    }
  }
  
  // Market news and analysis
  else if (lowerMessage.includes('market') || lowerMessage.includes('news') || lowerMessage.includes('economy')) {
    return "The markets have been experiencing some volatility recently due to inflation concerns and geopolitical events. Tech stocks have been particularly affected. For long-term investors, market volatility is normal and can create opportunities. Are you concerned about current market conditions affecting your portfolio?";
  }
  
  // Loan and debt
  else if (lowerMessage.includes('loan') || lowerMessage.includes('debt') || lowerMessage.includes('credit') || lowerMessage.includes('mortgage')) {
    return "Managing debt is a key part of financial health. Generally, I recommend paying off high-interest debt first (like credit cards) while making minimum payments on lower-interest debt. For mortgages, consider the interest rate versus potential investment returns. What type of debt are you dealing with?";
  }
  
  // Emergency fund
  else if (lowerMessage.includes('emergency') || lowerMessage.includes('fund')) {
    return "An emergency fund is essential! I recommend saving 3-6 months of expenses in a high-yield savings account. Start with $1,000 as a mini emergency fund, then work toward the full amount. This protects you from going into debt for unexpected expenses. How much do you have saved currently?";
  }
  
  // General financial advice
  else if (lowerMessage.includes('advice') || lowerMessage.includes('help') || lowerMessage.includes('financial')) {
    return "I'm here to help with all aspects of your financial journey! I can assist with budgeting, investment strategies, retirement planning, debt management, and real-time market data. What specific area of your finances would you like to focus on today?";
  }
  
  // Default response
  else {
    return "I'm Finny, your personal finance assistant! I can help you with real-time stock prices, investment analysis, budgeting advice, retirement planning, and more. Try asking me about stock prices, creating a budget, investment strategies, or any other financial question you have!";
  }
}