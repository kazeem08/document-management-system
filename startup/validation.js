const Joi = require('@hapi/joi');

//validating objectId
Joi.objectId = require('joi-objectid')(Joi);

module.exports = Joi.objectId;
