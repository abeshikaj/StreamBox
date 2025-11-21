import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';
import { authApi } from '../api/authApi';
import { authStorage } from '../storage/authStorage';
import { LoginCredentials, User } from '../types/auth';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await authApi.login(data);
      const token = response.accessToken || response.token;
      
      if (!token) {
        throw new Error('No authentication token received');
      }

      const user: User = {
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        image: response.image,
        token: token,
      };

      await authStorage.saveUser(user);
      
      Alert.alert('Success', `Welcome back, ${user.firstName}!`);
      // Navigation will be handled by AppNavigator
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Feather name="film" size={64} color="#e94560" />
          <CustomText style={styles.title}>StreamBox</CustomText>
          <CustomText style={styles.subtitle}>Sign in to continue</CustomText>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color="#c5c5c5" style={styles.inputIcon} />
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#888"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />
          </View>
          {errors.username && (
            <CustomText style={styles.errorText}>{errors.username.message}</CustomText>
          )}

          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#c5c5c5" style={styles.inputIcon} />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#888"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="#c5c5c5" />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <CustomText style={styles.errorText}>{errors.password.message}</CustomText>
          )}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <CustomText style={styles.buttonText}>Sign In</CustomText>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <CustomText style={styles.registerText}>Don't have an account? </CustomText>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <CustomText style={styles.registerLink}>Sign Up</CustomText>
            </TouchableOpacity>
          </View>

          <View style={styles.demoContainer}>
            <CustomText style={styles.demoText}>Demo credentials:</CustomText>
            <CustomText style={styles.demoCredentials}>Username: emilys</CustomText>
            <CustomText style={styles.demoCredentials}>Password: emilyspass</CustomText>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f3460',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#c5c5c5',
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    marginBottom: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2d2d44',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    color: '#fff',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    color: '#e94560',
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#e94560',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    color: '#c5c5c5',
    fontSize: 14,
  },
  registerLink: {
    color: '#e94560',
    fontSize: 14,
    fontWeight: 'bold',
  },
  demoContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d2d44',
  },
  demoText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  demoCredentials: {
    color: '#c5c5c5',
    fontSize: 12,
    marginTop: 4,
  },
});
