import { describe, it, expect } from 'vitest';
import { runQuery } from '../src/database/duckdb';

describe('Orders', () => {
  it('deve retornar um array (mesmo vazio) ao consultar usuarios', async () => {
    const orders = await runQuery('SELECT * FROM users');
    expect(Array.isArray(orders)).toBe(true);
  });
});
