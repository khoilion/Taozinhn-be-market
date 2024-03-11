import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({
    required: false,
  })
  @Type(() => Number)
  page: number;

  @ApiProperty({
    required: false,
  })
  @Type(() => Number)
  size: number;
}
