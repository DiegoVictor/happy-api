import { Router } from 'express';
import multer from 'multer';

import OrphanagesController from '../controllers/OrphanagesController';
import idValidator from '../validators/idValidator';
import orphanageValidator from '../validators/orphanageValidator';
import uploadConfig from '../config/upload';

const orphanagesController = new OrphanagesController();

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/', orphanagesController.index);
routes.get('/:id', idValidator, orphanagesController.show);
routes.post(
  '/',
  upload.array('images'),
  async (request, response, next) => {
    await orphanageValidator(request, response, (err: string) => {
      next(err);
    });
  },
  orphanagesController.store,
);

export default routes;
