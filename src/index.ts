import { DataSource } from "typeorm"
import express from "express"
require('dotenv').config()
import { Client } from "./entities/Client"
import { Banker } from "./entities/Banker"
import { Transaction } from "./entities/Transaction"
import { createClientRouter } from "./routes/create_clients"
import { createBankerRouter } from "./routes/create_banker"
import { createTransactionRouter } from "./routes/create_transaction"
import { connectBankerToClientsRouter } from "./routes/connect_banker_to_clients"
import { deleteClientRouter } from "./routes/delete_client"
import { fetchClientsRouter } from "./routes/fetch_clients"

const app = express()

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: process.env.DB_PASSWORD,
    database: 'Banking',
    entities: [Client, Banker, Transaction],
    synchronize: true,
})
const main = async () => {
    try {

        await AppDataSource.initialize()
        console.log('Database connected')

        app.use(express.json())
        app.use(createClientRouter)
        app.use(createBankerRouter)
        app.use(createTransactionRouter)
        app.use(connectBankerToClientsRouter)
        app.use(deleteClientRouter)
        app.use(fetchClientsRouter)
        app.listen(8080, () => {
            console.log('Server started on port 8080')
        })
    } catch (error) {
        console.error(error)
        throw new Error('Unable to connect to database')
    }

}

main()