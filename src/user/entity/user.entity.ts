import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['Id'])
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    userId:number;

    @Column({length: 40})
    Id:string;

    @Column()
    password:string;

    @Column({nullable: true, length: 40})
    name?:string;

    @Column({nullable: true, length: 40})
    phoneNumber?:string;

    @Column({nullable: true})
    gender?:number;

    @Column({nullable: true, length: 100})
    livingAt?:string;

    @Column({nullable: true})
    korIns?:boolean;

    @Column({nullable: true})
    privIns?:boolean;

    @Column({nullable: true, length: 40})
    birthday?:string;

    

}