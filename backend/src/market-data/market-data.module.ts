import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MarketDataService } from './market-data.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [HttpModule, RedisModule],
  providers: [MarketDataService],
  exports: [MarketDataService],
})
export class MarketDataModule {}