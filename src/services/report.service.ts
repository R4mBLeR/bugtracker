import { Injectable } from '@nestjs/common';
import { Report } from '../models/report.entity';
import { ReportRepository } from '../repositories/report.repository';
import { CreateReportDto } from 'src/dto/create-report.dto';

@Injectable()
export class ReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async getAllReports() {
    const reports = await this.reportRepository.findAll();
    console.log(`ReportService: Get ${reports.length} reports from DB`);
    return reports;
  }

  async getReportById(id: number) {
    const report = await this.reportRepository.findById(id);
    return report;
  }

  async createReport(reportDto: CreateReportDto) {
    // 1. Создаем отчет
    const report = await this.reportRepository.create({
      email: reportDto.email,
      title: reportDto.title,
      description: reportDto.description,
      has_attachment: reportDto.has_attachment || false,
    });
    return report;
  }
}
