import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { UserModule } from '../user/user.module';
import { ExpenseModule } from '../expense/expense.module';
import { InvestmentModule } from '../investment/investment.module';
import { MarketDataModule } from '../market-data/market-data.module';
import { AiInsightsModule } from '../ai-insights/ai-insights.module';

@Module({
  imports: [
    UserModule,
    ExpenseModule,
    InvestmentModule,
    MarketDataModule,
    AiInsightsModule,
  ],
  controllers: [DashboardController]
})
export class DashboardModule {}