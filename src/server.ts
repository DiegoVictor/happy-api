import 'dotenv/config';
import express from 'express';

import './database';
const app = express();

app.listen(process.env.APP_PORT);
