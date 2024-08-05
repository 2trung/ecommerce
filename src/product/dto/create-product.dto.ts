import {
  IsNotEmpty,
  IsNumber,
  IsUrl,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class VariantSize {
  @IsNumber()
  size_id: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  price: number;
}

class VariantColor {
  @IsNumber()
  color_id: number;

  @IsUrl({}, { each: true })
  image_urls: string[];

  @ValidateNested({ each: true })
  @Type(() => VariantSize)
  @ArrayNotEmpty()
  variants_size: VariantSize[];
}

export class CreateProductDto {
  @IsNotEmpty()
  SKU: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  category_id: number;

  @ValidateNested({ each: true })
  @Type(() => VariantColor)
  @ArrayNotEmpty()
  variants_color: VariantColor[];
}
