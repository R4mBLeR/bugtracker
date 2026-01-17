import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { AuthService } from 'src/services/auth.service';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthController } from 'src/controllers/auth.controller';
import { TokenRepository } from 'src/repositories/token.repository';

@Module({
  imports: [DatabaseModule], // Важно: импортируем модуль с БД
  providers: [AuthService, UserRepository, TokenRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
