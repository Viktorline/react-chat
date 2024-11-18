import { jwtDecode } from 'jwt-decode';
import { api } from 'shared/api/axios';
import { create } from 'zustand';

import { AuthResponse, User } from 'entities/user/model/types';

interface IAuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  register: (data: Record<string, any>) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUserFromToken: () => void;
}

const decodeAndValidateToken = (token: string): User | null => {
  try {
    const payload = jwtDecode<User>(token);
    if (payload.id && payload.email && payload.username) {
      return payload;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Ошибка при декодировании токена:', error);
    return null;
  }
};

export const useAuthStore = create<IAuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: null,
  isLoading: true,

  register: async (data) => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      set({
        token,
        user,
        isLoading: false,
      });
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      set({
        token,
        user,
        isLoading: false,
      });
    } catch (error) {
      console.error('Ошибка при входе:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/auth';
    set({
      token: null,
      user: null,
      isLoading: false,
    });
  },

  loadUserFromToken: () => {
    const token = localStorage.getItem('token');

    if (!token) {
      set({ isLoading: false });
      return;
    }

    const payload = decodeAndValidateToken(token);

    if (payload) {
      set({
        token,
        user: {
          id: payload.id,
          email: payload.email,
          username: payload.username,
        },
        isLoading: false,
      });
    } else {
      localStorage.removeItem('token');
      set({
        token: null,
        user: null,
        isLoading: false,
      });
    }
  },
}));
