import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletAddressesService } from './wallet-addresses.service';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { UpdateWalletAddressDto } from './dto/update-wallet-address.dto';

@Controller('wallet-addresses')
export class WalletAddressesController {
  constructor(
    private readonly walletAddressesService: WalletAddressesService,
  ) {}

  @Post()
  create(@Body() createWalletAddressDto: CreateWalletAddressDto) {
    return this.walletAddressesService.create(createWalletAddressDto);
  }

  @Get()
  findAll() {
    return this.walletAddressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletAddressesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWalletAddressDto: UpdateWalletAddressDto,
  ) {
    return this.walletAddressesService.update(+id, updateWalletAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletAddressesService.remove(+id);
  }
}
