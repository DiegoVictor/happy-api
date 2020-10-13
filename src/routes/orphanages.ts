import { Router } from 'express';

import OrphanagesController from '../controllers/OrphanagesController';
import orphanageValidator from '../validators/orphanageValidator';

const orphanagesController = new OrphanagesController();

const routes = Router();

routes.post('/', orphanageValidator, orphanagesController.store);

export default routes;
