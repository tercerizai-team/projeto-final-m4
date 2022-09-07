import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Schedules } from "./schedules.entity";
@Entity("services")

export class Services {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ default: false })
    isServiceFinished: boolean

    @Column({ type: "date" })
    finalizedAt: Date

    @OneToOne(() => Schedules) @JoinColumn()
    schedule: Schedules

}