import { create } from 'zustand';
import { getUsers } from '../api/requests';

interface UsersState {
  limit: number;
  offset: number;
  isLoading: boolean;
  users: UserResponse[];
  getUsers: () => void;
}

export const useUsersStore = create<UsersState>()((set, get) => ({
  users: [],
  isLoading: false,
  offset: 0,
  limit: 10,
  getUsers: async () => {
    const { limit, offset, isLoading } = get();
    if (isLoading) return;
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await getUsers({ limit, offset });
      const users = await response.json();
      set((state) => ({
        ...state,
        users: [...state.users, ...users],
        offset: state.offset + state.limit,
      }));
    } catch (error) {
      // TODO: заменить на toast
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },
}));
