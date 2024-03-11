import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { CreateCategoryDto } from '../../category/dto/create-category.dto';

export class CreateProductDto extends CreateCategoryDto {
  @ApiProperty({
    example: 'Iphone',
    description: 'The name of the Category',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    example: '1000',
    description: 'The price of the Product',
    format: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: '10',
    description: 'The quantity of the Product',
    format: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    description: 'The images of the Product',
    format: 'array',
  })
  @IsNotEmpty()
  @IsString({ each: true })
  images: string[];

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
}
