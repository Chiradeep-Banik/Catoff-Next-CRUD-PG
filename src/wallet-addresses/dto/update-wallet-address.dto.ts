import { PartialType } from '@nestjs/mapped-types';
import { CreateWalletAddressDto } from './create-wallet-address.dto';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateWalletAddressDto extends PartialType(
  CreateWalletAddressDto,
) {
  @IsNumber()
  @IsOptional()
  userId: number;

  @IsString()
  @IsOptional()
  address: string;
}
