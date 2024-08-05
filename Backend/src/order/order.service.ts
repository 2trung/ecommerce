import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { VariantSize } from 'src/variant/entities/variant-size.entity';
import { VariantColor } from 'src/variant/entities/variant-color.entity';
import { Product } from 'src/product/entities/product.entity';
import { OrderProduct } from './entities/order-product.entity';
import { User } from 'src/user/entities/user.entity';
import { VnpayService } from 'src/vnpay/vnpay.service';
import { Address } from 'src/address/entities/address.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
    @InjectRepository(VariantSize)
    private variantSizeRepository: Repository<VariantSize>,
    @InjectRepository(VariantColor)
    private variantColorRepository: Repository<VariantColor>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private vnpayService: VnpayService,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    const products = createOrderDto.products;

    for (const product of products) {
      const variantSize = await this.variantSizeRepository.findOne({
        where: { id: product.variantSizeId },
      });

      if (!variantSize) {
        throw new HttpException(
          { message: 'Product not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      if (variantSize.stock < product.quantity) {
        throw new HttpException(
          { message: 'Some products are out of stock' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    let total = 0;

    for (const product of products) {
      const variantSize = await this.variantSizeRepository.findOne({
        where: { id: product.variantSizeId },
      });
      total += variantSize.price * product.quantity;
      variantSize.stock -= product.quantity;
      await this.variantSizeRepository.save(variantSize);
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    const address = await this.addressRepository.findOne({
      where: { id: createOrderDto.addressId },
    });

    if (!address) {
      throw new HttpException(
        { message: 'Address not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    const order = await this.orderRepository.save({
      user: user,
      total_price: total,
      status: 'pending',
      address: address,
    });

    for (const product of products) {
      const variantSize = await this.variantSizeRepository.findOne({
        where: { id: product.variantSizeId },
      });

      await this.orderProductRepository.save({
        order: order,
        variantSize: variantSize,
        quantity: product.quantity,
      });
    }
    const url = this.vnpayService.createPaymentUrl(total, order.id);

    return { message: 'Order created successfully', data: url };
  }
}
