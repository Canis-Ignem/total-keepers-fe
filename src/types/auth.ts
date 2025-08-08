export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  name?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  total_orders?: number;
  total_spent?: number;
}

export interface AuthState {
  user: User | null;
  access_token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface SocialLoginData {
  provider: 'google' | 'microsoft' | 'facebook';
  email: string;
  name: string;
  social_id: string;
  avatar_url?: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
  token_type: string;
}

export interface SSOProvider {
  id: 'google' | 'microsoft' | 'facebook';
  name: string;
  icon: string;
  bgColor: string;
  textColor: string;
}
