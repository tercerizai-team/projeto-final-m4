import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Addresses } from "./addresses.entity";
import { Users } from "./users.entity";


@Entity("addresses_users")
export class AddressesUsers {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => Addresses)
    address: Addresses

    @ManyToOne(() => Users)
    user: Users

}