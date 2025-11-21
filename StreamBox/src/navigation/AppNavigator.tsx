import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { authStorage } from '../storage/authStorage';
import AuthStack from './AuthStack';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    // Check auth status every 2 seconds
    const interval = setInterval(() => {
      checkAuthStatus();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await authStorage.getToken();
      setUserToken(token);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUserToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e94560" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken !== null ? (
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen 
          name="Auth" 
          component={AuthStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f3460',
  },
});
