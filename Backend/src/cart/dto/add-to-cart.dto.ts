import { IsInt } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  quantity: number;
  @IsInt()
  variantSizeId: number;
}
