import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Providers } from "./providers.entity";
import { Services } from "./services.entity";
import { Users } from "./users.entity";

@Entity("services_feedbacks")
export class ServicesFeedbacks {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  note: number;

  @Column({ length: 256 })
  comment: string;

  @OneToOne(() => Users)
  @JoinColumn()
  userId: Users;

  @OneToOne(() => Services)
  @JoinColumn()
  serviceId: Services;

  @ManyToOne(() => Providers)
  providerId: Providers;
}
