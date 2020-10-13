import 'dotenv/config';
import express from 'express';

import './database';

import OrphanagesController from './controllers/OrphanagesController';
import orphanageValidator from './validators/orphanageValidator';

const app = express();

const orphanagesController = new OrphanagesController();

app.use(express.json());

app.post('/orphanages', orphanageValidator, orphanagesController.store);

app.listen(process.env.APP_PORT);
