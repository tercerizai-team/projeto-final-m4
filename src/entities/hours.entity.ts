import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProviderSchedule } from "./provider_schedule.entity";

@Entity("hours")
export class Hours {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "time" })
    initHour: Date

    @Column({ type: "time" })
    limitHour: Date

    @OneToMany(() => ProviderSchedule, providerSchedule => providerSchedule.hours)
    providerSchedule: ProviderSchedule[]

}