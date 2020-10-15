import Orphanage from '../models/Orphanage';
import ImagesViews from './images_views';

export default {
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: orphanage.images.map(image => ImagesViews.render(image)),
      url: `${process.env.BASE_URL}/v1/orphanages/${orphanage.id}`,
    };
  },
};
