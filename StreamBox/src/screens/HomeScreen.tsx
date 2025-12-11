import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView, FlatList, Image, ActivityIndicator, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomText from '../components/CustomText';
import { authStorage } from '../storage/authStorage';
import { favoritesStorage } from '../storage/favoritesStorage';
import { movieApi } from '../api/movieApi';
import { User } from '../types/auth';
import { Movie } from '../types/movie';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MovieDetails'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { theme: colors } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const carouselRef = React.useRef<FlatList>(null);

  useEffect(() => {
    loadUser();
    loadTrendingMovies();
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCarouselIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % 3;
        carouselRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const carouselData = [
    {
      id: '1',
      title: user ? `Welcome, ${user.firstName}!` : 'Welcome to StreamBox',
      subtitle: 'Discover thousands of movies and shows',
      icon: 'user' as const,
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80',
      gradient: ['rgba(255, 140, 0, 0.8)', 'rgba(0, 0, 0, 0.9)'],
    },
    {
      id: '2',
      title: 'Watch Anywhere',
      subtitle: 'Stream on any device, anytime',
      icon: 'tv' as const,
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80',
      gradient: ['rgba(255, 165, 0, 0.8)', 'rgba(0, 0, 0, 0.9)'],
    },
    {
      id: '3',
      title: 'Your Favorites',
      subtitle: 'Save and rate your favorite content',
      icon: 'heart' as const,
      image: 'https://cdn.vectorstock.com/i/preview-1x/32/24/online-movie-and-television-background-vector-16043224.jpg',
      gradient: ['rgba(255, 127, 0, 0.8)', 'rgba(0, 0, 0, 0.9)'],
    },
  ];

  const loadUser = async () => {
    const currentUser = await authStorage.getUser();
    setUser(currentUser);
  };

  const loadTrendingMovies = async () => {
    try {
      setLoadingTrending(true);
      const movies = await movieApi.getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error('Error loading trending movies:', error);
    } finally {
      setLoadingTrending(false);
    }
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingBottom: 20,
    },
    logoutButton: {
      position: 'absolute',
      top: 50,
      right: 20,
      padding: 10,
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      zIndex: 10,
    },
    header: {
      alignItems: 'center',
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    userInfo: {
      alignItems: 'center',
      marginTop: 20,
    },
    welcomeText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 8,
    },
    usernameText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 20,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    trendingSection: {
      marginTop: 24,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      letterSpacing: 0.3,
    },
    seeAllText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '600',
    },
    loadingContainer: {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    trendingList: {
      paddingHorizontal: 20,
      gap: 12,
    },
    trendingCard: {
      width: 150,
      marginRight: 16,
    },
    trendingPoster: {
      width: 150,
      height: 220,
      borderRadius: 16,
      backgroundColor: colors.card,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    trendingRating: {
      position: 'absolute',
      top: 10,
      left: 10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: 10,
      gap: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 3,
    },
    trendingRatingText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    trendingInfo: {
      marginTop: 10,
    },
    trendingTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
      lineHeight: 20,
    },
    trendingYear: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
    quickActions: {
      paddingHorizontal: 20,
      marginTop: 32,
    },
    actionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 12,
    },
    actionIcon: {
      width: 56,
      height: 56,
      backgroundColor: colors.primary + '20',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    actionContent: {
      flex: 1,
    },
    actionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    actionSubtitle: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    features: {
      paddingHorizontal: 20,
      marginTop: 32,
    },
    featuresList: {
      gap: 12,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    featureText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    carousel: {
      height: 240,
      marginTop: 60,
    },
    carouselItem: {
      width: width - 40,
      marginHorizontal: 20,
      backgroundColor: colors.card,
      borderRadius: 24,
      overflow: 'hidden',
      height: 240,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 12,
    },
    carouselImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    carouselOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    carouselGradient: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
    },
    carouselContent: {
      flex: 1,
      padding: 24,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    carouselIcon: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      borderWidth: 3,
      borderColor: 'rgba(255, 255, 255, 0.4)',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 8,
    },
    carouselTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 10,
      textShadowColor: 'rgba(0, 0, 0, 0.9)',
      textShadowOffset: { width: 0, height: 3 },
      textShadowRadius: 6,
      letterSpacing: 0.5,
    },
    carouselSubtitle: {
      fontSize: 15,
      color: '#F5F5F5',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.9)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
      fontWeight: '500',
    },
    carouselDots: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
      gap: 10,
    },
    carouselDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.textSecondary,
      opacity: 0.4,
    },
    carouselDotActive: {
      width: 28,
      backgroundColor: colors.primary,
      opacity: 1,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 4,
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={24} color={colors.primary} />
      </TouchableOpacity>

      {/* Carousel Banner */}
      <View>
        <FlatList
          ref={carouselRef}
          data={carouselData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / (width - 40)
            );
            setActiveCarouselIndex(index);
          }}
          style={styles.carousel}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.carouselImage}
                resizeMode="cover"
              />
              <View style={styles.carouselOverlay} />
              <View style={styles.carouselContent}>
                <View style={styles.carouselIcon}>
                  <Feather name={item.icon} size={36} color={colors.primary} />
                </View>
                <CustomText style={styles.carouselTitle}>{item.title}</CustomText>
                <CustomText style={styles.carouselSubtitle}>{item.subtitle}</CustomText>
                {item.id === '1' && user && (
                  <CustomText style={[styles.carouselSubtitle, { marginTop: 8, fontWeight: '600' }]}>
                    @{user.username}
                  </CustomText>
                )}
              </View>
            </View>
          )}
        />
        <View style={styles.carouselDots}>
          {carouselData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.carouselDot,
                activeCarouselIndex === index && styles.carouselDotActive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Trending Movies Section */}
      <View style={styles.trendingSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Feather name="trending-up" size={24} color={colors.primary} />
            <CustomText style={styles.sectionTitle}>Trending Now</CustomText>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('MoviesTab' as never)}>
            <CustomText style={styles.seeAllText}>See All</CustomText>
          </TouchableOpacity>
        </View>

        {loadingTrending ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            data={trendingMovies}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.trendingList}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.trendingCard}
                onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
              >
                <Image 
                  source={{ uri: item.posterPath || item.poster || 'https://via.placeholder.com/500x750?text=No+Image' }} 
                  style={styles.trendingPoster} 
                />
                <View style={styles.trendingRating}>
                  <Feather name="star" size={12} color="#ffd700" />
                  <CustomText style={styles.trendingRatingText}>
                    {item.voteAverage ? item.voteAverage.toFixed(1) : item.rating ? item.rating.toFixed(1) : 'N/A'}
                  </CustomText>
                </View>
                <View style={styles.trendingInfo}>
                  <CustomText style={styles.trendingTitle} numberOfLines={1}>
                    {item.title}
                  </CustomText>
                  <CustomText style={styles.trendingYear}>
                    {item.releaseDate ? item.releaseDate.split('-')[0] : item.releaseYear || 'N/A'}
                  </CustomText>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <View style={styles.quickActions}>
        <CustomText style={styles.sectionTitle}>Quick Access</CustomText>
        
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('MoviesTab' as never)}
        >
          <View style={styles.actionIcon}>
            <Feather name="film" size={28} color={colors.primary} />
          </View>
          <View style={styles.actionContent}>
            <CustomText style={styles.actionTitle}>Browse Movies</CustomText>
            <CustomText style={styles.actionSubtitle}>
              Explore our collection by language and genre
            </CustomText>
          </View>
          <Feather name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('FavoritesTab' as never)}
        >
          <View style={styles.actionIcon}>
            <Feather name="heart" size={28} color={colors.primary} />
          </View>
          <View style={styles.actionContent}>
            <CustomText style={styles.actionTitle}>My Favorites</CustomText>
            <CustomText style={styles.actionSubtitle}>
              View your saved movies
            </CustomText>
          </View>
          <Feather name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

    
    </ScrollView>
  );
}
