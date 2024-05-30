import { Test, TestingModule } from '@nestjs/testing';
import { WalletAddressesController } from './wallet-addresses.controller';
import { WalletAddressesService } from './wallet-addresses.service';

describe('WalletAddressesController', () => {
  let controller: WalletAddressesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletAddressesController],
      providers: [WalletAddressesService],
    }).compile();

    controller = module.get<WalletAddressesController>(WalletAddressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
