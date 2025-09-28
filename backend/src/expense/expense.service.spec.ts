import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseService } from './expense.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';

const mockExpenseRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('ExpenseService', () => {
  let service: ExpenseService;
  let repository: Repository<Expense>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        {
          provide: getRepositoryToken(Expense),
          useValue: mockExpenseRepository,
        },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
    repository = module.get<Repository<Expense>>(getRepositoryToken(Expense));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new expense', async () => {
      const expenseData = { 
        userId: 1, 
        title: 'Groceries', 
        amount: 120.50, 
        currency: 'USD', 
        date: new Date() 
      };
      const expense = { id: 1, ...expenseData };
      
      mockExpenseRepository.create.mockReturnValue(expense);
      mockExpenseRepository.save.mockResolvedValue(expense);

      const result = await service.create(expenseData);
      expect(result).toEqual(expense);
      expect(repository.create).toHaveBeenCalledWith(expenseData);
      expect(repository.save).toHaveBeenCalledWith(expense);
    });
  });

  describe('findByUser', () => {
    it('should return expenses for a user', async () => {
      const expenses = [
        { id: 1, userId: 1, title: 'Groceries', amount: 120.50, currency: 'USD', date: new Date() }
      ];
      mockExpenseRepository.find.mockResolvedValue(expenses);

      const result = await service.findByUser(1);
      expect(result).toEqual(expenses);
      expect(repository.find).toHaveBeenCalledWith({ 
        where: { 
          user: { 
            id: 1 
          } 
        } 
      });
    });
  });
});