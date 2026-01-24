import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReportRepository } from '../repositories/report.repository';
import { CreateReportDto } from 'src/dto/create-report.dto';
import { DeleteReportDto } from 'src/dto/delete-report.dto';

@Injectable()
export class ReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async getAllReports() {
    const reports = await this.reportRepository.findAll();
    //console.log(`ReportService: Get ${reports.length} reports from DB`);
    if (!reports || reports.length === 0) {
      throw new NotFoundException('NO_AVAILABLE_REPORTS_FOUND');
    }
    return reports;
  }

  async getReportById(id: number) {
    const report = await this.reportRepository.findById(id);
    if (!report) {
      throw new NotFoundException(`REPORT_NOT_FOUND`);
    }
    return report;
  }

  async createReport(reportDto: CreateReportDto) {
    await this.checkEmailCooldown(reportDto.email);
    const report = await this.reportRepository.create({
      email: reportDto.email,
      title: reportDto.title,
      description: reportDto.description,
      has_attachment: reportDto.has_attachment || false,
    });
    return report;
  }

  async deleteReport(deleteReportDto: DeleteReportDto) {
    const report = await this.reportRepository.delete(deleteReportDto.id);
    if (report == undefined) {
      throw new NotFoundException(`REPORT_NOT_FOUND`);
    }
    return report;
  }

  async checkEmailCooldown(email: string) {
    const reportsWithEmail = await this.reportRepository.findByEmail(email);
    if (reportsWithEmail.length > 0) {
      const date = reportsWithEmail[reportsWithEmail.length - 1].created_at;
      const diff = new Date().getTime() - new Date(date).getTime();
      const diffMinutes = diff / 1000 / 60;
      if (diffMinutes < 30) {
        throw new ConflictException(`TIME_SEND_COOLDOWN`);
      }
    }
  }
}
