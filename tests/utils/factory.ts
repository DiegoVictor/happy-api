import { faker } from '@faker-js/faker';
import factory from 'factory-girl';

import { Orphanage } from '../../src/models/Orphanage';
import { Image } from '../../src/models/Image';

factory.define('Orphanage', Orphanage, {
  name: faker.person.fullName,
  latitude: faker.location.latitude,
  longitude: faker.location.longitude,
  about: faker.lorem.sentence,
  instructions: faker.lorem.sentence,
  opening_hours: faker.lorem.sentence,
  open_on_weekends: faker.datatype.boolean,
  whatsapp: faker.phone.number,
});

factory.define('Image', Image, {
  path: () => faker.string.alphanumeric(10) + '.jpg',
  orphanage_id: faker.number.int,
});

export default factory;
