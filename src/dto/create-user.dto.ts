import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Example username',
    required: true,
  })
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, { message: 'Username must be minimal 3 chars' })
  @MaxLength(16, { message: 'Username must be maximum 16 chars' })
  username: string;

  @ApiProperty({
    example: 'Example password',
    required: true,
  })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @ApiProperty({
    example: 'Example role',
    default: 'user',
  })
  @IsString({ message: 'Role must be a string' })
  role: string;
}
