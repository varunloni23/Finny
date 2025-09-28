import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AiInsightsService } from './ai-insights.service';

@Module({
  imports: [HttpModule],
  providers: [AiInsightsService],
  exports: [AiInsightsService],
})
export class AiInsightsModule {}