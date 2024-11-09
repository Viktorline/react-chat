import { create } from 'zustand';
import { useAuthStore } from 'shared/auth/model/authStore';

interface IFormState {
  email: string;
  password: string;
  username: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setUsername: (username: string) => void;
  submitForm: (isLogin: boolean) => Promise<void>;
}

export const useFormStore = create<IFormState>((set, get) => ({
  email: '',
  password: '',
  username: '',

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setUsername: (username) => set({ username }),

  submitForm: async (isLogin) => {
    const { email, password, username } = get();
    const { login, register } = useAuthStore.getState();

    if (isLogin) {
      await login(email, password);
    } else {
      await register({email, password, username});
    }
  },
}));
