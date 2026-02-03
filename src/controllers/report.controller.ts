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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateReportDto } from 'src/dto/create-report.dto';
import { DeleteReportDto } from 'src/dto/delete-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
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

  @Get()
  @HttpCode(HttpStatus.OK)
  async getReportsByStatus(@Query('status') status: string) {
    return this.reportService.getReportsByStatus(status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReport(@Body() createReportDto: CreateReportDto) {
    const report = await this.reportService.createReport(createReportDto);
    return report;
  }

  @Delete()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteReport(@Body() deleteReportDto: DeleteReportDto) {
    const report = await this.reportService.deleteReport(deleteReportDto);
    return report;
  }
}
