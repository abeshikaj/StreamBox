import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomText from './CustomText';
import { Movie } from '../types/movie';
import { favoritesStorage } from '../storage/favoritesStorage';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

interface MovieCardProps {
  movie: Movie;
  onPress?: () => void;
}

type RootStackParamList = {
  MovieDetails: { movieId: number };
};

export default function MovieCard({ movie, onPress }: MovieCardProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme: colors } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, [movie.id]);

  const checkFavorite = async () => {
    const favorites = await favoritesStorage.getFavorites();
    setIsFavorite(favorites.includes(movie.id));
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('MovieDetails', { movieId: movie.id });
    }
  };

  const toggleFavorite = async (e: any) => {
    e.stopPropagation();
    if (isFavorite) {
      await favoritesStorage.removeFavorite(movie.id);
    } else {
      await favoritesStorage.addFavorite(movie.id);
    }
    setIsFavorite(!isFavorite);
  };

  const getGenreText = () => {
    const genreMap: { [key: number]: string } = {
      28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
      99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
      27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
      10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
    };
    const genre = movie.genreIds?.[0];
    return genre ? genreMap[genre] || 'Movie' : 'Movie';
  };

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.card }]} onPress={handlePress}>
      <Image
        source={{ uri: movie.posterPath || 'https://via.placeholder.com/500x750?text=No+Image' }}
        style={styles.poster}
        resizeMode="cover"
      />
      
      {movie.popularity && movie.popularity > 1000 && (
        <View style={[styles.trendingBadge, { backgroundColor: colors.primary }]}>
          <Feather name="trending-up" size={16} color="#fff" />
        </View>
      )}

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <CustomText style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {movie.title}
          </CustomText>
          <CustomText style={[styles.year, { color: colors.textSecondary }]}>
            {movie.releaseDate ? ` (${movie.releaseDate.split('-')[0]})` : ''}
          </CustomText>
        </View>

        <View style={styles.metaRow}>
          <View style={[styles.genreBadge, { borderColor: colors.primary }]}>
            <CustomText style={[styles.genreText, { color: colors.primary }]}>{getGenreText()}</CustomText>
          </View>
          <View style={[styles.languageBadge, { borderColor: colors.primary }]}>
            <CustomText style={[styles.languageText, { color: colors.primary }]}>
              {movie.originalLanguage?.toUpperCase()}
            </CustomText>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.rating}>
            <Feather name="star" size={14} color="#FFC107" />
            <CustomText style={[styles.ratingText, { color: colors.text }]}>
              {movie.voteAverage?.toFixed(1)}
            </CustomText>
          </View>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <Feather
              name={isFavorite ? 'heart' : 'heart'}
              size={20}
              color={isFavorite ? colors.primary : colors.textSecondary}
              fill={isFavorite ? colors.primary : 'none'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 18,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  poster: {
    width: '100%',
    height: 200,
  },
  trendingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  info: {
    padding: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    lineHeight: 20,
  },
  year: {
    fontSize: 12,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  genreBadge: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  genreText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  languageBadge: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  languageText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
  },
  favoriteButton: {
    padding: 6,
  },
});
