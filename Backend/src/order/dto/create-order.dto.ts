import { Type } from 'class-transformer';
import {
  IsInt,
  ArrayNotEmpty,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Address } from 'src/address/entities/address.entity';

class Product {
  @IsInt()
  variantSizeId: number;
  @IsInt()
  quantity: number;
}

export class CreateOrderDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Product)
  products: Product[];
  addressId: number;
}
