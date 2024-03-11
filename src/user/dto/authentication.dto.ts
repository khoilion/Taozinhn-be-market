import { EmailDto } from './email.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AuthenticationDto extends EmailDto {
  @ApiProperty({
    example: '123456',
    description: 'The verify code of the User',
    format: 'string',
    maxLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(6)
  readonly code: string;
}
