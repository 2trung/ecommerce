import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Gallery } from 'src/gallery/entities/gallery.entity';
import { VariantColor } from 'src/variant/entities/variant-color.entity';
import { VariantSize } from 'src/variant/entities/variant-size.entity';
import { Category } from 'src/variant/entities/category.entity';
import { Size } from 'src/variant/entities/size.entity';
import { Color } from 'src/variant/entities/color.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      VariantColor,
      VariantSize,
      Gallery,
      Category,
      Size,
      Color,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
