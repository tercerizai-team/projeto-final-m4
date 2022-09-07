import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Addresses } from "./addresses.entity";
import { AddressesUsers } from "./addresses_users.entity";
import { Schedules } from "./schedules.entity";
import { UsersFeedbacks } from "./users_feedbacks.entity";
import { v4 as uuid } from "uuid"


@Entity("providers")
export class Users {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    phone: string

    @Column()
    isActive: boolean

    @Column()
    isAdm: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => AddressesUsers, addressesUsers => addressesUsers.userId)
    addresses: Addresses[]

    @OneToMany(() => Schedules, schedules => schedules.user, { eager: true })
    schedules: Schedules[]

    @OneToMany(() => UsersFeedbacks, usersFeedbacks => usersFeedbacks.userId, { eager: true })
    feedbacks: UsersFeedbacks[]
    
    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

}
