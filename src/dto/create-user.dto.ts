import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Example username',
    required: true,
  })
  @IsString({ message: 'username must be a string' })
  @MinLength(3, { message: 'username must be minimal 3 chars' })
  @MaxLength(16, { message: 'username must be maximum 16 chars' })
  username: string;

  @ApiProperty({
    example: 'Example password',
    required: true,
  })
  @IsString({ message: 'password must be a string' })
  password: string;

  @ApiProperty({
    example: 'Example role',
    default: 'user',
  })
  @IsString({ message: 'role must be a string' })
  role: string;
}
