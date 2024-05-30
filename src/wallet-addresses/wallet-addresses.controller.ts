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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger'; // Import necessary decorators

@ApiTags('Wallet Addresses')
@Controller('wallet-addresses')
export class WalletAddressesController {
  constructor(
    private readonly walletAddressesService: WalletAddressesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wallet address' })
  @ApiResponse({
    status: 201,
    description: 'The wallet address has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  create(@Body() createWalletAddressDto: CreateWalletAddressDto) {
    return this.walletAddressesService.create(createWalletAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all wallet addresses' })
  @ApiResponse({ status: 200, description: 'List of all wallet addresses.' })
  findAll() {
    return this.walletAddressesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a wallet address by ID' })
  @ApiParam({ name: 'id', description: 'Wallet address ID' })
  @ApiResponse({
    status: 200,
    description: 'The wallet address has been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    description: 'Wallet address with the specified ID not found.',
  })
  findOne(@Param('id') id: string) {
    return this.walletAddressesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a wallet address by ID' })
  @ApiParam({ name: 'id', description: 'Wallet address ID' })
  @ApiResponse({
    status: 200,
    description: 'The wallet address has been successfully updated.',
  })
  @ApiNotFoundResponse({
    description: 'Wallet address with the specified ID not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateWalletAddressDto: UpdateWalletAddressDto,
  ) {
    return this.walletAddressesService.update(+id, updateWalletAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a wallet address by ID' })
  @ApiParam({ name: 'id', description: 'Wallet address ID' })
  @ApiResponse({
    status: 204,
    description: 'The wallet address has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Wallet address with the specified ID not found.',
  })
  remove(@Param('id') id: string) {
    return this.walletAddressesService.remove(+id);
  }
}
