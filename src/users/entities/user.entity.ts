import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WalletAddress } from 'src/wallet-addresses/entities/wallet-address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => WalletAddress, (walletAddress) => walletAddress.user)
  walletAddresses: WalletAddress[];
}
