import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    const users = [
      {
        id: 1,
        username: 'john_doe',
        email: 'john@example.com',
        walletAddresses: [],
      },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(users as User[]);

    expect(await service.findAll()).toEqual(users);
  });

  it('should find a user by id', async () => {
    const user = {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      walletAddresses: [],
    };

    jest.spyOn(repository, 'findOne').mockResolvedValue(user as User);

    expect(await service.findOne(1)).toEqual(user);
  });

  it('should update a user', async () => {
    const existingUser = {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      walletAddresses: [],
    };
    const updateUserDto = { username: 'john_doe_updated' };
    const updatedUser = { ...existingUser, ...updateUserDto };

    jest.spyOn(service, 'findOne').mockResolvedValue(existingUser as User);
    jest.spyOn(repository, 'save').mockResolvedValue(updatedUser as User);

    expect(await service.update(1, updateUserDto)).toEqual(updatedUser);
  });

  it('should remove a user', async () => {
    const user = {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      walletAddresses: [],
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(user as User);
    jest.spyOn(repository, 'remove').mockResolvedValue(user as User);

    expect(await service.remove(1)).toEqual(user);
  });
});
