import express from "express"
import { Client } from "../entities/Client"
import { Banker } from "../entities/Banker"
const router = express.Router()


router.patch('/api/banker/:bankerId/client/:clientId', async (req, res) => {
    const { bankerId, clientId } = req.params

    const client = await Client.findOne({ where: { id: parseInt(clientId) } })
    const banker = await Banker.findOne({ where: { id: parseInt(bankerId) } })

    if (!banker || !client) {
        return res.status(404).json({ message: "Client or Banker not found" })
    }
    //connect them together
    banker.clients = [client]
    await banker.save()
    return res.json(banker)
})

export {
    router as connectBankerToClientsRouter
}