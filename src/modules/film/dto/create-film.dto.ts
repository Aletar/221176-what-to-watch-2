import { FilmGenre } from '../../../types/film-genre.enum';

export default class CreateFilmDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public year!: number;
  public genre!: FilmGenre;
  public rating!: number;
  public videoPreview!: string;
  public starring!: string[];
  public director!: string;
  public runTime!: number;
  public commentsCount!: number;
  public posterImage!: string;
  public backgroundImage!: string;
  public backgroundColor!: string;
  public userId!: string;
}
