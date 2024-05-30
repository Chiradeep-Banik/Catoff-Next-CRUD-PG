import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The username of the user', required: false })
  username?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    description: 'The email address of the user',
    required: false,
  })
  email?: string;
}
