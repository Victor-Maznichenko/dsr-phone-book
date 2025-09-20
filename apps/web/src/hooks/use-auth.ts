import { useEffect } from 'react';
import { useProfileStore } from '../store/profile';

export const useAuth = () => {
  const { getProfile, isLoading } = useProfileStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return { isLoading };
};
