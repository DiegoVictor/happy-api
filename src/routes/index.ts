import { Router } from 'express';

import orphanages from './orphanages';

const routes = Router();

routes.use('/orphanages', orphanages);

export default routes;
