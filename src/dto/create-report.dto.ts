import {
  IsBoolean,
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({
    example: 'user@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'Incorrect email address' })
  email: string;

  @ApiProperty({
    example: 'Example title',
    required: true,
  })
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(255, { message: 'Title cannot exceed 255 characters' })
  title: string;

  @ApiProperty({
    example: 'Example description',
    required: true,
  })
  @IsString({ message: 'Description must be a string' })
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  @MaxLength(3000, { message: 'Description cannot exceed 3000 characters' })
  description: string;

  @ApiPropertyOptional({
    example: true,
    default: false,
  })
  @IsBoolean({ message: 'has_attachment must be true or false' })
  @IsOptional()
  has_attachment?: boolean = false;
}
