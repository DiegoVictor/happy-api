import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import { errors } from 'celebrate';
import swagger from 'swagger-ui-express';

import './database';

import swaggerDocument from './swagger.json';
import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/docs', swagger.serve, swagger.setup(swaggerDocument));
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use('/v1', routes);

app.use(errors());
app.use(errorHandler);

export default app;
