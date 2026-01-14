import type { User } from '@/interfaces/user.interfaces';

// login , reguister, renew token
export interface AuthResponse {
  user: User;
  token: string;
}
