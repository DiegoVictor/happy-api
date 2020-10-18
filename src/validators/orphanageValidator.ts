import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    about: Joi.string().max(300).required(),
    instructions: Joi.string().required(),
    opening_hours: Joi.string().required(),
    open_on_weekends: Joi.boolean().required(),
    whatsapp: Joi.string().required(),
  }),
});
