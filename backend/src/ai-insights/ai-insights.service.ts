import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AiInsightsService {
  private readonly openRouterApiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.openRouterApiKey = this.configService.get<string>('OPENROUTER_API_KEY') || '';
  }

  // Generate AI-powered expense insights
  async generateExpenseInsights(expenses: any[]): Promise<string> {
    const prompt = `
      Analyze the following expense data and provide financial insights:
      ${JSON.stringify(expenses, null, 2)}
      
      Please provide:
      1. Total spending analysis
      2. Category-wise spending breakdown
      3. Suggestions for reducing expenses
      4. Identification of unusual spending patterns
      5. Recommendations for budget optimization
    `;

    return this.callOpenRouterAPI(prompt);
  }

  // Generate AI-powered investment recommendations
  async generateInvestmentRecommendations(investments: any[], marketData: any): Promise<string> {
    const prompt = `
      Based on the user's current investments and market data, provide investment recommendations:
      Current Investments: ${JSON.stringify(investments, null, 2)}
      Market Data: ${JSON.stringify(marketData, null, 2)}
      
      Please provide:
      1. Portfolio analysis
      2. Diversification recommendations
      3. Buy/sell/hold suggestions
      4. Risk assessment
      5. Market trend insights
    `;

    return this.callOpenRouterAPI(prompt);
  }

  // Generate credit score optimization advice
  async generateCreditScoreAdvice(creditData: any): Promise<string> {
    const prompt = `
      Based on the user's credit data, provide advice for optimizing their credit score:
      Credit Data: ${JSON.stringify(creditData, null, 2)}
      
      Please provide:
      1. Factors affecting credit score
      2. Recommendations for improvement
      3. Timeline for changes to take effect
      4. Actions to avoid that could hurt the score
    `;

    return this.callOpenRouterAPI(prompt);
  }

  // Generic method to call OpenRouter API
  private async callOpenRouterAPI(prompt: string): Promise<string> {
    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.post(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            model: 'mistralai/mistral-7b-instruct:free',
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
          },
          {
            headers: {
              'Authorization': `Bearer ${this.openRouterApiKey}`,
              'HTTP-Referer': 'http://localhost:3000', // Your site URL
              'X-Title': 'Finance Manager', // Your app name
            },
          },
        ),
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      throw new HttpException(
        'Failed to generate AI insights',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}