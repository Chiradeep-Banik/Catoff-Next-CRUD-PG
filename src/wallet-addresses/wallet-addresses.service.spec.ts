import { Test, TestingModule } from '@nestjs/testing';
import { WalletAddressesService } from './wallet-addresses.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WalletAddress } from './entities/wallet-address.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateWalletAddressDto } from './dto/update-wallet-address.dto';

describe('WalletAddressesService', () => {
  let service: WalletAddressesService;
  let repository: Repository<WalletAddress>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletAddressesService,
        {
          provide: getRepositoryToken(WalletAddress),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<WalletAddressesService>(WalletAddressesService);
    repository = module.get<Repository<WalletAddress>>(
      getRepositoryToken(WalletAddress),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a wallet address', async () => {
      const dto = { userId: 1, address: '0x1234567890abcdef' };
      const walletAddress = { id: 1, ...dto } as WalletAddress;

      jest.spyOn(repository, 'create').mockReturnValue(walletAddress);
      jest.spyOn(repository, 'save').mockResolvedValue(walletAddress);

      expect(await service.create(dto)).toEqual(walletAddress);
    });
  });

  describe('findAll', () => {
    it('should return an array of wallet addresses', async () => {
      const result = [
        { id: 1, userId: 1, address: '0x1234567890abcdef' },
      ] as WalletAddress[];

      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a wallet address by ID', async () => {
      const result = {
        id: 1,
        userId: 1,
        address: '0x1234567890abcdef',
      } as WalletAddress;

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);

      expect(await service.findOne(1)).toEqual(result);
    });

    it('should throw NotFoundException if wallet address not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(undefined);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a wallet address by ID', async () => {
      const dto: UpdateWalletAddressDto = {
        userId: 1,
        address: '0xabcdef1234567890',
      };
      const result = {
        id: 1,
        userId: 1,
        address: '0xabcdef1234567890',
      } as WalletAddress;

      jest.spyOn(repository, 'update').mockResolvedValue(undefined);
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);

      expect(await service.update(1, dto)).toEqual(result);
    });

    it('should throw NotFoundException if wallet address not found', async () => {
      const dto: UpdateWalletAddressDto = {
        userId: 1,
        address: '0xabcdef1234567890',
      };
      jest.spyOn(repository, 'update').mockResolvedValue(undefined);
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(undefined);

      await expect(service.update(1, dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a wallet address by ID', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      expect(await service.remove(1)).toBeUndefined();
    });
  });
});
