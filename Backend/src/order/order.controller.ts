import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  create(@Req() request: Request, @Body() createOrderDto: CreateOrderDto) {
    const id = (request as any).user.id;
    return this.orderService.create(id, createOrderDto);
  }
}
