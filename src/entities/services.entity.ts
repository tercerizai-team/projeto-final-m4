import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Schedules } from "./schedules.entity";
import { ServicesFeedbacks } from "./services_feedbacks.entity";
@Entity("services")
export class Services {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  isServiceFinished: boolean;

  @Column({ default: false })
  isServiceCanceled: boolean;

  @Column({ type: "date", nullable: true })
  finalizedAt: Date;

  @Column({ default: false })
  clientFinished: boolean;

  @Column({ default: false })
  providerFinished: boolean;

  @OneToOne(() => Schedules)
  @JoinColumn()
  schedule: Schedules;

  @OneToMany(
    () => ServicesFeedbacks,
    (serviceFeedbacks) => serviceFeedbacks.service,
    { eager: true }
  )
  feedbacks: ServicesFeedbacks[];
}
