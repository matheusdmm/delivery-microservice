import { Order } from '../types/Order';
import db from '../database/duckdb';

// db setup
var query =
  'CREATE TABLE IF NOT EXISTS orders (id VARCHAR PRIMARY KEY, cliente VARCHAR, itens JSON, status VARCHAR)';
db.run(query, function (err) {
  if (err) {
    console.error('Erro ao criar a tabela:', err);
  } else {
    console.log('Tabela "orders" criada ou já existente');
  }
});

export const createOrder = (order: Order): Order => {
  const query = `
      INSERT INTO orders (id, cliente, itens, status)
      VALUES (?, ?, ?, ?)
    `;

  db.run(
    query,
    order.id,
    order.cliente,
    JSON.stringify(order.itens),
    order.status,
    function (err) {
      if (err) {
        console.error('Erro ao inserir pedido:', err);
      } else {
        console.log('Pedido criado com sucesso:', order);
      }
    }
  );

  return order;
};

export const listOrders = async (): Promise<Order[]> => {
  const query = 'SELECT * FROM orders';

  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        console.error('Erro ao listar pedidos:', err);
        reject(err);
      } else {
        const orders: Order[] = rows.map((row: any) => ({
          id: row.id,
          cliente: row.cliente,
          itens: JSON.parse(row.itens),
          status: row.status,
        }));
        resolve(orders);
      }
    });
  });
};

// default test
const orders: Order[] = [];

export const createOrderTest = (order: Order) => {
  orders.push(order);
  return order;
};

export const listOrdersTest = () => orders;

export const getOrderById = (id: string) => orders.find((o) => o.id === id);

export const updateOrderStatus = (id: string, status: Order['status']) => {
  const order = getOrderById(id);
  if (order) order.status = status;
  return order;
};
