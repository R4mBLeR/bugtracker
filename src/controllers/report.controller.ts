import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateReportDto } from 'src/dto/create-report.dto';
import { DeleteReportDto } from 'src/dto/delete-report.dto';
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
    return report;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReport(@Body() createReportDto: CreateReportDto) {
    const report = await this.reportService.createReport(createReportDto);
    return report;
  }

  @Delete()
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteReport(@Body() deleteReportDto: DeleteReportDto) {
    const report = await this.reportService.deleteReport(deleteReportDto);
    return report;
  }
}
