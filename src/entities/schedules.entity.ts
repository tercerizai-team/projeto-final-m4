import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Addresses } from "./addresses.entity";
import { Providers } from "./providers.entity";
import { Users } from "./users.entity";

@Entity("schedules")
export class Schedules {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "time" })
  hour: Date;

  @Column({ type: "date" })
  serviceDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ length: 90 })
  serviceDescription: string;

  @Column("decimal", { precision: 12, scale: 2, nullable: true })
  value: number;

  @Column({ default: false })
  clientConfirmed: boolean;

  @Column({ default: false })
  providerConfirmed: boolean;

  @ManyToOne(() => Providers)
  provider: Providers;

  @ManyToOne(() => Users)
  user: Users;

  @ManyToOne(() => Addresses, { eager: true })
  address: Addresses;
}
