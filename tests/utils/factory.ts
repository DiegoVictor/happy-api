import { faker } from '@faker-js/faker';
import factory from 'factory-girl';

import Orphanage from '../../src/models/Orphanage';
import Image from '../../src/models/Image';

factory.define('Orphanage', Orphanage, {
  name: faker.name.findName,
  latitude: faker.address.latitude,
  longitude: faker.address.longitude,
  about: faker.lorem.sentence,
  instructions: faker.lorem.sentence,
  opening_hours: faker.lorem.sentence,
  open_on_weekends: faker.datatype.boolean,
  whatsapp: faker.phone.phoneNumber,
});

factory.define('Image', Image, {
  path: () => faker.random.alphaNumeric(10) + '.jpg',
  orphanage_id: faker.datatype.number,
});

export default factory;
