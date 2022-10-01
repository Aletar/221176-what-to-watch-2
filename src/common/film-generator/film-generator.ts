import dayjs from 'dayjs';
import rgbHex from 'rgb-hex';
import { MockData } from '../../types/mock-data.type.js';
import { FilmGenre } from '../../types/film-genre.enum.js';
import { FilmGeneratorInterface } from './film-generator.interface.js';
import { random, draw, sum, uid } from 'radash';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class FilmGenerator implements FilmGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = draw(this.mockData.titles);
    const description = draw(this.mockData.descriptions);
    const postDate = dayjs().subtract(random(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const genre = draw([
      FilmGenre.Comedy,
      FilmGenre.Crime,
      FilmGenre.Documentary,
      FilmGenre.Drama,
      FilmGenre.Family,
      FilmGenre.Horror,
      FilmGenre.Romance,
      FilmGenre.SciFi,
      FilmGenre.Thriller,
    ]);
    const year = random(1990, 2022);

    const commentsCount = random(0, 10);
    const ratingScores = [];
    for (let i = 0; i < commentsCount; i++) {
      ratingScores.push(random(1, 10));
    }
    const rating = parseFloat((sum(ratingScores) / commentsCount).toFixed(1));
    const videoPreview = draw(this.mockData.videoPreviews);

    const starringArray = [];
    for (let i = 0; i < random(1, 10); i++) {
      starringArray.push(`${draw(this.mockData.names)} ${draw(this.mockData.lastNames)}`);
    }
    const starring = starringArray.join(', ');

    const director = `${draw(this.mockData.names)} ${draw(this.mockData.lastNames)}`;
    const runTime = random(30, 300);
    const posterImage = draw(this.mockData.posterImages);
    const backgroundImage = `${uid(random(3, 20))}.jpg`;
    const backgroundColor = `#${rgbHex(random(0, 255), random(0, 255), random(0, 255))}`;
    const name = `${draw(this.mockData.names)} ${draw(this.mockData.lastNames)}`;
    const email = draw(this.mockData.emails);
    const avatar = draw(this.mockData.avatars);

    return [
      title, description, postDate, genre, year,
      rating, videoPreview, starring, director,
      runTime, commentsCount, posterImage,
      backgroundImage, backgroundColor,
      name, email, avatar
    ].join('\t');
  }
}
