import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletAddress } from 'src/wallet-addresses/entities/wallet-address.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly UsersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.UsersRepository.create(createUserDto);

    return await this.UsersRepository.save(user);
  }

  async findAll() {
    return await this.UsersRepository.find();
  }

  async findOne(id: number) {
    return await this.UsersRepository.findOne({ where: { id } });
  }

  async findAllWalletAddresses(userId: number): Promise<WalletAddress[]> {
    const user = await this.UsersRepository.findOne({
      where: { id: userId },
      relations: ['walletAddresses'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.walletAddresses;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    Object.assign(user, updateUserDto);

    return await this.UsersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    return await this.UsersRepository.remove(user);
  }
}
