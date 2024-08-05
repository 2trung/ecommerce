import { Product } from '../entities/product.entity';

export interface ProductWithImages extends Product {
  image_urls: string[];
}
