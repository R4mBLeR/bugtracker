import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create_user')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.createUser(createUserDto);
      return {
        success: true,
        data: user,
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

  @Post('login_user')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.createUser(createUserDto);
      return {
        success: true,
        data: user,
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
