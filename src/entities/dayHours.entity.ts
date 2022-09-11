import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProviderSchedule } from "./provider_schedule.entity";

@Entity("day_hours")
export class DayHours {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    day: number

    @Column({ type: "time" })
    initHour: Date

    @Column({ type: "time" })
    limitHour: Date

    @OneToMany(() => ProviderSchedule, providerSchedule => providerSchedule.dayHours)
    providerSchedule: ProviderSchedule[]

}