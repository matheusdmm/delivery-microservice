import { Context } from 'koa';
import * as service from '../services/orderService';
import { IStatus } from '../interfaces/IStatus';
import { IOrder } from '../interfaces/IOrder';

export const listar = async (ctx: Context) => {
  try {
    const pedidos = await service.listarPedidos(); // <- usar o nome correto
    ctx.body = pedidos;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { erro: 'Erro ao listar pedidos' };
  }
};

export const buscar = async (ctx: Context) => {
  const pedido = service.buscarPedido(ctx.params.id);
  if (!pedido) {
    ctx.status = 404;
    ctx.body = { erro: 'Pedido não encontrado' };
    return;
  }
  ctx.body = pedido;
};

export const criar = async (ctx: Context) => {
  const { client, items } = ctx.request.body as IOrder;
  const pedido = service.criarPedido(client, items);
  ctx.status = 201;
  ctx.body = pedido;
};

export const atualizar = async (ctx: Context) => {
  const { status } = ctx.request.body as IStatus;
  const updated = service.atualizarStatus(ctx.params.id, status);
  if (!updated) {
    ctx.status = 404;
    ctx.body = { erro: 'Pedido não encontrado' };
    return;
  }
  ctx.body = updated;
};
