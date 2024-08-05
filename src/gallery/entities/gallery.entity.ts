import { Product } from 'src/product/entities/product.entity';
import { VariantColor } from 'src/variant/entities/variant-color.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image_url: string;

  @ManyToOne(() => VariantColor, (variantColor) => variantColor.galleries)
  variantColor: VariantColor;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
