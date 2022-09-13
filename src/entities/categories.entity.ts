import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CategoryProvider } from "./category_provider.entity";
import { Providers } from "./providers.entity";

@Entity("categories")

export class Categories {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @OneToMany(() => CategoryProvider, categoryProvider => categoryProvider.category)
    categoryProviders: CategoryProvider[]

}