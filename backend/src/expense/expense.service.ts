import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async create(expenseData: Partial<Expense>): Promise<Expense> {
    const expense = this.expenseRepository.create(expenseData);
    return this.expenseRepository.save(expense);
  }

  async findAll(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }

  async findOne(id: number): Promise<Expense | null> {
    return this.expenseRepository.findOne({ where: { id } });
  }

  async findByUser(userId: number): Promise<Expense[]> {
    return this.expenseRepository.find({ 
      where: { 
        user: { 
          id: userId 
        } 
      } 
    });
  }

  async update(id: number, expenseData: Partial<Expense>): Promise<Expense | null> {
    await this.expenseRepository.update(id, expenseData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.expenseRepository.delete(id);
  }
}