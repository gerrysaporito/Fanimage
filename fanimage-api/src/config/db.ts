// File: config/db
// Description: Initializes PostgreSQL.

import dotenv from 'dotenv';
import { Client, ClientConfig } from 'pg';

import logger from './logger';

dotenv.config();

const client_config: ClientConfig = {
  user: process.env.DB_CONNECTION_USER || '',
  password: process.env.DB_CONNECTION_PASSWORD || '',
  host: process.env.DB_CONNECTION_HOST || 'localhost',
  database: process.env.DB_CONNECTION_DATABASE || 'fanimageImageRepository',
  port: parseInt(process.env.DB_CONNECTION_PORT || '5432'),
  ssl: {
    rejectUnauthorized: false,
  },
};

const dbClient = new Client(client_config);

dbClient.on('error', (err: Error) => {
  logger.info({
    message: `Postgres client: Unexpected error on idle client`,
    extra: err,
  });

  process.exit(1);
});

const init = async () => {
  await dbClient.connect();

  // await dbClient.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
  logger.info({
    message: `Postgres client connected at ${process.env.DB_CONNECTION_PORT}`,
  });
};

export { init, dbClient };
