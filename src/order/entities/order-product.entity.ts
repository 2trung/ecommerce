import { VariantSize } from 'src/variant/entities/variant-size.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VariantSize, (variantSize) => variantSize.orderProducts)
  variantSize: VariantSize;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;

  @Column({ type: 'int', default: 1 })
  quantity: number;
}
