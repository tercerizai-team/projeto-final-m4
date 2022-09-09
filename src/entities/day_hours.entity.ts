import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hours } from "./hours.entity";
import { ProviderSchedule } from "./provider_schedule.entity";

@Entity("day_hours")
export class DayHours {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "integer" })
    day: number

    @ManyToOne(() => Hours, { eager: true })
    hours: Hours[]

    @OneToMany(() => ProviderSchedule, providerSchedule => providerSchedule.dayHours)
    providerSchedule: ProviderSchedule[]

}