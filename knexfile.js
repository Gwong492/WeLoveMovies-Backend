const path = require("path");
require("dotenv").config();
const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in the environment variables");
}

module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: {rejectUnauthorized: false}
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: {rejectUnauthorized: false}
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    pool: {
      min: 2,
      max: 10,
    },
  }
};
