import { Product } from 'src/product/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Color } from './color.entity';
import { VariantSize } from './variant-size.entity';
import { Gallery } from 'src/gallery/entities/gallery.entity';

@Entity()
export class VariantColor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Color, (color) => color.variantsColor)
  color: Color;

  @OneToMany(() => Gallery, (gallery) => gallery.variantColor)
  galleries: Gallery[];

  @ManyToOne(() => Product, (product) => product.variantsColor)
  product: Product;

  @OneToMany(() => VariantSize, (variantSize) => variantSize.variantColor)
  variantSizes: VariantSize[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
