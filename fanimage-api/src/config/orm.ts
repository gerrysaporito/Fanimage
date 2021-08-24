// File: config/orm
// Description: Initializes TypeORM.

import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import logger from './logger';

dotenv.config();

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  username: process.env.DB_CONNECTION_USER || 'test',
  password: process.env.DB_CONNECTION_PASSWORD || 'test',
  host: process.env.DB_CONNECTION_HOST || 'localhost',
  database: process.env.DB_CONNECTION_DATABASE || 'fanimageImageRepository',
  port: parseInt(process.env.DB_CONNECTION_PORT || '5432'),
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['dist/db/entity/**/*.js'],
  migrations: ['dist/db/migration/**/*.js'],
  subscribers: ['dist/db/subscriber/**/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

/*
 * Initializes database and builds skeleton.
 *
 * @return null
 */
const init = async () => {
  await createConnection(ormConfig)
    .then(async (connection) => {
      return;
    })
    .catch((err) => {
      logger.info({
        message: `TypeORM Connection: Unexpected error on connection`,
        extra: err.message,
      });
      process.exit(1);
    });

  logger.info({
    message: `TypeORM successfully connected to PostgreSQL`,
  });
};

export { init };
