import { supabase } from '../../database/supabase';
import { Request } from 'express';
import { OrderItem } from '../../types/types';

export const orderResolvers = {
  Query: {
    orders: async () => {
      const { data, error } = await supabase.from('orders').select('*');
      if (error) throw new Error(error.message);
      return data;
    },

    myOrders: async (_: unknown, __: unknown, context: { req: Request }) => {
      const authHeader = context.req.headers.authorization;
      const token = authHeader?.split(' ')[1];

      if (!token) {
        throw new Error('Token de autenticação não fornecido.');
      }

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token);

      if (error || !user) {
        throw new Error('Usuário não autenticado.');
      }

      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('customer', user.email);

      if (fetchError) {
        throw new Error(`Erro ao buscar pedidos: ${fetchError.message}`);
      }

      return data;
    },
  },

  Mutation: {
    createOrder: async (
      _: unknown,
      { input }: { input: { customer: string; items: OrderItem[] } },
      context: { req: Request }
    ) => {
      const authHeader = context.req.headers.authorization;
      const token = authHeader?.split(' ')[1];

      if (!token) {
        throw new Error('Token de autenticação não fornecido.');
      }

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token);

      if (error || !user) {
        throw new Error('Usuário não autenticado.');
      }

      const { customer, items } = input;

      const { data, error: insertError } = await supabase
        .from('orders')
        .insert({
          customer: customer || user.email,
          items,
          status: 'pendente',
        })
        .select()
        .single();

      if (insertError) {
        throw new Error(`Erro ao criar pedido: ${insertError.message}`);
      }

      return data;
    },
  },
};
