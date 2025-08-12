import { api } from '../instance';

export const getProfile = () => api.get<ProfileResponse>('profile');
export const deleteProfile = () => api.delete<ProfileResponse>('profile');
export const patchProfile = (profileData: UpdateProfileRequest) =>
  api.patch<ProfileResponse>('/profile', { json: profileData });
