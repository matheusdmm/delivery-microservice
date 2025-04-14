import duckdb from 'duckdb';
import dotenv from 'dotenv';

dotenv.config();

const environment = process.env.ENVIRONMENT || 'PROD';
const dbPath = process.env.DB_PATH || './delivery_dev.db';

const db =
  environment === 'DEV'
    ? new duckdb.Database(':memory:')
    : new duckdb.Database(dbPath);

export const runQuery = async (query: string): Promise<duckdb.RowData[]> => {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const initDB = () => {
  if (environment === 'DEV' || 'TEST') {
    console.info('Running DEV/TEST');
    //db.run(`DROP TABLE IF EXISTS orders users;`);
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
    );
  `);

  db.run(`CREATE TABLE orders (
      id INTEGER PRIMARY KEY,
      customer TEXT,
      item TEXT,
      status TEXT,
      created_at TIMESTAMP
    );`);
};

export { db };
