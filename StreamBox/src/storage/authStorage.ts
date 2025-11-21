import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/auth';

const USER_KEY = '@streambox_user';
const TOKEN_KEY = '@streambox_token';

export const authStorage = {
  /**
   * Save user data and token to AsyncStorage
   * @param user - User object with token
   */
  saveUser: async (user: User): Promise<void> => {
    try {
      if (!user || !user.token) {
        throw new Error('Invalid user data: user and token are required');
      }
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      await AsyncStorage.setItem(TOKEN_KEY, user.token);
    } catch (error) {
      console.error('Error saving user data:', error);
      throw new Error('Failed to save user data');
    }
  },

  /**
   * Get user data from AsyncStorage
   * @returns User object or null if not found
   */
  getUser: async (): Promise<User | null> => {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  /**
   * Get token from AsyncStorage
   * @returns Token string or null if not found
   */
  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  /**
   * Remove user data and token from AsyncStorage (logout)
   */
  logoutUser: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([USER_KEY, TOKEN_KEY]);
    } catch (error) {
      console.error('Error during logout:', error);
      throw new Error('Failed to logout');
    }
  },

  /**
   * Check if user is authenticated
   * @returns Boolean indicating authentication status
   */
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      return token !== null;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  },
};
