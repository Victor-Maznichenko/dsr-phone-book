require('dotenv').config();
const path = require('path');

const ROOT_DIR = __dirname;

const config = {
  ROOT_DIR,
  URL_PORT: 3000,
  URL_PATH: 'http://localhost',
  BASE_VERSION: '',

  ACCESS_SECRET: process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  CONTROLLER_DIRECTORY: path.join(ROOT_DIR, 'controllers'),
  OPENAPI_YAML: path.join(ROOT_DIR, 'api', 'openapi.yaml'),
  FILE_UPLOAD_PATH: path.join(ROOT_DIR, 'uploaded_files'),

  FULL_PATH: `http://localhost:3000`, // можно собирать динамически, если нужно

  DB: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.join(ROOT_DIR, 'migrations'),
    },
    seeds: {
      directory: path.join(ROOT_DIR, 'seeds'),
    },
  }
};

module.exports = config;
