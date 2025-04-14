import { runQuery } from '../../database/duckdb';

export const resolvers = {
  Query: {
    orders: async () => {
      const result = await runQuery('SELECT * FROM orders;');
      return result;
    },
  },
  Mutation: {
    createOrder: async (_: any, { customer, item }: any) => {
      const createdAt = new Date().toISOString();
      const status = 'PENDING';
      await runQuery(`INSERT INTO orders VALUES (
        (SELECT COALESCE(MAX(id), 0) + 1 FROM orders),
        '${customer}',
        '${item}',
        '${status}',
        '${createdAt}'
      );`);
      const [newOrder] = await runQuery(
        `SELECT * FROM orders ORDER BY id DESC LIMIT 1;`
      );
      return newOrder;
    },
  },
};
