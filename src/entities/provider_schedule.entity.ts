import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./categories.entity";
import { Providers } from "./providers.entity";

@Entity("provider_schedule")
export class ProviderSchedule {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "time" })
    initHour: Date

    @Column({ type: "time" })
    limitHour: Date

    @Column()
    weekDays: string

}