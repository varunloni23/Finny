import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('investments')
export class Investment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string; // stock, crypto, mutual fund, gold, etc.

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  currency: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  purchasePrice: number;

  @Column({ type: 'date' })
  purchaseDate: Date;

  @Column({ nullable: true })
  symbol: string;

  @Column({ default: 'hold' }) // hold, buy, sell
  recommendation: string;

  @ManyToOne(() => User, user => user.investments)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}