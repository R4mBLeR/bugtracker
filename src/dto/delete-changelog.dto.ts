import { MinLength, MaxLength, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteChangelogDto {
  @ApiProperty({
    example: 0,
    required: true,
  })
  @IsInt({ message: 'Id must be a number' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(255, { message: 'Title cannot exceed 255 characters' })
  id: number;
}
