import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteReportDto {
  @ApiProperty({
    example: 0,
    required: true,
  })
  @IsInt({ message: 'Id must be a number' })
  id: number;
}
