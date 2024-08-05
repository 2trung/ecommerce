import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  addToCart(@Req() request: Request, @Body() addToCartDto: AddToCartDto) {
    const id = (request as any).user.id;
    return this.cartService.addToCart(id, addToCartDto);
  }

  @Get()
  getCart(@Req() request: Request) {
    const id = (request as any).user.id;
    return this.cartService.getCart(id);
  }

  @Delete('/delete')
  deleteCart(@Req() request: Request, @Body() body: { cartIds: number[] }) {
    const userId = (request as any).user.id;
    return this.cartService.deleteCart(userId, body.cartIds);
  }

  @Patch('/update')
  updateCart(
    @Req() request: Request,
    @Body() body: { cartId: number; quantity: number },
  ) {
    const userId = (request as any).user.id;
    return this.cartService.updateCart(userId, body.cartId, body.quantity);
  }

  @Delete('/clear')
  deleteAllCart(@Req() request: Request) {
    const userId = (request as any).user.id;
    return this.cartService.deleteAllCart(userId);
  }
}
