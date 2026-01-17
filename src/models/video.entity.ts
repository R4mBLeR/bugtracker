import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Report } from './report.entity';

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  // ТОЛЬКО ManyToOne - достаточно для foreign key
  @ManyToOne(() => Report, {
    onDelete: 'CASCADE', // каскадное удаление
    nullable: false, // видео всегда должно принадлежать отчету
  })
  @JoinColumn({ name: 'report_id' }) // создаст столбец report_id
  report: Report; // ссылка на отчет

  @Column({ name: 'report_id' }) // физический foreign key
  reportId: number;

  @Column()
  video_url: string;

  @CreateDateColumn()
  created_at: Date;
}
