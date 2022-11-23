import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['Id'])
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    userId:number;

    @Column({unique: true})
    Id:string;

    @Column()
    password:string;

    @Column({nullable: true})
    name?:string;

    @Column({nullable: true})
    phoneNumber?:string;

    @Column({nullable: true})
    gender?:number;

    @Column({nullable: true})
    livingAt?:string;

    @Column({nullable: true})
    korIns?:boolean;

    @Column({nullable: true})
    privIns?:boolean;

    @Column({nullable: true})
    birthday?:string;

    

}