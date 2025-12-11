import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CustomText from './CustomText';
import { useTheme } from '../context/ThemeContext';

interface AppLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function AppLogo({ size = 'medium', showText = true }: AppLogoProps) {
  const { theme: colors } = useTheme();
  
  const dimensions = {
    small: { container: 40, icon: 20, text: 16 },
    medium: { container: 60, icon: 30, text: 20 },
    large: { container: 80, icon: 40, text: 24 },
  };

  const dims = dimensions[size];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.logoContainer,
          {
            width: dims.container,
            height: dims.container,
            backgroundColor: colors.primary,
          },
        ]}
      >
        <Feather name="play-circle" size={dims.icon} color="#fff" />
      </View>
      {showText && (
        <CustomText style={[styles.logoText, { fontSize: dims.text, color: colors.text }]}>
          StreamBox
        </CustomText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoText: {
    fontWeight: 'bold',
    marginTop: 12,
  },
});
