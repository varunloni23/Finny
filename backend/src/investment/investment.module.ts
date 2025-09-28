import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';
import { Investment } from './entities/investment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Investment])],
  controllers: [InvestmentController],
  providers: [InvestmentService],
  exports: [InvestmentService, TypeOrmModule],
})
export class InvestmentModule {}