import { create } from 'zustand';
import { getProfile } from '@/shared/api/requests';
import { USER_ROLES } from '@/shared/lib';

interface ProfileState {
  profile: Nullable<ProfileResponse>;
  isAdmin: boolean;
  isLoading: boolean;
  getProfile: () => void;
}

export const useProfileStore = create<ProfileState>()((set) => ({
  profile: null,
  isAdmin: false,
  isLoading: false,
  getProfile: async () => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await getProfile();
      const profile = await response.json();
      set((state) => ({
        ...state,
        profile,
        isAdmin: profile.role === USER_ROLES.Admin,
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
