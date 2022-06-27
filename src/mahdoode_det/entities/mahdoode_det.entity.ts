import { Mahdoode } from 'src/mahdoode/entities/mahdoode.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'mahdoode_det' })
export class MahdoodeDet {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 191 })
  name: string;

  @ManyToOne(() => Mahdoode, (mahdoode) => mahdoode.mahdoodeDets)
  @JoinColumn({ name: 'mahdoode_id' })
  mahdoode: Mahdoode;
}
