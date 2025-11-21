import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CustomText from '../components/CustomText';
import { authStorage } from '../storage/authStorage';
import { User } from '../types/auth';

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const currentUser = await authStorage.getUser();
    setUser(currentUser);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await authStorage.logoutUser();
            // Navigation will be handled automatically by AppNavigator
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={24} color="#e94560" />
      </TouchableOpacity>

      <Feather name="film" size={64} color="#e94560" />
      
      {user && (
        <View style={styles.userInfo}>
          <CustomText style={styles.welcomeText}>
            Welcome back, {user.firstName}!
          </CustomText>
          <CustomText style={styles.usernameText}>@{user.username}</CustomText>
        </View>
      )}

      <CustomText style={styles.title}>StreamBox</CustomText>
      <CustomText style={styles.subtitle}>
        Your entertainment hub for movies and TV shows
      </CustomText>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Feather name="video" size={32} color="#e94560" />
          <CustomText style={styles.statNumber}>2,500+</CustomText>
          <CustomText style={styles.statLabel}>Movies</CustomText>
        </View>
        <View style={styles.statItem}>
          <Feather name="tv" size={32} color="#e94560" />
          <CustomText style={styles.statNumber}>1,200+</CustomText>
          <CustomText style={styles.statLabel}>TV Shows</CustomText>
        </View>
      </View>
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
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d2d44',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  usernameText: {
    fontSize: 14,
    color: '#c5c5c5',
    marginTop: 4,
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
    marginBottom: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2d2d44',
    width: '45%',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  statLabel: {
    fontSize: 14,
    color: '#c5c5c5',
    marginTop: 4,
  },
});
