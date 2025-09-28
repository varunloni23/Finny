import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
import { ExpenseModule } from './expense/expense.module';
import { InvestmentModule } from './investment/investment.module';
import { MarketDataModule } from './market-data/market-data.module';
import { AiInsightsModule } from './ai-insights/ai-insights.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    RedisModule,
    UserModule,
    ExpenseModule,
    InvestmentModule,
    MarketDataModule,
    AiInsightsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}