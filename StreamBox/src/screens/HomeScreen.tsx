import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CustomText from '../components/CustomText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Feather name="film" size={64} color="#e94560" />
      <CustomText style={styles.title}>Welcome to StreamBox</CustomText>
      <CustomText style={styles.subtitle}>
        Your entertainment hub for movies and TV shows
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f3460',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#c5c5c5',
    textAlign: 'center',
  },
});
