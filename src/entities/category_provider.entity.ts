import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Categories } from "./categories.entity";
import { Providers } from "./providers.entity";

@Entity("category_provider")
export class CategoryProvider {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => Providers)
    provider: Providers

    @ManyToOne(() => Categories, {eager: true})
    category: Categories

}