import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  AuthResponse, 
  LoginCredentials, 
  RegisterCredentials, 
  SocialLoginData, 
  User 
} from '@/types/auth';

class AuthAPI {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests if available
    this.api.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    // Handle token expiry
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            window.location.href = '/auth/signin';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    const response: AxiosResponse<AuthResponse> = await this.api.post(
      '/api/v1/auth/login',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post(
      '/api/v1/auth/register',
      credentials
    );
    return response.data;
  }

  async socialLogin(socialData: SocialLoginData): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post(
      '/api/v1/auth/social-login',
      socialData
    );
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse<User> = await this.api.get('/api/v1/auth/me');
    return response.data;
  }

  async getUserProfile(): Promise<User> {
    const response: AxiosResponse<User> = await this.api.get('/api/v1/auth/me/profile');
    return response.data;
  }

  async updateProfile(profileData: Partial<User>): Promise<User> {
    const response: AxiosResponse<User> = await this.api.put('/api/v1/auth/me', profileData);
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.api.put('/api/v1/auth/me/password', {
      current_password: currentPassword,
      new_password: newPassword,
    });
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      await this.api.post('/api/v1/auth/validate-token', { token });
      return true;
    } catch {
      return false;
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/api/v1/auth/refresh-token');
    return response.data;
  }

  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  }

  async deactivateAccount(): Promise<void> {
    await this.api.delete('/api/v1/auth/me');
    await this.logout();
  }
}

export const authAPI = new AuthAPI();
