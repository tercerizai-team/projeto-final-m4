import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./categories.entity";
import { DayHours } from "./day_hours.entity";
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