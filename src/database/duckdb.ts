import duckdb from 'duckdb';
import dotenv from 'dotenv';

dotenv.config();

const environment = process.env.ENVIRONMENT || 'PROD';
const dbPath = process.env.DB_PATH || './delivery.duckdb';

//const db = new duckdb.Database(':memory:'); // for test/dev
//const db = new duckdb.Database('./delivery.db'); // prod

const db =
  environment === 'DEV'
    ? new duckdb.Database(':memory:')
    : new duckdb.Database(dbPath);

export default db;
