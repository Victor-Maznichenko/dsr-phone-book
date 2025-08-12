import { create } from 'zustand';
import { getProfile } from '../api/requests';

interface ProfileState {
  profile: Nullable<ProfileResponse>;
  isLoading: boolean;
  getProfile: () => void;
}

export const useProfileStore = create<ProfileState>()((set) => ({
  profile: null,
  isLoading: false,
  getProfile: async () => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await getProfile();
      const profile = await response.json();
      set((state) => ({ ...state, profile }));
    } catch (error) {
      // TODO: заменить на toast
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },
}));
