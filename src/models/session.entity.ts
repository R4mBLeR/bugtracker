import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('sessions')
export class Session {
  @PrimaryColumn({ unique: true })
  refresh_token: string;

  @Column({ type: 'datetime', name: 'expires_at' })
  expires_at: Date;

  @ManyToOne(() => User)
  user: User;
}
