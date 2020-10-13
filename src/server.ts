import 'dotenv/config';
import express from 'express';

const app = express();

app.listen(process.env.APP_PORT);
