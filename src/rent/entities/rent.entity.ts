import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({name:'ejare_eft'})
export class Rent {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({type: 'timestamp'})
    tarikh: Date;

    @Column({type: 'varchar',length:100})
    manba: string;

    @Column()
    radif: number;
    
    @Column({type: 'varchar',length:100})
    owner: string;

    @Column({type: 'varchar',length:15})
    tel: string;

    @Column({type: 'text'})
    addr: string;

    @Index()
    @Column({type: 'varchar',length:100})
    mahdoode: string;

    @Column()
    area: number;

    @Column()
    zirbana: number; 

    @Column({type: 'varchar',length:100})
    tabaghe: string;

    @Column()
    tedadtabaghe: number;

    @Column()
    tedadvahed: number;

    @Column()
    tedadkhab: number;

    @Column({type: 'varchar',length:100})
    jahat: string;

    @Column()
    senbana: number;

    @Column({type: 'varchar',length:100})
    kaf: string;

    @Column({type: 'varchar',length:100})
    divar: string;

    @Column({type: 'varchar',length:100})
    kabinet: string;

    @Column({type: 'varchar',length:100})
    garmaiesh: string;

    @Column({type: 'varchar',length:100})
    sarmaiesh: string;

    @Column({type: 'text'})
    toz: string;

    @Column({type: 'varchar',length:50})
    parking: string;

    @Column({type: 'varchar',length:50})
    bar: string;

    @Column({type: 'varchar',length:50})
    anbar: string;

    @Column({type: 'varchar',length:50})
    asansor: string;

    @Column({type: 'float'})
    ejare: number;

    @Column({type: 'float'})
    rahn: number;

    @Column({type: 'varchar',length:20})
    canchange: string;

    @Column({type: 'varchar',length:100})
    type: string;

    @Column({type: 'varchar',length:100})
    mantaghe: string;

    @Column({type: 'int'})
    en: number;

    @Column({type: 'int'})
    issend: number;

    @Column({type: 'int'})
    message_id: number;
}
