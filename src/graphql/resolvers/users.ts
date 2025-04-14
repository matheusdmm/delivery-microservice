import { supabase } from '../../database/supabase';

export const userResolvers = {
  Mutation: {
    createUser: async (_, { email, password }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error(`Erro ao criar usuário: ${error.message}`);
      }
      console.info('Usuario criado.');
      return 'Usuário criado com sucesso';
    },

    loginUser: async (_, { email, password }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(`Erro ao fazer login: ${error.message}`);
      }

      return 'Login realizado com sucesso';
    },
  },
};
