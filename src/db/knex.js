const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment]; 
console.log(knexConfig)
const knex = require('knex')(knexConfig);

module.exports = knex;
