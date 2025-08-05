import { api } from '../instance';

interface User extends PostRegisterParams {}

export const postAdminLogin = (userData: PostLoginParams) => api.post<User>('admin/auth/login', { json: userData });
export const postRegister = (userData: PostRegisterParams) => api.post<User>('auth/register', { json: userData });
export const postLogin = (userData: PostLoginParams) => api.post<User>('auth/register', { json: userData });
