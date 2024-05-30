import { Module } from '@nestjs/common';
import { WalletAddressesService } from './wallet-addresses.service';
import { WalletAddressesController } from './wallet-addresses.controller';

@Module({
  controllers: [WalletAddressesController],
  providers: [WalletAddressesService],
})
export class WalletAddressesModule {}
