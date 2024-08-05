import { Category } from 'src/variant/entities/category.entity';
import { VariantColor } from 'src/variant/entities/variant-color.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  SKU: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => VariantColor, (variantColor) => variantColor.product)
  variantsColor: VariantColor[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
