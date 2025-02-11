export default interface LoginInterface {
  id?: number;
  role?: string;
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface User {
  id: string;
  email: string;
  password: string;
  status: string;
  created_at: string;
  updated_at: string;
  refreshToken: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
  redirect_url: string;
}
