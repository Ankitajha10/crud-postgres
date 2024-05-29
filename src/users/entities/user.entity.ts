import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'user_table'})
export class User 
{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column()
    password:string
}
