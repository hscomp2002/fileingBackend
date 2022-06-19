import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cutomers_mehdoode' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  mahdoode_id: number;

  @Column()
  customers_id: number;
}
