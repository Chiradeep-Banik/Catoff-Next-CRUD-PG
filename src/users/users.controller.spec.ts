import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findAllWalletAddresses: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      username: 'john_doe',
      email: 'john@example.com',
    };
    const createdUser = { id: 1, ...createUserDto, walletAddresses: [] };

    jest.spyOn(service, 'create').mockResolvedValue(createdUser as any);

    expect(await controller.create(createUserDto)).toEqual(createdUser);
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

    jest.spyOn(service, 'findAll').mockResolvedValue(users as any);

    expect(await controller.findAll()).toEqual(users);
  });

  it('should find a user by id', async () => {
    const user = {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      walletAddresses: [],
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(user as any);

    expect(await controller.findOne('1')).toEqual(user);
  });

  it('should find all wallet addresses for a user', async () => {
    const walletAddresses = [{ id: 1, address: 'address1', userId: 1 }];

    jest
      .spyOn(service, 'findAllWalletAddresses')
      .mockResolvedValue(walletAddresses as any);

    expect(await controller.findAllWalletAddresses(1)).toEqual(walletAddresses);
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = { username: 'john_doe_updated' };
    const updatedUser = {
      id: 1,
      username: 'john_doe_updated',
      email: 'john@example.com',
      walletAddresses: [],
    };

    jest.spyOn(service, 'update').mockResolvedValue(updatedUser as any);

    expect(await controller.update('1', updateUserDto)).toEqual(updatedUser);
  });

  it('should remove a user', async () => {
    const user = {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      walletAddresses: [],
    };

    jest.spyOn(service, 'remove').mockResolvedValue(user as any);

    expect(await controller.remove('1')).toEqual(user);
  });
});
