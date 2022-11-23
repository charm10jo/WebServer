import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('User')
export class User {
    @PrimaryColumn()
    userId?: number;

    @Column()
    Id: String;

    @Column()
    password: string;

    @Column()
    gender?: number;

    @Column()
    phoneNumber?: number;

    @Column()
    korIns?: Boolean;

    @Column()
    privIns?: Boolean;

    @Column()
    birthday?: string;

}