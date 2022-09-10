import { readFileSync } from 'fs';
import { FilmGenre } from '../../types/film-genre.enum.js';
import { Film } from '../../types/film.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Film[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, postDate, genre, year, rating, videoPreview, starring, director, runTime, commentsCount, posterImage, backgroundImage, backgroundColor, name, email, avatar, password]) => ({
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
      }));
  }
}
