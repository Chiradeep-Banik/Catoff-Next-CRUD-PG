import { Module } from '@nestjs/common';
import { WalletAddressesService } from './wallet-addresses.service';
import { WalletAddressesController } from './wallet-addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletAddress } from './entities/wallet-address.entity';
import { User } from 'src/users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger'; // Import necessary decorators

@ApiTags('Wallet Addresses')
@Module({
  imports: [TypeOrmModule.forFeature([User, WalletAddress])],
  controllers: [WalletAddressesController],
  providers: [WalletAddressesService],
  exports: [WalletAddressesService],
})
export class WalletAddressesModule {}
