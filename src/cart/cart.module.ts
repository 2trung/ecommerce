import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Cart } from './entities/cart.entity';
import { VariantSize } from 'src/variant/entities/variant-size.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Cart, VariantSize]),
    ConfigModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
