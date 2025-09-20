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

export const getUserById = (id: number) => api.get<UserResponse>(`users/${id}`);
export const deleteUserById = (id: number) => api.delete<UserResponse>(`users/${id}`);
export const patchUserById = (id: number) => (userData: UserDTO) =>
  api.patch<UserResponse>(`users/${id}`, { json: userData });
