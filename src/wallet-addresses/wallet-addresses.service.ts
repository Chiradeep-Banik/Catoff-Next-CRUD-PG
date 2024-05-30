import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { UpdateWalletAddressDto } from './dto/update-wallet-address.dto';
import { WalletAddress } from 'src/wallet-addresses/entities/wallet-address.entity';

@Injectable()
export class WalletAddressesService {
  constructor(
    @InjectRepository(WalletAddress)
    private readonly walletAddressRepository: Repository<WalletAddress>,
  ) {}

  async create(
    createWalletAddressDto: CreateWalletAddressDto,
  ): Promise<WalletAddress> {
    const walletAddress = this.walletAddressRepository.create(
      createWalletAddressDto,
    );
    return await this.walletAddressRepository.save(walletAddress);
  }

  async findAll(): Promise<WalletAddress[]> {
    return await this.walletAddressRepository.find();
  }

  async findOne(id: number): Promise<WalletAddress> {
    const walletAddress = await this.walletAddressRepository.findOneBy({ id });
    if (!walletAddress) {
      throw new NotFoundException(`Wallet address with ID ${id} not found`);
    }
    return walletAddress;
  }
  async update(
    id: number,
    updateWalletAddressDto: UpdateWalletAddressDto,
  ): Promise<WalletAddress> {
    await this.walletAddressRepository.update(id, updateWalletAddressDto);
    const updatedWalletAddress = await this.walletAddressRepository.findOneBy({
      id,
    });
    if (!updatedWalletAddress) {
      throw new NotFoundException(`Wallet address with ID ${id} not found`);
    }
    return updatedWalletAddress;
  }

  async remove(id: number): Promise<void> {
    await this.walletAddressRepository.delete(id);
  }
}
