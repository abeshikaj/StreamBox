import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

const THEME_KEY = '@streambox_theme';

export type ThemeMode = 'light' | 'dark' | 'system';

interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
}

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
}

const lightTheme: Theme = {
  primary: '#FF8C00',        // Dark Orange
  secondary: '#FFA500',      // Orange
  accent: '#FF7F00',         // Vibrant Orange
  background: '#F5F5F5',     // Light gray
  surface: '#FFFFFF',        // White
  card: '#FAFAFA',           // Off-white
  text: '#2F2F2F',           // Dark gray
  textSecondary: '#6B7280',  // Medium gray
  border: '#E5E5E5',         // Light border
  error: '#DC2626',          // Red
  success: '#10B981',        // Green
};

const darkTheme: Theme = {
  primary: '#FFA500',        // Orange
  secondary: '#FFB84D',      // Light Orange
  accent: '#FF8C00',         // Dark Orange
  background: '#1A1A1A',     // Dark gray
  surface: '#2F2F2F',        // Medium dark gray
  card: '#3A3A3A',           // Gray
  text: '#FFFFFF',           // White
  textSecondary: '#A3A3A3',  // Light gray
  border: '#4A4A4A',         // Border gray
  error: '#DC2626',          // Red
  success: '#22C55E',        // Green
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [theme, setTheme] = useState<Theme>(systemColorScheme === 'dark' ? darkTheme : lightTheme);

  useEffect(() => {
    loadThemeMode();
  }, []);

  useEffect(() => {
    updateTheme();
  }, [themeMode, systemColorScheme]);

  const loadThemeMode = async () => {
    try {
      const savedMode = await AsyncStorage.getItem(THEME_KEY);
      if (savedMode && (savedMode === 'light' || savedMode === 'dark' || savedMode === 'system')) {
        setThemeModeState(savedMode as ThemeMode);
      }
    } catch (error) {
      console.error('Error loading theme mode:', error);
    }
  };

  const updateTheme = () => {
    if (themeMode === 'system') {
      setTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
    } else {
      setTheme(themeMode === 'dark' ? darkTheme : lightTheme);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Error saving theme mode:', error);
    }
  };

  const isDark = themeMode === 'system' 
    ? systemColorScheme === 'dark' 
    : themeMode === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, themeMode, isDark, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
