import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Addresses } from "./addresses.entity";
import { Categories } from "./categories.entity";
import { CategoryProvider } from "./category_provider.entity";
import { ProviderSchedule } from "./provider_schedule.entity";
import { Schedules } from "./schedules.entity";
import { ServicesFeedbacks } from "./services_feedbacks.entity";
import { UsersFeedbacks } from "./users_feedbacks.entity";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

@Entity("providers")
export class Providers {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  isActive: boolean;

  @Column()
  isPremium: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Addresses, { eager: true })
  @JoinColumn()
  address: Addresses;

  @OneToMany(
    () => CategoryProvider,
    (categoryProvider) => categoryProvider.provider,
    { eager: true }
  )
  providerCategories: CategoryProvider[];

  @OneToMany(() => Schedules, (schedules) => schedules.provider, {
    eager: true,
  })
  schedules: Schedules[];

  @OneToMany(
    () => ServicesFeedbacks,
    (servicesFeedbacks) => servicesFeedbacks.provider,
    { eager: true }
  )
  feedbacks: ServicesFeedbacks[];

  @OneToMany(() => UsersFeedbacks, (usersFeedbacks) => usersFeedbacks.provider)
  givedFeedbacks: UsersFeedbacks[];

  @OneToMany(
    () => ProviderSchedule,
    (providerSchedule) => providerSchedule.provider,
    { eager: true }
  )
  providerSchedule: ProviderSchedule[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
