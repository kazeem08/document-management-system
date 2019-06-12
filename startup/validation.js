import Joi from '@hapi/joi';
import value from 'joi-objectid';

//validating objectId
export default (Joi.objectId = value(Joi));
