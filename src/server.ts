import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import path from 'path';
import cors from 'cors';

import './database';
import routes from './routes';
import errorHandler from './errors/handler';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.use(errors());
app.use(errorHandler);

app.listen(process.env.APP_PORT);
