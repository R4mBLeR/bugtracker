import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Report } from '../models/report.entity';

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

  async create(reportData: Partial<Report>): Promise<Report> {
    const report = this.repo.create(reportData);
    return await this.repo.save(report);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
