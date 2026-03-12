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
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateReportDto } from 'src/dto/create-report.dto';
import { DeleteReportDto } from 'src/dto/delete-report.dto';
import { UpdateReportStatusDto } from 'src/dto/update-report-status.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReportService } from 'src/services/report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @ApiOperation({ summary: 'Get all reports or filter by status' })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter reports by status',
  })
  async getReports(@Query('status') status?: string) {
    if (status) {
      return this.reportService.getReportsByStatus(status);
    }
    return this.reportService.getAllReports();
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteReport(@Body() deleteReportDto: DeleteReportDto) {
    const report = await this.reportService.deleteReport(deleteReportDto);
    return report;
  }

  @Post('update')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateReportStatus(
    @Body() updateReportStatusDto: UpdateReportStatusDto,
  ) {
    const report = await this.reportService.updateReportStatus(
      updateReportStatusDto,
    );
    return report;
  }
}
