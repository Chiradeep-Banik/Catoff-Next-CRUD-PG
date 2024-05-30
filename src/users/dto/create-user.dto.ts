import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ description: 'The email address of the user' })
  email: string;
}
