import { Module } from '@nestjs/common';
import { WalletAddressesService } from './wallet-addresses.service';
import { WalletAddressesController } from './wallet-addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { WalletAddress } from './entities/wallet-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, WalletAddress])],
  controllers: [WalletAddressesController],
  providers: [WalletAddressesService],
  exports: [WalletAddressesService],
})
export class WalletAddressesModule {}
