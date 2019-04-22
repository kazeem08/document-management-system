import Joi from 'joi';
import value from 'joi-objectid';

//validating object id
export default (Joi.objectId = value(Joi));
