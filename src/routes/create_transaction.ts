import express from "express"
import { Transaction, TransactionTypes } from "../entities/Transaction"
import { Client } from "../entities/Client"
const router = express.Router()


router.post('/api/client/:clientId/transaction', async (req, res) => {
    const { clientId } = req.params
    const {
        amount,
        type,
    } = req.body

    try {
        const client = await Client.findOne({ where: { id: parseInt(clientId) } })

        if (!client) {
            return res.status(404).json({ message: "Client not found" })
        }

        const transaction = Transaction.create({
            amount,
            type,
            client,
        })

        await transaction.save()

        if (type === TransactionTypes.DEPOSIT) {
            client.balance += amount
        } else if (type === TransactionTypes.WITHDRAW) {
            client.balance -= amount
        }

        await client.save()
        return res.json(transaction)
    } catch (error) {
        return res.status(400).send(error.message)
    }

})

export {
    router as createTransactionRouter
}