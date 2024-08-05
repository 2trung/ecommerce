import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { In, Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { VariantSize } from 'src/variant/entities/variant-size.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(VariantSize)
    private variantSizeRepository: Repository<VariantSize>,
  ) {}

  async getCurrentCart(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'carts',
        'carts.variantSize',
        'carts.variantSize.size',
        'carts.variantSize.variantColor',
        'carts.variantSize.variantColor.product',
        'carts.variantSize.variantColor.galleries',
        'carts.variantSize.variantColor.color',
      ],
    });
    return user.carts;
  }

  async addToCart(userId: number, addToCartDto: AddToCartDto) {
    const { variantSizeId, quantity } = addToCartDto;
    const variantSize = await this.variantSizeRepository.findOne({
      where: { id: variantSizeId },
    });
    if (!variantSize) {
      throw new HttpException('Product size not found', HttpStatus.NOT_FOUND);
    }
    if (variantSize.stock < quantity) {
      throw new HttpException('Product out of stock', HttpStatus.BAD_REQUEST);
    }
    const isProductInCart = await this.cartRepository.findOne({
      where: { user: { id: userId }, variantSize: { id: variantSizeId } },
    });
    if (isProductInCart) {
      const newQuantity = variantSize.stock - isProductInCart.quantity;
      if (newQuantity < quantity) {
        throw new HttpException('Product out of stock', HttpStatus.BAD_REQUEST);
      }
      const updatedCart = await this.cartRepository.save({
        ...isProductInCart,
        quantity: quantity + isProductInCart.quantity,
      });
      const newCart = await this.getCurrentCart(userId);
      return { message: 'Product added to cart', data: newCart };
    } else {
      const addCart = await this.cartRepository.save({
        user: { id: userId },
        variantSize: { id: variantSizeId },
        quantity,
      });
      const newCart = await this.getCurrentCart(userId);
      return { message: 'Product added to cart', data: newCart };
    }
  }

  async getCart(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'carts',
        'carts.variantSize',
        'carts.variantSize.size',
        'carts.variantSize.variantColor',
        'carts.variantSize.variantColor.product',
        'carts.variantSize.variantColor.galleries',
        'carts.variantSize.variantColor.color',
      ],
    });
    return { message: 'Success', data: user.carts };
  }

  async deleteCart(userId: number, cartIds: number[]) {
    const carts = await this.cartRepository.find({
      where: { user: { id: userId }, id: In(cartIds) },
    });
    if (carts.length !== cartIds.length) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }
    await this.cartRepository.remove(carts);
    const newCart = await this.getCurrentCart(userId);
    return { message: 'Product deleted', data: newCart };
  }

  async deleteAllCart(userId: number) {
    const carts = await this.cartRepository.find({
      where: { user: { id: userId } },
    });
    await this.cartRepository.remove(carts);
    return { message: 'All cart deleted', data: [] };
  }

  async updateCart(userId: number, cartId: number, quantity: number) {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId }, id: cartId },
      relations: ['variantSize'],
    });
    if (!cart) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }
    const variantSize = await this.variantSizeRepository.findOne({
      where: { id: cart.variantSize.id },
    });
    if (variantSize.stock < quantity) {
      throw new HttpException('Product out of stock', HttpStatus.BAD_REQUEST);
    }
    const updatedCart = await this.cartRepository.save({
      ...cart,
      quantity,
    });
    const newCart = await this.getCurrentCart(userId);

    return { message: 'Cart updated', data: newCart };
  }
}
