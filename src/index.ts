import { createConnection } from "typeorm"
import express from "express"
import { Client } from "./entities/Client"
import { Banker } from "./entities/Banker"
import { Transaction } from "./entities/Transaction"
import { createClientRouter } from "./routes/create_clients"
import { createBankerRouter } from "./routes/create_banker"
import { createTransactionRouter } from "./routes/create_transaction"

require('dotenv').config()

const app = express()

const main = async () => {
    try {
        await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: process.env.DB_PASSWORD,
            database: 'Banking',
            entities: [Client, Banker, Transaction],
            synchronize: true,
        })
        console.log('Database connected')

        app.use(express.json())
        app.use(createClientRouter)
        app.use(createBankerRouter)
        app.use(createTransactionRouter)
        app.listen(8080, () => {
            console.log('Server started on port 8080')
        })
    } catch (error) {
        console.error(error)
        throw new Error('Unable to connect to database')
    }

}

main()