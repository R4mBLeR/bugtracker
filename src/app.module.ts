import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { DatabaseModule } from './modules/database.module';
import { ReportModule } from './modules/report.module';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [DatabaseModule, ReportModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
