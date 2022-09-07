import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Categories } from "./categories.entity";
import { Providers } from "./providers.entity";

@Entity("category_provider")
export class CategoryProvider {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => Providers)
    providerId: Providers

    @ManyToOne(() => Categories)
    categoryId: Categories

}