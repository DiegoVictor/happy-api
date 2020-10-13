import 'dotenv/config';
import express from 'express';

import './database';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.APP_PORT);
