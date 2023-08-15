import express from "express"
import { Client } from "../entities/Client"

const router = express.Router()


router.delete('/api/client/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params

        const response = await Client.delete({ id: parseInt(clientId) })

        res.json(response)
    } catch (error) {
        res.status(400).send(error.message)
    }

})

export { router as deleteClientRouter }