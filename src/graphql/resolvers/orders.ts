import { supabase } from '../../database/supabase';
import { Request } from 'express';
import { OrderItem } from '../../types/types';

export const orderResolvers = {
  Query: {
    orders: async (_: unknown, __: unknown, context: { req: Request }) => {
      const authHeader = context.req.headers.authorization;
      const token = authHeader?.split(' ')[1];

      if (!token) throw new Error('Token de autenticação não fornecido.');

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

      if (fetchError) throw new Error(fetchError.message);
      return data;
    },
  },

  Mutation: {
    createOrder: async (
      _: unknown,
      {
        input,
      }: {
        input: {
          customer: string;
          items: OrderItem[];
          address: string;
          paymentMethod: string;
          estimatedTime: string;
        };
      },
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

      const { customer, items, address, paymentMethod, estimatedTime } = input;

      const { data, error: insertError } = await supabase
        .from('orders')
        .insert({
          customer: customer || user.email,
          items,
          address,
          payment_method: paymentMethod,
          estimated_time: estimatedTime,
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
