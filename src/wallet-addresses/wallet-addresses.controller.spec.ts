import { Test, TestingModule } from '@nestjs/testing';
import { WalletAddressesController } from './wallet-addresses.controller';
import { WalletAddressesService } from './wallet-addresses.service';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { UpdateWalletAddressDto } from './dto/update-wallet-address.dto';
import { WalletAddress } from './entities/wallet-address.entity';

describe('WalletAddressesController', () => {
  let controller: WalletAddressesController;
  let service: WalletAddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletAddressesController],
      providers: [
        {
          provide: WalletAddressesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WalletAddressesController>(
      WalletAddressesController,
    );
    service = module.get<WalletAddressesService>(WalletAddressesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a wallet address', async () => {
      const dto: CreateWalletAddressDto = {
        userId: 1,
        address: '0x1234567890abcdef',
      };
      const result: WalletAddress = { id: 1, ...dto, user: null };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of wallet addresses', async () => {
      const result: WalletAddress[] = [
        { id: 1, userId: 1, address: '0x1234567890abcdef', user: null },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a wallet address by ID', async () => {
      const result: WalletAddress = {
        id: 1,
        userId: 1,
        address: '0x1234567890abcdef',
        user: null,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update a wallet address by ID', async () => {
      const dto: UpdateWalletAddressDto = {
        userId: 1,
        address: '0xabcdef1234567890',
      };
      const result: WalletAddress = {
        id: 1,
        userId: 1,
        address: '0xabcdef1234567890',
        user: null,
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', dto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should remove a wallet address by ID', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBeUndefined();
    });
  });
});
