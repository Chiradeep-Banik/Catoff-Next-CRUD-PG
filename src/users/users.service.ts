import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { WalletAddress } from 'src/wallet-addresses/entities/wallet-address.entity';

@ApiTags('Users')
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly UsersRepository: Repository<User>,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = this.UsersRepository.create(createUserDto);
    return await this.UsersRepository.save(user);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users.' })
  async findAll(): Promise<User[]> {
    return await this.UsersRepository.find();
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
  })
  @ApiNotFoundResponse({ description: 'User with the specified ID not found.' })
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.UsersRepository.findOne({ where: { id } });
  }

  @ApiOperation({ summary: 'Get all wallet addresses of a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'List of all wallet addresses associated with the user.',
  })
  @ApiNotFoundResponse({ description: 'User with the specified ID not found.' })
  async findAllWalletAddresses(
    @Param('userId') userId: number,
  ): Promise<WalletAddress[]> {
    const user = await this.UsersRepository.findOne({
      where: { id: userId },
      relations: ['walletAddresses'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.walletAddresses;
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiNotFoundResponse({ description: 'User with the specified ID not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    Object.assign(user, updateUserDto);
    return await this.UsersRepository.save(user);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'User with the specified ID not found.' })
  async remove(
    @Param('id') id: number,
  ): Promise<{ username: string; email: string }> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return await this.UsersRepository.remove(user);
  }
}
