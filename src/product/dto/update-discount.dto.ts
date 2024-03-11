import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdateDiscountDto {
  @ApiProperty({
    example: 10,
    description: 'The percentage of the discount of the Product (%)',
    format: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  @ApiProperty({
    example: '60b6d6b9b9b9ef2a3c9e9b9b',
    description: 'The id of the Product',
    format: 'string',
  })
  @IsString()
  _id: string;
}
