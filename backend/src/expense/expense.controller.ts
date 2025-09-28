import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expense } from './entities/expense.entity';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async create(@Body() expenseData: Partial<Expense>): Promise<Expense> {
    return this.expenseService.create(expenseData);
  }

  @Get()
  async findAll(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Expense | null> {
    return this.expenseService.findOne(id);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId', ParseIntPipe) userId: number): Promise<Expense[]> {
    return this.expenseService.findByUser(userId);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() expenseData: Partial<Expense>,
  ): Promise<Expense | null> {
    return this.expenseService.update(id, expenseData);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.expenseService.remove(id);
  }
}