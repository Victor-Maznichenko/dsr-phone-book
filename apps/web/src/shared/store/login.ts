import { create } from 'zustand';
import { redirect } from 'react-router';
import { postAdminLogin, postLogin } from '@/shared/api/requests';

interface LoginState {
  isLoading: boolean;
  submitLogin: (payload: UserCredentials, isAdmin?: boolean) => Promise<void>;
}

export const useLoginStore = create<LoginState>()((set) => ({
  isLoading: false,
  submitLogin: async (payload, isAdmin) => {
    set(({ isLoading, ...state }) => ({ ...state, isLoading: true }));
    try {
      const response = isAdmin ? await postAdminLogin(payload) : await postLogin(payload);
      localStorage.setItem('access_token', await response.text());
      redirect('/');
    } catch (error) {
      // TODO: заменить на toast
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      set(({ isLoading, ...state }) => ({ ...state, isLoading: false }));
    }
  },
}));
