import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import path from 'path';

import './database';
import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.use(errorHandler);

app.listen(process.env.APP_PORT);
