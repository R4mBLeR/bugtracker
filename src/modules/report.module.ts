import { Module } from '@nestjs/common';
import { ReportController } from 'src/controllers/report.controller';
import { ReportRepository } from 'src/repositories/report.repository';
import { ReportService } from 'src/services/report.service';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule], // Важно: импортируем модуль с БД
  providers: [ReportService, ReportRepository],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
