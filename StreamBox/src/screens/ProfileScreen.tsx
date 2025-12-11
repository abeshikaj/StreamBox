import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomText from '../components/CustomText';
import { RootStackParamList } from '../navigation/AppNavigator';
import { User } from '../types/auth';
import { authStorage } from '../storage/authStorage';
import { favoritesStorage } from '../storage/favoritesStorage';
import { ratingsStorage } from '../storage/ratingsStorage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { theme: colors, isDark } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [user, setUser] = useState<User | null>(null);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadUserData = async () => {
    try {
      const userData = await authStorage.getUser();
      setUser(userData);

      const favorites = await favoritesStorage.getFavorites();
      setFavoritesCount(favorites.length);

      const ratings = await ratingsStorage.getAllRatings();
      setRatingsCount(ratings.length);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await authStorage.logoutUser();
              // Force navigation to Auth screen
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Auth' }],
                })
              );
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleClearFavorites = () => {
    Alert.alert(
      'Clear Favorites',
      'Are you sure you want to remove all favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await favoritesStorage.clearFavorites();
              setFavoritesCount(0);
              Alert.alert('Success', 'All favorites cleared');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear favorites');
            }
          },
        },
      ]
    );
  };

  const handleClearRatings = () => {
    Alert.alert(
      'Clear Ratings',
      'Are you sure you want to remove all ratings?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await ratingsStorage.clearRatings();
              setRatingsCount(0);
              Alert.alert('Success', 'All ratings cleared');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear ratings');
            }
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loadingText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 100,
    },
    topSection: {
      backgroundColor: colors.background,
      paddingTop: 50,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    pageTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
    },
    topActions: {
      flexDirection: 'row',
      gap: 10,
    },
    actionBtn: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    notificationBadge: {
      position: 'absolute',
      top: 6,
      right: 6,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#FF3B30',
      borderWidth: 1.5,
      borderColor: colors.card,
    },
    profileCard: {
      backgroundColor: colors.card,
      borderRadius: 28,
      padding: 24,
      marginBottom: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.4 : 0.08,
      shadowRadius: 12,
      elevation: 6,
      borderWidth: isDark ? 0 : 1,
      borderColor: colors.border,
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    avatarSection: {
      position: 'relative',
      marginRight: 18,
    },
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: colors.surface,
      borderWidth: 3,
      borderColor: colors.primary,
    },
    defaultAvatar: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    editAvatarBtn: {
      position: 'absolute',
      bottom: -2,
      right: -2,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: colors.card,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    },
    userInfo: {
      flex: 1,
      justifyContent: 'center',
    },
    userName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 12,
    },
    editProfileBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? colors.surface : `${colors.primary}15`,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      gap: 6,
      alignSelf: 'flex-start',
    },
    editProfileText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.primary,
    },
    content: {
      paddingHorizontal: 20,
    },
    statsRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 20,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 18,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.06,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: 1,
      borderColor: isDark ? 'transparent' : colors.border,
    },
    statIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    statName: {
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 14,
      marginTop: 8,
    },
    menuList: {
      backgroundColor: colors.card,
      borderRadius: 20,
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.05,
      shadowRadius: 6,
      elevation: 3,
      borderWidth: 1,
      borderColor: isDark ? 'transparent' : colors.border,
    },
    menuButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: colors.card,
    },
    menuButtonPressed: {
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
    },
    menuIcon: {
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
    },
    menuText: {
      flex: 1,
    },
    menuLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 3,
    },
    menuDesc: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    menuArrow: {
      marginLeft: 8,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginLeft: 74,
    },
    logoutButton: {
      backgroundColor: isDark ? colors.card : `${colors.error}10`,
      borderRadius: 20,
      marginBottom: 20,
      overflow: 'hidden',
      shadowColor: colors.error,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: 1.5,
      borderColor: `${colors.error}30`,
    },
    logoutBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 18,
      gap: 10,
    },
    logoutText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.error,
    },
    footer: {
      alignItems: 'center',
      paddingVertical: 32,
      paddingBottom: 40,
    },
    appVersion: {
      fontSize: 13,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    appName: {
      fontSize: 12,
      color: colors.textSecondary,
      opacity: 0.7,
    },
  });

  if (!user) {
    return (
      <View style={styles.container}>
        <CustomText style={styles.loadingText}>Loading profile...</CustomText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <View style={styles.topSection}>
          <View style={styles.topBar}>
            <CustomText style={styles.pageTitle}>Profile</CustomText>
            <View style={styles.topActions}>
              <TouchableOpacity 
                style={styles.actionBtn}
                onPress={() => navigation.navigate('Notifications' as never)}
              >
                <Feather name="bell" size={20} color={colors.text} />
                {notificationCount > 0 && (
                  <View style={styles.notificationBadge} />
                )}
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionBtn}
                onPress={() => navigation.navigate('Settings' as never)}
              >
                <Feather name="settings" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarSection}>
                <Image
                  source={{ uri: user.image || 'https://img.freepik.com/premium-vector/young-man-face-circle-vector-illustration-flat-style_1142-63077.jpg?w=2000' }}
                  style={styles.avatar}
                />
                <TouchableOpacity 
                  style={styles.editAvatarBtn}
                  onPress={() => navigation.navigate('EditProfile')}
                >
                  <Feather name="camera" size={14} color="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.userInfo}>
                <CustomText style={styles.userName}>
                  {user.firstName} {user.lastName}
                </CustomText>
                <CustomText style={styles.userEmail}>{user.email}</CustomText>
                <TouchableOpacity 
                  style={styles.editProfileBtn}
                  onPress={() => navigation.navigate('EditProfile')}
                >
                  <Feather name="edit-3" size={14} color={colors.primary} />
                  <CustomText style={styles.editProfileText}>Edit Profile</CustomText>
                </TouchableOpacity>
              </View>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <TouchableOpacity 
                style={styles.statCard}
                onPress={() => navigation.navigate('FavoritesTab' as never)}
              >
                <View style={[styles.statIcon, { backgroundColor: `${colors.primary}20` }]}>
                  <Feather name="heart" size={24} color={colors.primary} />
                </View>
                <CustomText style={styles.statValue}>{favoritesCount}</CustomText>
                <CustomText style={styles.statName}>Favorites</CustomText>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.statCard}
                onPress={() => navigation.navigate('RatedMovies' as never)}
              >
                <View style={[styles.statIcon, { backgroundColor: `${colors.secondary}20` }]}>
                  <Feather name="star" size={24} color={colors.secondary} />
                </View>
                <CustomText style={styles.statValue}>{ratingsCount}</CustomText>
                <CustomText style={styles.statName}>Rated</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Account Section */}
          <CustomText style={styles.sectionTitle}>Account</CustomText>
          <View style={styles.menuList}>
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => navigation.navigate('FavoritesTab' as never)}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIcon, { backgroundColor: `${colors.primary}20` }]}>
                <Feather name="heart" size={22} color={colors.primary} />
              </View>
              <View style={styles.menuText}>
                <CustomText style={styles.menuLabel}>My Favorites</CustomText>
                <CustomText style={styles.menuDesc}>{favoritesCount} movies saved</CustomText>
              </View>
              <Feather name="chevron-right" size={20} color={colors.textSecondary} style={styles.menuArrow} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => navigation.navigate('RatedMovies' as never)}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIcon, { backgroundColor: `${colors.secondary}20` }]}>
                <Feather name="star" size={22} color={colors.secondary} />
              </View>
              <View style={styles.menuText}>
                <CustomText style={styles.menuLabel}>Rated Movies</CustomText>
                <CustomText style={styles.menuDesc}>{ratingsCount} ratings given</CustomText>
              </View>
              <Feather name="chevron-right" size={20} color={colors.textSecondary} style={styles.menuArrow} />
            </TouchableOpacity>
          </View>

          {/* Data Management */}
          <CustomText style={styles.sectionTitle}>Data Management</CustomText>
          <View style={styles.menuList}>
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={handleClearFavorites}
              disabled={favoritesCount === 0}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIcon, { backgroundColor: `${colors.accent}20` }]}>
                <Feather name="trash-2" size={22} color={colors.accent} />
              </View>
              <View style={styles.menuText}>
                <CustomText style={styles.menuLabel}>Clear Favorites</CustomText>
                <CustomText style={styles.menuDesc}>Remove all saved movies</CustomText>
              </View>
              <Feather name="chevron-right" size={20} color={colors.textSecondary} style={styles.menuArrow} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.menuButton}
              onPress={handleClearRatings}
              disabled={ratingsCount === 0}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIcon, { backgroundColor: `${colors.accent}20` }]}>
                <Feather name="x-circle" size={22} color={colors.accent} />
              </View>
              <View style={styles.menuText}>
                <CustomText style={styles.menuLabel}>Clear Ratings</CustomText>
                <CustomText style={styles.menuDesc}>Remove all your ratings</CustomText>
              </View>
              <Feather name="chevron-right" size={20} color={colors.textSecondary} style={styles.menuArrow} />
            </TouchableOpacity>
          </View>

          {/* Logout */}
          <View style={styles.logoutButton}>
            <TouchableOpacity 
              style={styles.logoutBtn}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Feather name="log-out" size={24} color={colors.error} />
              <CustomText style={styles.logoutText}>Logout</CustomText>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <CustomText style={styles.appVersion}>Version 1.0.0</CustomText>
            <CustomText style={styles.appName}>StreamBox © 2025</CustomText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
