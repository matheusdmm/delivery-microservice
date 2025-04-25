import { supabase } from '../../database/supabase';
import { GraphQLError } from 'graphql';

interface UserCredentials {
  email: string;
  password: string;
}

export const userResolvers = {
  Mutation: {
    createUser: async (
      _: string,
      { email, password }: UserCredentials
    ): Promise<string> => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error(
          `Erro ao criar usuário: ${error.message} | ${GraphQLError}`
        );
      }

      console.info('Usuário criado.');
      return 'Usuário criado com sucesso';
    },

    loginUser: async (
      _: string,
      { email, password }: UserCredentials
    ): Promise<string> => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(
          `Erro ao fazer login: ${error.message} | ${GraphQLError}`
        );
      }

      return 'Login realizado com sucesso';
    },
  },
};
