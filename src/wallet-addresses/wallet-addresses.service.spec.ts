import { Test, TestingModule } from '@nestjs/testing';
import { WalletAddressesService } from './wallet-addresses.service';

describe('WalletAddressesService', () => {
  let service: WalletAddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletAddressesService],
    }).compile();

    service = module.get<WalletAddressesService>(WalletAddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
