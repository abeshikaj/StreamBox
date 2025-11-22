import axios from 'axios';
import { Movie, Language, Genre } from '../types/movie';

const TMDB_API_KEY = '7c3b76f41174c9e954312de1fccf151b';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// TMDB API client
const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 10000,
});

// Mock movie data - In production, this would come from an API like TMDB
export const moviesData: Movie[] = [
  {
    id: 1,
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests.',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    rating: 9.0,
    language: 'English',
    genres: ['Action', 'Thriller'],
    releaseYear: 2008,
    duration: 152,
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
  },
  {
    id: 2,
    title: 'Inception',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
    poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    rating: 8.8,
    language: 'English',
    genres: ['Sci-Fi', 'Thriller'],
    releaseYear: 2010,
    duration: 148,
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
  },
  {
    id: 3,
    title: 'Vikram',
    description: 'Members of a black ops team must track down a dangerous gang after they kidnap one of their own.',
    poster: 'https://image.tmdb.org/t/p/w500/nGlHJf57mSLmVMJ7ZYT7PcIHNwU.jpg',
    rating: 8.3,
    language: 'Tamil',
    genres: ['Action', 'Thriller'],
    releaseYear: 2022,
    duration: 174,
    director: 'Lokesh Kanagaraj',
    cast: ['Kamal Haasan', 'Vijay Sethupathi', 'Fahadh Faasil'],
  },
  {
    id: 4,
    title: '3 Idiots',
    description: 'Two friends embark on a quest for a lost buddy. On this journey, they encounter a long-forgotten bet and engineering college memories.',
    poster: 'https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8UoW.jpg',
    rating: 8.4,
    language: 'Hindi',
    genres: ['Comedy', 'Drama'],
    releaseYear: 2009,
    duration: 170,
    director: 'Rajkumar Hirani',
    cast: ['Aamir Khan', 'R. Madhavan', 'Sharman Joshi'],
  },
  {
    id: 5,
    title: 'The Conjuring',
    description: 'Paranormal investigators work to help a family terrorized by a dark presence in their farmhouse.',
    poster: 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg',
    rating: 7.5,
    language: 'English',
    genres: ['Horror', 'Thriller'],
    releaseYear: 2013,
    duration: 112,
    director: 'James Wan',
    cast: ['Patrick Wilson', 'Vera Farmiga', 'Lili Taylor'],
  },
  {
    id: 6,
    title: 'Titanic',
    description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious ill-fated R.M.S. Titanic.',
    poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
    rating: 7.9,
    language: 'English',
    genres: ['Romance', 'Drama'],
    releaseYear: 1997,
    duration: 194,
    director: 'James Cameron',
    cast: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane'],
  },
  {
    id: 7,
    title: 'KGF Chapter 2',
    description: 'The blood-soaked land of Kolar Gold Fields (KGF) has a new overlord now - Rocky, whose name strikes fear in the hearts of his foes.',
    poster: 'https://image.tmdb.org/t/p/w500/tPFoaqIzH7y81zanI8K1vPdjzB7.jpg',
    rating: 8.4,
    language: 'Hindi',
    genres: ['Action', 'Drama'],
    releaseYear: 2022,
    duration: 166,
    director: 'Prashanth Neel',
    cast: ['Yash', 'Sanjay Dutt', 'Raveena Tandon'],
  },
  {
    id: 8,
    title: 'Jai Bhim',
    description: 'A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband.',
    poster: 'https://image.tmdb.org/t/p/w500/fOWlwDe8NiOdLlvUyHfrancès1l9TLhL.jpg',
    rating: 8.8,
    language: 'Tamil',
    genres: ['Drama', 'Thriller'],
    releaseYear: 2021,
    duration: 164,
    director: 'T. J. Gnanavel',
    cast: ['Suriya', 'Lijomol Jose', 'Manikandan'],
  },
  {
    id: 9,
    title: 'Avengers: Endgame',
    description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance.",
    poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    rating: 8.4,
    language: 'English',
    genres: ['Action', 'Sci-Fi'],
    releaseYear: 2019,
    duration: 181,
    director: 'Anthony Russo, Joe Russo',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'],
  },
  {
    id: 10,
    title: 'Drishyam 2',
    description: 'A gripping tale of an investigation and a family who must relive the past to find the truth.',
    poster: 'https://image.tmdb.org/t/p/w500/7bMKqQf6vnrE3DZgHdZ0qEiNZs2.jpg',
    rating: 8.2,
    language: 'Hindi',
    genres: ['Thriller', 'Drama'],
    releaseYear: 2022,
    duration: 140,
    director: 'Abhishek Pathak',
    cast: ['Ajay Devgn', 'Tabu', 'Akshaye Khanna'],
  },
  {
    id: 11,
    title: 'Master',
    description: 'An alcoholic professor is sent to a juvenile school, where he clashes with a gangster who uses the school children for criminal activities.',
    poster: 'https://image.tmdb.org/t/p/w500/cRRj3NthTXqDWkFjfFZPze9nNP5.jpg',
    rating: 7.8,
    language: 'Tamil',
    genres: ['Action', 'Thriller'],
    releaseYear: 2021,
    duration: 179,
    director: 'Lokesh Kanagaraj',
    cast: ['Vijay', 'Vijay Sethupathi', 'Malavika Mohanan'],
  },
  {
    id: 12,
    title: 'Interstellar',
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    rating: 8.6,
    language: 'English',
    genres: ['Sci-Fi', 'Drama'],
    releaseYear: 2014,
    duration: 169,
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
  },
];

