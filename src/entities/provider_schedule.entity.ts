import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hours } from "./hours.entity";
import { Providers } from "./providers.entity";

@Entity("provider_schedule")
export class ProviderSchedule {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    day: number

    @ManyToOne(() => Providers, { eager: true })
    provider: Providers

    @ManyToOne(() => Hours, { eager: true })
    hours: Hours[]

}