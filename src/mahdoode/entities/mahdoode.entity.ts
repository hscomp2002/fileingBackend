import { CustomerMahdoodes } from 'src/customers-mahdoode/entities/customers-mahdoode.entity';
import { MahdoodeDet } from 'src/mahdoode_det/entities/mahdoode_det.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'mahdoode' })
export class Mahdoode {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 191 })
  name: string;

  @OneToMany(() => MahdoodeDet, (mahdoodeDet) => mahdoodeDet.mahdoode, {
    eager: true,
  })
  @JoinColumn({ name: 'mahdoode_id' })
  mahdoodeDets: MahdoodeDet[];

  @OneToMany(
    () => CustomerMahdoodes,
    (customerMahdoodes) => customerMahdoodes.customer,
  )
  @JoinColumn({ name: 'mahdoode_id' })
  customerMahdoodes: CustomerMahdoodes[];
}
