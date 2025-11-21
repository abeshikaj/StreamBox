import axios from 'axios';
import { AuthResponse, LoginCredentials } from '../types/auth';

const API_BASE_URL = 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const authApi = {
  /**
   * Login user with username and password
   * @param credentials - Username and password
   * @returns Promise with user data and token
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
      }
      throw new Error('An unexpected error occurred during login.');
    }
  },

  /**
   * Verify token validity
   * @param token - JWT token to verify
   * @returns Promise with user data
   */
  verifyToken: async (token: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.get<AuthResponse>('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Invalid or expired token');
      }
      throw new Error('Token verification failed');
    }
  },
};
