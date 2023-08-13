import { createConnection } from "typeorm"
import { Client } from "./entities/Client"

require('dotenv').config()


const main = async () => {
    try {
        await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: process.env.DB_PASSWORD,
            database: 'Banking',
            entities: [Client],
            synchronize: true,
        })
        console.log('Database connected')
    } catch (error) {
        console.error(error)
        throw new Error('Unable to connect to database')
    }

}

main()