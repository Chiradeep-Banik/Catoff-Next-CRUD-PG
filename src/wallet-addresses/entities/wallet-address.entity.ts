import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class WalletAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, type: 'text' })
  address: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;
}
