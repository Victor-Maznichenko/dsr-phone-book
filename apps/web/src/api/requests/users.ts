import { api } from '../instance';

export const getUsers = () => api.get<UserResponse[]>('users');

export const getUserById = (id: number) => api.get<UserResponse>(`users/${id}`);
export const deleteUserById = (id: number) => api.delete<UserResponse>(`users/${id}`);
export const patchUserById = (id: number) => (userData: UserDTO) =>
  api.patch<UserResponse>(`users/${id}`, { json: userData });
