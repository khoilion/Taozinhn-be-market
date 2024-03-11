import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PaymentMethod } from '../../config/enum';

export class CreateOrderDto {
  @ApiProperty({
    example: 'This is a address',
    description: 'The address of the order',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'This is a note',
    description: 'The note of the order',
    format: 'string',
  })
  note: string;

  @ApiProperty({
    enum: Object.keys(PaymentMethod),
    description: 'Update type of the Cart',
    example: PaymentMethod.COD,
  })
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
