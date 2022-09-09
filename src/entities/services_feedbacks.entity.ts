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
  user: Users;

  @OneToOne(() => Services)
  @JoinColumn()
  service: Services;

  @ManyToOne(() => Providers)
  provider: Providers;
}
