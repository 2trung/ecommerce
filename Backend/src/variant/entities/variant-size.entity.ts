import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VariantColor } from './variant-color.entity';
import { Size } from './size.entity';
import { OrderProduct } from 'src/order/entities/order-product.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@Entity()
export class VariantSize {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VariantColor, (variantColor) => variantColor.variantSizes)
  variantColor: VariantColor;

  @ManyToOne(() => Size, (size) => size.variantsSize)
  size: Size;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.variantSize)
  orderProducts: OrderProduct[];

  @OneToMany(() => Cart, (cart) => cart.variantSize)
  carts: Cart[];
}
