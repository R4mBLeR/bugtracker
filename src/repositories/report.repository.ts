import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Report } from '../models/report.entity';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class ReportRepository {
  private repo: Repository<Report>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    // Получаем репозиторий из DataSource
    this.repo = this.dataSource.getRepository(Report);
  }

  async findAll(): Promise<Report[]> {
    return await this.repo.find();
  }

  async findById(id: number): Promise<Report | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Report[]> {
    return await this.repo.find({ where: { email } });
  }

  async findByStatus(status: string): Promise<Report[]> {
    return await this.repo.find({ where: { status } });
  }

  async create(reportData: Partial<Report>): Promise<Report> {
    const report = this.repo.create(reportData);
    return await this.repo.save(report);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
