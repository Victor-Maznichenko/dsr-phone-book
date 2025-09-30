import { create } from 'zustand';
import { getUserById } from '@/shared/api/requests';

interface UserState {
  isLoading: boolean;
  user: UserResponse | null;
  getUserById: (id: string) => void;
}

export const useUserStore = create<UserState>()((set, get) => ({
  user: null,
  isLoading: false,
  getUserById: async (id) => {
    const { isLoading } = get();

    if (isLoading) return;
    set((state) => ({ ...state, isLoading: true }));

    try {
      const response = await getUserById(id);
      const user = await response.json();
      set((state) => ({ ...state, user }));
    } catch (error) {
      // TODO: заменить на toast
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },
}));
