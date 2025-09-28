import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './entities/investment.entity';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(Investment)
    private investmentRepository: Repository<Investment>,
  ) {}

  async create(investmentData: Partial<Investment>): Promise<Investment> {
    const investment = this.investmentRepository.create(investmentData);
    return this.investmentRepository.save(investment);
  }

  async findAll(): Promise<Investment[]> {
    return this.investmentRepository.find();
  }

  async findOne(id: number): Promise<Investment | null> {
    return this.investmentRepository.findOne({ where: { id } });
  }

  async findByUser(userId: number): Promise<Investment[]> {
    return this.investmentRepository.find({ 
      where: { 
        user: { 
          id: userId 
        } 
      } 
    });
  }

  async update(id: number, investmentData: Partial<Investment>): Promise<Investment | null> {
    await this.investmentRepository.update(id, investmentData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.investmentRepository.delete(id);
  }
}