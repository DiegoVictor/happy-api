import { Router } from 'express';

import OrphanagesController from '../controllers/OrphanagesController';
import idValidator from '../validators/idValidator';
import orphanageValidator from '../validators/orphanageValidator';

const orphanagesController = new OrphanagesController();

const routes = Router();

routes.get('/', orphanagesController.index);
routes.get('/:id', idValidator, orphanagesController.show);
routes.post('/', orphanageValidator, orphanagesController.store);

export default routes;
