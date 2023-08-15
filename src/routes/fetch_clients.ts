import express from 'express';
import { Client } from '../entities/Client';
import { AppDataSource } from '../index';
import { createQueryBuilder } from 'typeorm';

const router = express.Router();


router.get('/api/clients', async (req, res) => {
    try {
        const clients = await AppDataSource.manager.createQueryBuilder(Client, "client")
            .select('client.first_name')
            .addSelect('client.last_name')
            .leftJoinAndSelect('client.transactions', 'transaction')
            .where('client.id = :clientId', { clientId: 6 })
            .getOne()
        res.send(clients);
    } catch (error) {

    }


});

export { router as fetchClientsRouter };