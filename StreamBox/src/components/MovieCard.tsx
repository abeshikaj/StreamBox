import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CustomText from './CustomText';
import { Movie } from '../types/movie';
import { favoritesStorage } from '../storage/favoritesStorage';
import { useTheme } from '../context/ThemeContext';

interface MovieCardProps {
  movie: Movie;
  onPress?: () => void;
  onFavoriteChange?: (isFavorite: boolean) => void;
  isTrending?: boolean;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

export default function MovieCard({ movie, onPress, onFavoriteChange, isTrending = false }: MovieCardProps) {
  const { theme } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, [movie.id]);

  const checkFavoriteStatus = async () => {
    const favStatus = await favoritesStorage.isFavorite(movie.id);
    setIsFavorite(favStatus);
  };

  const handleFavoritePress = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const newStatus = await favoritesStorage.toggleFavorite(movie.id);
      setIsFavorite(newStatus);
      onFavoriteChange?.(newStatus);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.posterContainer}>
        <Image
          source={{ uri: movie.poster }}
          style={styles.poster}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
          disabled={loading}
        >
          <Feather
            name={isFavorite ? 'heart' : 'heart'}
            size={20}
            color={isFavorite ? theme.primary : '#fff'}
            style={isFavorite ? styles.heartFilled : styles.heartOutline}
          />
        </TouchableOpacity>
        <View style={styles.ratingBadge}>
          <Feather name="star" size={12} color="#ffd700" />
          <CustomText style={styles.ratingText}>{movie.rating.toFixed(1)}</CustomText>
        </View>
        {isTrending && (
          <View style={[styles.trendingBadge, { backgroundColor: `rgba(${theme.primary === '#F97316' ? '249, 115, 22' : '255, 140, 0'}, 0.9)` }]}>
            <Feather name="trending-up" size={18} color="#fff" />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <CustomText style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {movie.title}
          </CustomText>
          <CustomText style={[styles.year, { color: theme.textSecondary }]}>{movie.releaseYear}</CustomText>
        </View>
        
        <View style={styles.genresContainer}>
          {movie.genres.slice(0, 2).map((genre, index) => (
            <View key={index} style={styles.genreBadge}>
              <CustomText style={[styles.genreText, { color: theme.primary }]}>{genre}</CustomText>
            </View>
          ))}
        </View>

        <CustomText style={[styles.description, { color: theme.textSecondary }]} numberOfLines={2}>
          {movie.description}
        </CustomText>

        <View style={styles.footer}>
          <View style={styles.languageBadge}>
            <CustomText style={[styles.languageText, { color: theme.primary }]}>{movie.language}</CustomText>
          </View>
          <CustomText style={[styles.duration, { color: theme.textSecondary }]}>{movie.duration} min</CustomText>
        </View>
      </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  trendingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  trendingText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  posterContainer: {
    width: '100%',
    height: 160,
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
  },
  heartFilled: {
    // Filled heart
  },
  heartOutline: {
    // Outline heart
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  year: {
    fontSize: 11,
    flexShrink: 0,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 4,
  },
  genreBadge: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  genreText: {
    fontSize: 10,
    fontWeight: '600',
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  languageText: {
    fontSize: 10,
    fontWeight: '600',
  },
  duration: {
    fontSize: 11,
  },
});
