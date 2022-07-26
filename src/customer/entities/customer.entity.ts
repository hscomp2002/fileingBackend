import { CustomerMahdoodes } from 'src/customers-mahdoode/entities/customers-mahdoode.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'cutomers' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 191 })
  name: string;

  @Column('varchar', { length: 191 })
  amlak_name: string;

  @Column('text')
  addr: string;

  @Column('varchar', { length: 300 })
  tel: string;

  @Column()
  en: number;

  @Column()
  mahdoode_id: number;

  @Column('varchar', { length: 15 })
  user_login: string;

  @Column('varchar', { length: 2000 })
  user_pass: string;

  @OneToMany(
    () => CustomerMahdoodes,
    (customerMahdoodes) => customerMahdoodes.customer,
    { eager: true },
  )
  @JoinColumn({ name: 'customer_id' })
  customerMahdoodes: CustomerMahdoodes[];
}