// Helper function to convert TMDB movie to our Movie type
const convertTMDBMovie = (tmdbMovie: any, language: Language = 'English'): Movie => {
  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title || tmdbMovie.original_title,
    description: tmdbMovie.overview || 'No description available',
    poster: tmdbMovie.poster_path 
      ? `${TMDB_IMAGE_BASE_URL}${tmdbMovie.poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Poster',
    rating: tmdbMovie.vote_average || 0,
    language: language,
    genres: tmdbMovie.genre_ids?.slice(0, 3).map((id: number) => {
      const genreMap: { [key: number]: Genre } = {
        28: 'Action',
        35: 'Comedy',
        18: 'Drama',
        27: 'Horror',
        10749: 'Romance',
        878: 'Sci-Fi',
        53: 'Thriller',
        14: 'Fantasy',
      };
      return genreMap[id] || 'Drama';
    }) || ['Drama'],
    releaseYear: tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear() : 2024,
    duration: 120, // Default duration as TMDB doesn't provide it in list view
    director: 'Various', // Would need separate API call for details
    cast: ['Cast Info Available'], // Would need separate API call for details
  };
};

export const movieApi = {
  /**
   * Get all movies (now fetches from TMDB)
   */
  getAllMovies: async (): Promise<Movie[]> => {
    try {
      // Fetch popular movies from TMDB
      const response = await tmdbClient.get('/movie/popular', {
        params: {
          api_key: TMDB_API_KEY,
          page: 1,
        },
      });

      const movies = response.data.results.slice(0, 20).map((movie: any) => 
        convertTMDBMovie(movie, 'English')
      );

      // Mix with our local data for variety
      return [...movies, ...moviesData];
    } catch (error) {
      console.error('Error fetching from TMDB, using local data:', error);
      // Fallback to local data if API fails
      return moviesData;
    }
  },

  /**
   * Get movies by language
   */
  getMoviesByLanguage: async (language: string): Promise<Movie[]> => {
    try {
      // For different languages, use different regions/languages
      const languageMap: { [key: string]: string } = {
        English: 'en',
        Hindi: 'hi',
        Tamil: 'ta',
        Sinhala: 'si',
      };

      const langCode = languageMap[language] || 'en';
      
      const response = await tmdbClient.get('/discover/movie', {
        params: {
          api_key: TMDB_API_KEY,
          with_original_language: langCode,
          page: 1,
        },
      });

      const movies = response.data.results.slice(0, 15).map((movie: any) => 
        convertTMDBMovie(movie, language as Language)
      );

      // Add local movies of the same language
      const localMovies = moviesData.filter((movie) => movie.language === language);
      return [...movies, ...localMovies];
    } catch (error) {
      console.error('Error fetching by language:', error);
      return moviesData.filter((movie) => movie.language === language);
    }
  },

  /**
   * Get movies by genre
   */
  getMoviesByGenre: async (genre: string): Promise<Movie[]> => {
    try {
      const genreIdMap: { [key: string]: number } = {
        Action: 28,
        Comedy: 35,
        Drama: 18,
        Horror: 27,
        Romance: 10749,
        'Sci-Fi': 878,
        Thriller: 53,
        Fantasy: 14,
      };

      const genreId = genreIdMap[genre];
      
      if (!genreId) {
        return moviesData.filter((movie) => movie.genres.includes(genre as Genre));
      }

      const response = await tmdbClient.get('/discover/movie', {
        params: {
          api_key: TMDB_API_KEY,
          with_genres: genreId,
          page: 1,
        },
      });

      const movies = response.data.results.slice(0, 15).map((movie: any) => 
        convertTMDBMovie(movie)
      );

      // Add local movies of the same genre
      const localMovies = moviesData.filter((movie) => movie.genres.includes(genre as Genre));
      return [...movies, ...localMovies];
    } catch (error) {
      console.error('Error fetching by genre:', error);
      return moviesData.filter((movie) => movie.genres.includes(genre as Genre));
    }
  },

  /**
   * Search movies by title (now uses TMDB search)
   */
  searchMovies: async (query: string): Promise<Movie[]> => {
    try {
      const response = await tmdbClient.get('/search/movie', {
        params: {
          api_key: TMDB_API_KEY,
          query: query,
          page: 1,
        },
      });

      const tmdbMovies = response.data.results.slice(0, 15).map((movie: any) => 
        convertTMDBMovie(movie)
      );

      // Also search in local data
      const lowerQuery = query.toLowerCase();
      const localMovies = moviesData.filter(
        (movie) =>
          movie.title.toLowerCase().includes(lowerQuery) ||
          movie.cast.some((actor) => actor.toLowerCase().includes(lowerQuery)) ||
          movie.genres.some((genre) => genre.toLowerCase().includes(lowerQuery)) ||
          movie.director.toLowerCase().includes(lowerQuery)
      );

      return [...tmdbMovies, ...localMovies];
    } catch (error) {
      console.error('Error searching movies:', error);
      const lowerQuery = query.toLowerCase();
      return moviesData.filter(
        (movie) =>
          movie.title.toLowerCase().includes(lowerQuery) ||
          movie.cast.some((actor) => actor.toLowerCase().includes(lowerQuery)) ||
          movie.genres.some((genre) => genre.toLowerCase().includes(lowerQuery)) ||
          movie.director.toLowerCase().includes(lowerQuery)
      );
    }
  },

  /**
   * Get movie by ID with full details
   */
  getMovieById: async (id: number): Promise<Movie | undefined> => {
    try {
      // First check local data
      const localMovie = moviesData.find((movie) => movie.id === id);
      if (localMovie) return localMovie;

      // Fetch full movie details from TMDB
      const [movieResponse, creditsResponse] = await Promise.all([
        tmdbClient.get(`/movie/${id}`, {
          params: { api_key: TMDB_API_KEY },
        }),
        tmdbClient.get(`/movie/${id}/credits`, {
          params: { api_key: TMDB_API_KEY },
        }),
      ]);

      const movieData = movieResponse.data;
      const creditsData = creditsResponse.data;

      // Extract director from crew
      const director = creditsData.crew?.find((member: any) => member.job === 'Director')?.name || 'Unknown';

      // Extract top cast members
      const cast = creditsData.cast?.slice(0, 5).map((member: any) => member.name) || ['Cast Info Available'];

      // Map genres
      const genres = movieData.genres?.slice(0, 3).map((g: any) => {
        const genreMap: { [key: string]: Genre } = {
          'Action': 'Action',
          'Comedy': 'Comedy',
          'Drama': 'Drama',
          'Horror': 'Horror',
          'Romance': 'Romance',
          'Science Fiction': 'Sci-Fi',
          'Thriller': 'Thriller',
          'Fantasy': 'Fantasy',
        };
        return genreMap[g.name] || 'Drama';
      }) || ['Drama'];

      return {
        id: movieData.id,
        title: movieData.title || movieData.original_title,
        description: movieData.overview || 'No description available',
        poster: movieData.poster_path 
          ? `${TMDB_IMAGE_BASE_URL}${movieData.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Poster',
        rating: movieData.vote_average || 0,
        language: 'English',
        genres,
        releaseYear: movieData.release_date ? new Date(movieData.release_date).getFullYear() : 2024,
        duration: movieData.runtime || 120,
        director,
        cast,
      };
    } catch (error) {
      console.error('Error fetching movie by ID:', error);
      return moviesData.find((movie) => movie.id === id);
    }
  },

  /**
   * Get trending movies
   */
  getTrendingMovies: async (): Promise<Movie[]> => {
    try {
      const response = await tmdbClient.get('/trending/movie/week', {
        params: {
          api_key: TMDB_API_KEY,
        },
      });

      return response.data.results.slice(0, 10).map((movie: any) => 
        convertTMDBMovie(movie)
      );
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      return moviesData.slice(0, 10);
    }
  },

  /**
   * Get top rated movies
   */
  getTopRatedMovies: async (): Promise<Movie[]> => {
    try {
      const response = await tmdbClient.get('/movie/top_rated', {
        params: {
          api_key: TMDB_API_KEY,
          page: 1,
        },
      });

      return response.data.results.slice(0, 10).map((movie: any) => 
        convertTMDBMovie(movie)
      );
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      return moviesData.sort((a, b) => b.rating - a.rating).slice(0, 10);
    }
  },
};
