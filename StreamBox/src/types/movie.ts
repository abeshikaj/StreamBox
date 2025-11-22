export type Language = 'English' | 'Tamil' | 'Hindi' | 'Sinhala' | 'Malayalam' | 'Telugu' | 'Kannada' | 'Bengali' | 'Marathi' | 'Gujarati' | 'Punjabi' | 'Spanish' | 'French' | 'German' | 'Italian' | 'Japanese' | 'Korean' | 'Chinese' | 'Arabic' | 'Russian' | 'Portuguese' | 'Turkish' | 'Thai' | 'Vietnamese' | 'Indonesian' | 'Dutch' | 'Swedish' | 'Polish' | 'Greek' | 'Hebrew' | 'Persian';
export type Genre = 'Action' | 'Adventure' | 'Animation' | 'Biography' | 'Comedy' | 'Crime' | 'Documentary' | 'Drama' | 'Family' | 'Fantasy' | 'Film-Noir' | 'History' | 'Horror' | 'Music' | 'Musical' | 'Mystery' | 'Romance' | 'Sci-Fi' | 'Sport' | 'Superhero' | 'Thriller' | 'War' | 'Western';

export interface Movie {
  id: number;
  title: string;
  description: string;
  poster: string;
  rating: number;
  language: Language;
  genres: Genre[];
  releaseYear: number;
  duration: number; // in minutes
  director: string;
  cast: string[];
}

export interface MovieCategory {
  id: string;
  name: string;
  type: 'language' | 'genre';
  value: Language | Genre;
}

export interface FavoriteMovie {
  movieId: number;
  addedAt: string;
}
