import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletAddressDto {
  @IsNumber()
  @ApiProperty({
    description: 'The ID of the user associated with the wallet address',
    required: false,
  })
  userId: number;

  @IsString()
  @ApiProperty({
    description: 'The wallet address',
    example: '0x1234567890abcdef',
    required: true,
  })
  address: string;
}
