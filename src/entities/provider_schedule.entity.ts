import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DayHours } from "./dayHours.entity";
import { Providers } from "./providers.entity";

@Entity("provider_schedule")
export class ProviderSchedule {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => Providers, { eager: true })
    provider: Providers

    @ManyToOne(() => DayHours, { eager: true })
    dayHours: DayHours

}