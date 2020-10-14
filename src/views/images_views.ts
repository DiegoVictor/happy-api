import Image from '../models/Image';

export default {
  render(image: Image) {
    return {
      id: image.id,
      path: `${process.env.APP_URL}/uploads/${image.path}`,
    };
  },
};
