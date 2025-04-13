import { Context } from 'koa';
import * as service from '../services/orderService';
import { IStatus } from '../interfaces/IStatus';
import { Order } from '../types/Order';
import { v4 as uuid } from 'uuid';

interface ICreateOrderRequest {
  cliente: string;
  itens: string[];
}

export const listar = async (ctx: Context) => {
  try {
    const pedidos = await service.listarPedidos();
    ctx.body = pedidos;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { erro: 'Erro ao listar pedidos' };
  }
};

export const buscar = async (ctx: Context) => {
  const pedido = await service.buscarPedido(ctx.params.id);
  if (!pedido) {
    ctx.status = 404;
    ctx.body = { erro: 'Pedido não encontrado' };
    return;
  }
  ctx.body = pedido;
};

export const criar = async (ctx: Context) => {
  const { cliente, itens } = ctx.request.body as ICreateOrderRequest;

  console.log('Pedido recebido:', { cliente, itens });

  if (!cliente || !itens) {
    ctx.status = 400;
    ctx.body = { erro: 'Cliente e itens são obrigatórios' };
    return;
  }

  try {
    const pedido = await service.createOrder(cliente, itens);
    ctx.status = 201;
    ctx.body = pedido;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { erro: 'Erro ao criar pedido' };
  }
};

export const atualizar = async (ctx: Context) => {
  const { status } = ctx.request.body as IStatus;
  const updated = await service.atualizarStatus(ctx.params.id, status);
  if (!updated) {
    ctx.status = 404;
    ctx.body = { erro: 'Pedido não encontrado' };
    return;
  }
  ctx.body = updated;
};
