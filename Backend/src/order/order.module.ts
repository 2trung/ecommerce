import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order-product.entity';
import { Product } from 'src/product/entities/product.entity';
import { VariantColor } from 'src/variant/entities/variant-color.entity';
import { VariantSize } from 'src/variant/entities/variant-size.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { VnpayModule } from 'src/vnpay/vnpay.module';
import { Address } from 'src/address/entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderProduct,
      VariantSize,
      VariantColor,
      Product,
      User,
      Address,
    ]),
    ConfigModule,
    AuthModule,
    JwtModule,
    VnpayModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
