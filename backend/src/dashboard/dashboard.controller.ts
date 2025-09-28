import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ExpenseService } from '../expense/expense.service';
import { InvestmentService } from '../investment/investment.service';
import { MarketDataService } from '../market-data/market-data.service';
import { AiInsightsService } from '../ai-insights/ai-insights.service';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly userService: UserService,
    private readonly expenseService: ExpenseService,
    private readonly investmentService: InvestmentService,
    private readonly marketDataService: MarketDataService,
    private readonly aiInsightsService: AiInsightsService,
  ) {}

  @Get(':userId')
  async getDashboardData(@Param('userId', ParseIntPipe) userId: number) {
    // Fetch user data
    const user = await this.userService.findOne(userId);
    
    // Fetch user expenses
    const expenses = await this.expenseService.findByUser(userId);
    
    // Fetch user investments
    const investments = await this.investmentService.findByUser(userId);
    
    // Generate AI insights for expenses
    const expenseInsights = await this.aiInsightsService.generateExpenseInsights(expenses);
    
    // Get market data for investments
    const marketData: { symbol: string; data: any }[] = [];
    for (const investment of investments) {
      if (investment.symbol) {
        try {
          const data = await this.marketDataService.getAlpacaMarketData(investment.symbol);
          marketData.push({
            symbol: investment.symbol,
            data: data
          });
        } catch (error) {
          // Handle error silently
        }
      }
    }
    
    // Generate AI investment recommendations
    const investmentRecommendations = await this.aiInsightsService.generateInvestmentRecommendations(investments, marketData);
    
    return {
      user,
      expenses,
      investments,
      expenseInsights,
      investmentRecommendations,
      marketData,
    };
  }
}