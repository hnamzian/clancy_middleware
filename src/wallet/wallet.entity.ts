import { Users } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['id'])
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(type => Users, user => user.id) user: Users; 
  @Column({ type: String, nullable: false }) walletName: string;
  @Column({ type: String, nullable: false, unique: true }) address: string;
  @CreateDateColumn({ type: 'timestamp' }) createdAt: string;
  @UpdateDateColumn({ type: 'timestamp' }) updatedAt: string;
}
