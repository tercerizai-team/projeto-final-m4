import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Providers } from "./providers.entity";
import { Users } from "./users.entity";


@Entity("users_feedbacks")
export class UsersFeedbacks {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    note: number

    @Column({ length: 256 })
    comment: string

    @ManyToOne(() => Providers)
    provider: Providers

    @ManyToOne(() => Users)
    user: Users

}