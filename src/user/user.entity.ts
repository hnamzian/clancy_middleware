import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  admin = 'ADMIN',
  client = 'CLIENT',
}

@Entity()
@Unique(['id'])
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: String, nullable: false, unique: true }) username: string;
  @Column({ type: String, nullable: false }) password: string;
  @Column({ type: 'enum', enum: UserRole, nullable: false }) role: UserRole;
  @Column({ type: Boolean, nullable: false }) isVerified: boolean;
  @CreateDateColumn({ type: 'timestamp' }) createdAt: string;
  @UpdateDateColumn({ type: 'timestamp' }) updatedAt: string;
}
