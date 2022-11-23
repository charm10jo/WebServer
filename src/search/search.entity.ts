import { BaseEntity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export class Hospitals extends BaseEntity {
    @PrimaryGeneratedColumn()
    hospitalId:number;

    @Column()
    hopitalName:string;

    @Column()
    hospitalSize:number;

    @Column()
    phoneNumber:string;

    @Column()
    address:string;

    @Column()
    mon:string;

    @Column()
    tue:string;

    @Column()
    wed:string;

    @Column()
    thu:string;

    @Column()
    fri:string;

    @Column()
    sat:string;

    @Column()
    sun:string;

    @Column()
    holiday:string;

    @Column()
    foreignLanguages:string;


}