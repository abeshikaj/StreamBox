import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
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
import { RegisterCredentials } from '../types/auth';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterCredentials>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterCredentials) => {
    // Note: DummyJSON doesn't have a real register endpoint
    // This is a UI-only implementation for demonstration
    Alert.alert(
      'Registration',
      'This is a demo app. Registration is for UI demonstration only.\n\nPlease use the login screen with demo credentials.',
      [
        {
          text: 'Go to Login',
          onPress: () => {
            reset();
            navigation.navigate('Login');
          },
        },
      ]
    );
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
          <Feather name="user-plus" size={64} color="#e94560" />
          <CustomText style={styles.title}>Create Account</CustomText>
          <CustomText style={styles.subtitle}>Join StreamBox today</CustomText>
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
            <Feather name="mail" size={20} color="#c5c5c5" style={styles.inputIcon} />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#888"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                />
              )}
            />
          </View>
          {errors.email && (
            <CustomText style={styles.errorText}>{errors.email.message}</CustomText>
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

          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#c5c5c5" style={styles.inputIcon} />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#888"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Feather
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#c5c5c5"
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && (
            <CustomText style={styles.errorText}>{errors.confirmPassword.message}</CustomText>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <CustomText style={styles.buttonText}>Sign Up</CustomText>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <CustomText style={styles.loginText}>Already have an account? </CustomText>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <CustomText style={styles.loginLink}>Sign In</CustomText>
            </TouchableOpacity>
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
    marginBottom: 32,
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#c5c5c5',
    fontSize: 14,
  },
  loginLink: {
    color: '#e94560',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
