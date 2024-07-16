import { Request, Response } from 'express';

import { Orphanage } from '../models/Orphanage';
import OrphanagesView from '../views/orphanages_view';
import { AppDataSource } from '../database/datasource';

export class OrphanagesController {
  async index(request: Request, response: Response): Promise<void> {
    const orphanagesRepository = AppDataSource.getRepository(Orphanage);
    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
    });

    response.json(
      orphanages.map(orphanage => OrphanagesView.render(orphanage)),
    );
  }

  async show(request: Request, response: Response): Promise<Response | void> {
    const { id } = request.params;

    const orphanagesRepository = AppDataSource.getRepository(Orphanage);
    const orphanage = await orphanagesRepository.findOne(id, {
      relations: ['images'],
    });

    if (!orphanage) {
      return response.status(404).json({
        message: 'Orphanage not found',
      });
    }

    response.json(OrphanagesView.render(orphanage));
  }

  async store(request: Request, response: Response): Promise<Response | void> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      whatsapp,
    } = request.body;
    const images = request.files as Express.Multer.File[];

    const orphanagesRepository = AppDataSource.getRepository(Orphanage);
    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      whatsapp,
      images: images.map(image => ({
        path: image.filename,
      })),
    });

    await orphanagesRepository.save(orphanage);

    response.status(201).json(orphanage);
  }
}
