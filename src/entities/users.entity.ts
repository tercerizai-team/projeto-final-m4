import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {
    @PrimaryColumn("uuid")
    id: string;

    @Column({ length: 45 })
    name: string;

    @Column({ length: 90 })
    email: string;

    @Column({ length: 90 })
    password: string;

    @Column({ length: 11 })
    phone: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    isAdm: boolean;

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}