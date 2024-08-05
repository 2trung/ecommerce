import { User } from 'src/user/entities/user.entity';
import { VariantSize } from 'src/variant/entities/variant-size.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { default: 1 })
  quantity: number;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToOne(() => VariantSize, (variantSize) => variantSize.carts)
  variantSize: VariantSize;
}
