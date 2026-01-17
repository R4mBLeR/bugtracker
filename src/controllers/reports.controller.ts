import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { CreateReportDto } from 'src/dto/create-report.dto';
import { ReportService } from 'src/services/report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllReports() {
    const reports = await this.reportService.getAllReports();
    return reports;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getReportById(@Param('id', ParseIntPipe) id: number) {
    const report = await this.reportService.getReportById(id);

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return report;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReport(@Body() createReportDto: CreateReportDto) {
    const report = await this.reportService.createReport(createReportDto);
    return report;
  }
}
