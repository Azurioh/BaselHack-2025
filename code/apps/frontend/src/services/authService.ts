import api from '../config/api';

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface SignInData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthError {
  message: string;
  statusCode: number;
}

class AuthService {
  async register(data: SignUpData): Promise<void> {
    try {
      await api.post('/auth/v1/register', data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      throw new Error(errorMessage);
    }
  }

  async login(data: SignInData): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/v1/login', data);
      const { accessToken, refreshToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      return { accessToken, refreshToken };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      throw new Error(errorMessage);
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async refreshToken(refreshToken: string): Promise<string> {
    try {
      const response = await api.post('/auth/v1/refresh-token', {
        refreshToken,
      });
      const newRefreshToken = response.data.data.token;
      localStorage.setItem('refreshToken', newRefreshToken);
      return newRefreshToken;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Token refresh failed';
      throw new Error(errorMessage);
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  async randomRegister(): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/v1/random-register');
      const { accessToken, refreshToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      return { accessToken, refreshToken };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Random registration failed';
      throw new Error(errorMessage);
    }
  }
}

export default new AuthService();
