import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReportDto } from 'src/dto/create-report.dto';
import { ReportService } from 'src/services/report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('get_all')
  async getAllReports() {
    try {
      const reports = await this.reportService.getAllReports();
      if (reports.length != 0) {
        return {
          success: false,
          data: reports,
        };
      } else {
        return {
          success: false,
          message: 'No available reports',
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'DB Error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get/:id')
  async getReportById(@Param('id') id: number) {
    try {
      const report = await this.reportService.getReportById(id);
      if (report != null) {
        return {
          success: false,
          data: report,
        };
      } else {
        return {
          success: false,
          message: 'No such report with id: ' + id,
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'DB Error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('create_report')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async createReport(@Body() createReportDto: CreateReportDto) {
    try {
      const report = await this.reportService.createReport(createReportDto);
      return {
        success: true,
        data: report,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'DB Error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
