import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DayHours } from "./day_hours.entity";
import { ProviderSchedule } from "./provider_schedule.entity";

@Entity("hours")
export class Hours {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "time" })
    initHour: Date

    @Column({ type: "time" })
    limitHour: Date

    @OneToMany(() => DayHours, dayHours => dayHours.day)
    day: DayHours

}