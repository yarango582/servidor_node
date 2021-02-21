require('dotenv').config();

const username = process.env.DB_USER_NAME;
const password = process.env.DB_USER_PASSWORD;
const database = process.env.DB_NAME;
const host = process.env.DB_HOSTNAME;
const type_dialect = process.env.TYPE_DIALITEC;

module.exports = {
  "development": {
    "username": username,
    "password": password,
    "database": database,
    "host": host,
    "dialect": type_dialect
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
