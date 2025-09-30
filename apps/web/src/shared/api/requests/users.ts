import { api } from '../instance';

interface GetUsersParams {
  limit?: number;
  offset?: number;
}

export const getUsers = ({ limit = 10, offset = 0 }: GetUsersParams = {}) =>
  api.get<UserResponse[]>('users', {
    searchParams: {
      limit,
      offset,
    },
  });

export const getUserById = (id: string) => api.get<UserResponse>(`users/${id}`);
export const deleteUserById = (id: string) => api.delete<UserResponse>(`users/${id}`);
export const patchUserById = (id: string) => (userData: UserDTO) =>
  api.patch<UserResponse>(`users/${id}`, { json: userData });
