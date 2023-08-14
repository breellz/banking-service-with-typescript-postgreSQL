import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Person } from "./utils/Person";
import { Transaction } from "./Transaction";
@Entity('client')

export class Client extends Person {

    @Column({
        type: 'numeric'
    })
    balance: number

    @Column({
        default: true,
        name: "active"
    })
    is_active: boolean

    @Column({
        type: 'simple-json',
        nullable: true
    })
    additional_info: {
        age: number,
        hair_color: string,
    }

    @Column({
        type: 'simple-array',
        default: []
    })
    family_members: string[]

    @OneToMany(() => Transaction, (transaction) => transaction.client)

    transactions: Transaction[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}