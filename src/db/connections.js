const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];

if (!config) {
    throw new Error(`Knex configuration for environment "${environment}" is not defined.`);
  }

const knex = require("knex")(config);

module.exports = knex;
