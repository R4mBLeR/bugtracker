import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn() // или 'uuid' для строкового ID
  id: number;

  @Column({ unique: true }) // Оставляем unique здесь
  username: string;

  @Column({ name: 'hash_password' })
  hashPassword: string;

  @Column()
  role: string;
}
