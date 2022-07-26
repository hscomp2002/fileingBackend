import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Mahdoode } from 'src/mahdoode/entities/mahdoode.entity';

@Entity({ name: 'customer_mahdoodes' })
export class CustomerMahdoodes {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  mahdoode_id: number;

  @Column()
  customer_id: number;

  @ManyToOne(() => Customer, (customer) => customer.customerMahdoodes)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Mahdoode, (mahdoode) => mahdoode.customerMahdoodes)
  @JoinColumn({ name: 'mahdoode_id' })
  mahdoode: Mahdoode;
}
