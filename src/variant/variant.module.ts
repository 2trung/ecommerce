import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { VariantColor } from './entities/variant-color.entity';
import { Size } from './entities/size.entity';
import { VariantSize } from './entities/variant-size.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Color,
      Size,
      Category,
      VariantColor,
      VariantSize,
    ]),
  ],
  controllers: [VariantController],
  providers: [VariantService],
})
export class VariantModule {}
