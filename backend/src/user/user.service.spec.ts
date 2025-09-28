import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData = { email: 'test@example.com', firstName: 'Test', lastName: 'User' };
      const user = { id: 1, ...userData };
      
      mockUserRepository.create.mockReturnValue(user);
      mockUserRepository.save.mockResolvedValue(user);

      const result = await service.create(userData);
      expect(result).toEqual(user);
      expect(repository.create).toHaveBeenCalledWith(userData);
      expect(repository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1, email: 'test@example.com', firstName: 'Test', lastName: 'User' }];
      mockUserRepository.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, email: 'test@example.com', firstName: 'Test', lastName: 'User' };
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});