import request from 'supertest';
import fs from 'fs/promises';

import app from '../../src/app';
import { Image } from '../../src/models/Image';
import { Orphanage } from '../../src/models/Orphanage';
import factory from '../utils/factory';
import { AppDataSource } from '../../src/database/datasource';

describe('Orphanates controller', () => {
  const now = new Date().getTime();

  beforeAll(async () => {
    const connection = await AppDataSource.initialize();
    await connection.runMigrations();
  });

  beforeEach(async () => {
    const orphanagesRepository = AppDataSource.getRepository(Orphanage);
    const imagesRepository = AppDataSource.getRepository(Image);
    await orphanagesRepository.clear();
    await imagesRepository.clear();
  });

  afterAll(async () => {
    await fs.unlink(__dirname + '/../../uploads/' + now + '-example.jpg');
    await AppDataSource.dropDatabase();
  });

  it('should be able to get a list of orphanates', async () => {
    const orphanages = await factory.attrsMany<Orphanage>('Orphanage', 3);

    const promises: Promise<Orphanage>[] = [];
    const orphanagesRepository = AppDataSource.getRepository(Orphanage);
    orphanages.forEach(orphanage => {
      const data = orphanagesRepository.create(orphanage);
      promises.push(orphanagesRepository.save(data));
    });

    const savedOrphanages = await Promise.all(promises);
    const images = await factory.attrsMany<Image>(
      'Image',
      3,
      savedOrphanages.map(orphanage => ({ orphanage })),
    );

    const imagesRepository = AppDataSource.getRepository(Image);
    await imagesRepository.save(imagesRepository.create(images));

    const response = await request(app).get('/v1/orphanages').send();

    orphanages.forEach(orphanage => {
      const regex = new RegExp(`${process.env.BASE_URL}/v1/orphanages/\\d`);
      expect(response.body).toContainEqual({
        id: expect.any(Number),
        name: orphanage.name,
        latitude: Number(orphanage.latitude),
        longitude: Number(orphanage.longitude),
        about: orphanage.about,
        instructions: orphanage.instructions,
        opening_hours: orphanage.opening_hours,
        open_on_weekends: orphanage.open_on_weekends,
        whatsapp: orphanage.whatsapp,
        images: [
          {
            id: expect.any(Number),
            path: expect.any(String),
          },
        ],
        url: expect.stringMatching(regex),
      });
    });
  });

  it('should be able to get one orphanate', async () => {
    const orphanage = await factory.attrs<Orphanage>('Orphanage');

    const orphanagesRepository = AppDataSource.getRepository(Orphanage);

    const data = orphanagesRepository.create(orphanage);
    const { id } = await orphanagesRepository.save(data);

    const response = await request(app)
      .get('/v1/orphanages/' + id)
      .send();

    expect(response.body).toStrictEqual({
      id,
      name: orphanage.name,
      latitude: Number(orphanage.latitude),
      longitude: Number(orphanage.longitude),
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      whatsapp: orphanage.whatsapp,
      images: [],
      url: `${process.env.BASE_URL}/v1/orphanages/${id}`,
    });
  });

  it('should be not able to get one orphanate that not exists', async () => {
    const response = await request(app)
      .get('/v1/orphanages/1')
      .expect(404)
      .send();

    expect(response.body).toStrictEqual({
      message: 'Orphanage not found',
    });
  });

  it('should be able to create a new one orphanate', async () => {
    const orphanage = await factory.attrs<Orphanage>('Orphanage');

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return now;
    });

    const response = await request(app)
      .post('/v1/orphanages/')
      .field('name', orphanage.name)
      .field('latitude', orphanage.latitude)
      .field('longitude', orphanage.longitude)
      .field('about', orphanage.about)
      .field('instructions', orphanage.instructions)
      .field('opening_hours', orphanage.opening_hours)
      .field('open_on_weekends', orphanage.open_on_weekends)
      .field('whatsapp', orphanage.whatsapp)
      .attach('images', 'tests/utils/example.jpg');

    expect(response.body).toStrictEqual({
      id: expect.any(Number),
      name: orphanage.name,
      latitude: Number(orphanage.latitude),
      longitude: Number(orphanage.longitude),
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      whatsapp: orphanage.whatsapp,
      images: [
        {
          id: expect.any(Number),
          path: expect.stringContaining('-example.jpg'),
        },
      ],
    });
  });
});
