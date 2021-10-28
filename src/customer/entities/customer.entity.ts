import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'cutomers'})
export class Customer {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column("varchar", { length: 191 })
    name: string;

    @Column("varchar", { length: 191 })
    amlak_name: string;

    @Column("text")
    addr: string;

    @Column("varchar", { length: 300 })
    tel: string;

    @Column()
    en: number;

    @Column()
    mahdoode_id: number;

    @Column("varchar", { length: 15 })
    user_login: string;

    @Column("varchar", { length: 2000 })
    user_pass: string;
}
