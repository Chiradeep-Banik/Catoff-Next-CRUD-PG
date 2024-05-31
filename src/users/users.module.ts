import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { WalletAddress } from '../wallet-addresses/entities/wallet-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, WalletAddress])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
