import { tesloApi } from '@/api/teslo-api';
import type { AuthResponse } from '../interfaces/auth.response';

export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  try {
    const { data } = await tesloApi.get<AuthResponse>('/auth/check-auth-g-status');
    localStorage.setItem('token', data.token);
    console.log('checkAuthAction check successful:', data);
    return data;
  } catch (error) {
    localStorage.removeItem('token');
    throw new Error(`Authentication check failed: ${error}`);
  }
};
