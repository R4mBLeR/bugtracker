import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Report } from './report.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Report, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'report_id' })
  report: Report;

  @Column({ name: 'report_id' })
  reportId: number;

  @Column()
  image_url: string;

  @CreateDateColumn()
  created_at: Date;
}
