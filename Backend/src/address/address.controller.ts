import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('/add')
  create(@Req() request: Request, @Body() createAddressDto: CreateAddressDto) {
    const id = (request as any).user.id;
    return this.addressService.create(id, createAddressDto);
  }

  @Get()
  findAll(@Req() request: Request) {
    const id = (request as any).user.id;
    return this.addressService.findAll(id);
  }
}
