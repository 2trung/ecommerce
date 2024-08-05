import { IsNotEmpty } from 'class-validator';

export class CreateGalleryDto {
  @IsNotEmpty()
  product_id: number;
  @IsNotEmpty()
  image_path: string;
}
