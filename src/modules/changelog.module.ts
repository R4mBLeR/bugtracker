import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { ChangelogService } from 'src/services/changelog.service';
import { ChangelogRepository } from 'src/repositories/changelog.repository';
import { ChangelogController } from 'src/controllers/changelog.controller';

@Module({
  imports: [DatabaseModule], // Важно: импортируем модуль с БД
  providers: [ChangelogService, ChangelogRepository],
  controllers: [ChangelogController],
  exports: [ChangelogService],
})
export class ChangelogModule {}
