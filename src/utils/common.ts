import crypto from 'crypto';
import { FilmGenre } from '../types/film-genre.enum.js';
import { Film } from '../types/film.type.js';

export const createFilm = (row:string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, postDate,
    genre, year, rating, videoPreview,
    starring, director, runTime, commentsCount,
    posterImage, backgroundImage, backgroundColor,
    name, email, avatar, password] = tokens;

  return {
    title,
    description,
    postDate: new Date(postDate),
    genre: FilmGenre[genre as 'Comedy' | 'Crime' | 'Documentary' | 'Drama' | 'Horror' | 'Family' | 'Romance' | 'SciFi' | 'Thriller'],
    year: Number.parseInt(year, 10),
    rating: Number.parseInt(rating, 10),
    videoPreview,
    starring: starring.split(';').map((actorName) => actorName),
    director,
    runTime: Number.parseInt(runTime, 10),
    commentsCount: Number.parseInt(commentsCount, 10),
    posterImage,
    backgroundImage,
    backgroundColor,
    user: {name, email, avatar, password}
  } as Film;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
