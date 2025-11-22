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

  const sizes = {
    small: { icon: 40, text: 24, container: 60 },
    medium: { icon: 60, text: 32, container: 80 },
    large: { icon: 80, text: 40, container: 100 },
  };

  const currentSize = sizes[size];

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: 12,
    },
    logoContainer: {
      width: currentSize.container,
      height: currentSize.container,
      borderRadius: currentSize.container / 2,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 8,
    },
    logoText: {
      fontSize: currentSize.text,
      fontWeight: 'bold',
      color: colors.text,
    },
    gradientText: {
      fontSize: currentSize.text,
      fontWeight: 'bold',
    },
    streamText: {
      color: colors.primary,
    },
    boxText: {
      color: colors.accent,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Feather name="play-circle" size={currentSize.icon} color="#fff" />
      </View>
      {showText && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomText style={[styles.gradientText, styles.streamText]}>Stream</CustomText>
          <CustomText style={[styles.gradientText, styles.boxText]}>Box</CustomText>
        </View>
      )}
    </View>
  );
}
