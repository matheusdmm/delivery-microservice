import { Order } from '../types/Order';
import { v4 as uuid } from 'uuid';
import * as repository from '../repositories/orderRepository';

export const criarPedido = async (
  cliente: string,
  itens: string[]
): Promise<Order> => {
  const novoPedido: Order = {
    id: crypto.randomUUID(),
    cliente,
    itens,
    status: 'pendente',
  };

  return repository.createOrder(novoPedido);
};

export const listarPedidos = async (): Promise<Order[]> => {
  return repository.listOrders();
};

export const buscarPedido = (id: string) => repository.getOrderById(id);

export const atualizarStatus = (id: string, status: Order['status']) =>
  repository.updateOrderStatus(id, status);
