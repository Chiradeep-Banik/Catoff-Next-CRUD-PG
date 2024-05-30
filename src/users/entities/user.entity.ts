import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WalletAddress } from 'src/wallet-addresses/entities/wallet-address.entity';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the user' })
  id: number;

  @Column({ unique: true })
  @IsString()
  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    description: 'The email address of the user',
    required: false,
  })
  email: string;

  @OneToMany(() => WalletAddress, (walletAddress) => walletAddress.user)
  @ApiProperty({
    type: () => [WalletAddress],
    description: 'The wallet addresses associated with the user',
  })
  walletAddresses: WalletAddress[];
}
