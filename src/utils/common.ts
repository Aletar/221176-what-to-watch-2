import * as jose from 'jose';
import crypto from 'crypto';
import {plainToInstance} from 'class-transformer';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';
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

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
