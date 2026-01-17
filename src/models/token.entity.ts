import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  refresh_token: string;
}
