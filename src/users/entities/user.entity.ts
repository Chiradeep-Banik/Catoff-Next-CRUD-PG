import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WalletAddress } from 'src/wallet-addresses/entities/wallet-address.entity';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  username: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsEmail()
  email: string;

  @OneToMany(() => WalletAddress, (walletAddress) => walletAddress.user)
  walletAddresses: WalletAddress[];
}
