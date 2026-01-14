import type { User } from '@/interfaces/user.interfaces';
import { create } from 'zustand';
import { loginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-auth.actions';
import { registerAction } from '../actions/register.action';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

type AuthStore = {
  //* properties --> solo lectura, valores de estado
  user: User | null;
  token: string | null;
  authStatus?: AuthStatus;

  //* getters -->  valores computados a partir del estado
  isAdmin: () => boolean;

  //* actions --> funciones que modifican el store
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
  register: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<boolean>;
};

export const useAuthStore = create<AuthStore>()((set, get) => ({
  //implementacion del store
  user: null,
  token: null,
  authStatus: 'checking',

  //Getters
  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles?.includes('admin');
  },

  //Actions
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, authStatus: 'authenticated' });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      localStorage.removeItem('token');
      set({ user: null, token: null, authStatus: 'not-authenticated' });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, authStatus: 'not-authenticated' });
  },
  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({ user, token, authStatus: 'authenticated' });
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      set({
        user: undefined,
        token: undefined,
        authStatus: 'not-authenticated',
      });
      console.log('Auth check failed:', error);
      return false;
    }
  },
  register: async (email: string, password: string, fullName: string) => {
    try {
      const data = await registerAction(email, password, fullName);
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, authStatus: 'authenticated' });
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      localStorage.removeItem('token');
      set({ user: null, token: null, authStatus: 'not-authenticated' });
      return false;
    }
  },
}));
