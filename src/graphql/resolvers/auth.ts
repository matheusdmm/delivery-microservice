import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../../database/duckdb';

export const authResolvers = {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await new Promise((resolve, reject) => {
        db.get(
          'SELECT * FROM users WHERE username = ?',
          [username],
          (err, row) => {
            if (err) reject(err);
            resolve(row);
          }
        );
      });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: '1h' }
      );

      return { token };
    },
  },
};
