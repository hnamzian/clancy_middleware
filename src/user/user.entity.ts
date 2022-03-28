import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['id'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number
  @Column({ type: String, nullable: false, unique: true }) username: string
  @Column({ type: String, nullable: false }) password: string
  @Column({ type: Boolean, nullable: false }) isAdmin: boolean
  @Column({ type: Boolean, nullable: false }) isVerified: boolean
  @CreateDateColumn({ type: "timestamp" }) createdAt: string
  @UpdateDateColumn({ type: "timestamp" }) updatedAt: string
}
