import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class EmailDto {
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'The email of the User',
    format: 'email',
    uniqueItems: true,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @IsEmail()
  readonly email: string;
}
