import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@Entity()
export class WalletAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, type: 'text' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ManyToOne(() => User, (user) => user.walletAddresses)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
