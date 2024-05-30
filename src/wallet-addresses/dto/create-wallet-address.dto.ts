import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateWalletAddressDto {
  @IsNumber()
  @IsOptional()
  userId: number;

  @IsString()
  @IsOptional()
  address: string;
}
