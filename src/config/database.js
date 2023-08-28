const mysql = require("mysql");
const env = require("../utils/env.js");

const db = mysql.createPool({
  connectionLimit: 100,
  host: env.DB_HOST,
  database: env.DB_DATABASE,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  debug: false,
  timezone: "utc",
});

module.exports = db;
