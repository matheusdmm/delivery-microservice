import { supabase } from '../../database/supabase';

export const orderResolvers = {
  Query: {
    orders: async () => {
      const { data, error } = await supabase.from('orders').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
  },

  Mutation: {
    createOrder: async (_, { item }, { req }) => {
      // Recuperar token do header Authorization
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1];

      if (!token) {
        throw new Error('Token de autenticação não fornecido.');
      }

      // Recuperar usuário autenticado a partir do token
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token);

      if (error || !user) {
        throw new Error('Usuário não autenticado.');
      }

      // Criar a ordem com o ID ou email do usuário autenticado
      const { data, error: insertError } = await supabase
        .from('orders')
        .insert({
          customer: user.email, // ou user.id, se preferir
          item,
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
