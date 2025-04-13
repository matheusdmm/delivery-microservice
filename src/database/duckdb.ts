import duckdb from 'duckdb';

//const db = new duckdb.Database(':memory:'); // for test/dev
const db = new duckdb.Database('./delivery.db'); // prod

export default db;
