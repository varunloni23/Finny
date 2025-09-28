import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { Investment } from './entities/investment.entity';

@Controller('investment')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Post()
  async create(@Body() investmentData: Partial<Investment>): Promise<Investment> {
    return this.investmentService.create(investmentData);
  }

  @Get()
  async findAll(): Promise<Investment[]> {
    return this.investmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Investment | null> {
    return this.investmentService.findOne(id);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId', ParseIntPipe) userId: number): Promise<Investment[]> {
    return this.investmentService.findByUser(userId);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() investmentData: Partial<Investment>,
  ): Promise<Investment | null> {
    return this.investmentService.update(id, investmentData);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.investmentService.remove(id);
  }
}