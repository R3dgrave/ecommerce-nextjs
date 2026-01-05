import { apiClient } from './apiClient';
import { User } from '../types';

export const authService = {
  login: (credentials: Pick<User, 'email'> & { password: string }) => {
    return apiClient<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: (data: Partial<User> & { password?: string }) => {
    return apiClient<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};