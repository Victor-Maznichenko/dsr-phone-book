import { create } from 'zustand';
import { getUsers } from '../api/requests';

interface UsersState {
  users: UserResponse[];
  isLoading: boolean;
  getUsers: () => void;
}

export const useUsersStore = create<UsersState>()((set) => ({
  users: [],
  isLoading: false,
  getUsers: async () => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await getUsers();
      const users = await response.json();
      set((state) => ({ ...state, users }));
    } catch (error) {
      // TODO: заменить на toast
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },
}));
