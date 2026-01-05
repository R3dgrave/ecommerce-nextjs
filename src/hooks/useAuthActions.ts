import { useState } from 'react';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: contextLogin } = useAuth();

  const handleLogin = async (email: string, pass: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login({ email, password: pass });
      contextLogin(data.user, data.token);
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData: Partial<User> & { password?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.register(userData);
      if (data.token) {
        contextLogin(data.user, data.token);
      }
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al crear cuenta';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleRegister, loading, error };
};