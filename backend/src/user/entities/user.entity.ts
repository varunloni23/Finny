import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Expense } from '../../expense/entities/expense.entity';
import { Investment } from '../../investment/entities/investment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ default: 'en' })
  language: string;

  @OneToMany(() => Expense, expense => expense.user)
  expenses: Expense[];

  @OneToMany(() => Investment, investment => investment.user)
  investments: Investment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}