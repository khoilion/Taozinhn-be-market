import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindInsideRangeDto {
  @ApiProperty({
    description: 'Min price',
    example: 100,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  min: number;

  @ApiProperty({
    description: 'Max price',
    example: 1000,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  max: number;
}
