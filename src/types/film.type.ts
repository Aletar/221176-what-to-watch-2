import { FilmGenre } from './film-genre.enum.js';
import { User } from './user.type.js';

export type Film = {
  title: string;
  description: string;
  postDate: Date;
  genre: FilmGenre;
  year: number;
  rating: number;
  videoPreview: string;
  video: string;
  starring: string[];
  director: string;
  runTime: number;
  commentsCount: number;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  user: User;
}
