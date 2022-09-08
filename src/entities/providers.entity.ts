import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Addresses } from "./addresses.entity";
import { Categories } from "./categories.entity";
import { CategoryProvider } from "./category_provider.entity";
import { ProviderSchedule } from "./provider_schedule.entity";
import { Schedules } from "./schedules.entity";
import { ServicesFeedbacks } from "./services_feedbacks.entity";
import { UsersFeedbacks } from "./users_feedbacks.entity";

@Entity("providers")
export class Providers {

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
    isPremium: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(() => Addresses, { eager: true }) @JoinColumn()
    address: Addresses

    @OneToMany(() => CategoryProvider, categoryProvider => categoryProvider.provider, { eager: true })
    categories: Categories[]

    @OneToOne(() => ProviderSchedule, { eager: true, nullable: true }) @JoinColumn()
    providerSchedule: ProviderSchedule

    @OneToMany(() => Schedules, schedules => schedules.provider, { eager: true })
    schedules: Schedules[]

    @OneToMany(() => ServicesFeedbacks, servicesFeedbacks => servicesFeedbacks.provider, { eager: true })
    feedbacks: ServicesFeedbacks[]

    @OneToMany(() => UsersFeedbacks, usersFeedbacks => usersFeedbacks.providerId)
    givedFeedbacks: UsersFeedbacks[]

}