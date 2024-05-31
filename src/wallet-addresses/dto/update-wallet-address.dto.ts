import { PartialType } from '@nestjs/mapped-types';
import { CreateWalletAddressDto } from './create-wallet-address.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateWalletAddressDto extends PartialType(
  CreateWalletAddressDto,
) {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'The ID of the user associated with the wallet address',
    required: false,
  })
  userId: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The wallet address',
    example: '0x1234567890abcdef',
    required: false,
  })
  address: string;
}
