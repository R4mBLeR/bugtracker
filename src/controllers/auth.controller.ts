import {
  Body,
  Controller,
  InternalServerErrorException,
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
      throw new InternalServerErrorException(error);
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
  async loginUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.createUser(createUserDto);
      return {
        success: true,
        data: user,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
