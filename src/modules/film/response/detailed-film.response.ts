import {Expose, Type} from 'class-transformer';
import { FilmGenre } from '../../../types/film-genre.enum.js';
import UserResponse from '../../user/response/user.response.js';

export default class DetailedFilmResponse {

  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose({ name: 'createdAt'})
  public date!: string;

  @Expose()
  public genre!: FilmGenre;

  @Expose()
  public year!: number;

  @Expose()
  public videoPreview!: string;

  @Expose()
  public video!: string;

  @Expose()
  public starring!: string[];

  @Expose()
  public director!: string;

  @Expose()
  public runTime!: number;

  @Expose()
  public posterImage!: string;

  @Expose()
  public backgroundImage!: string;

  @Expose()
  public backgroundColor!: string;

  @Expose()
  public commentCount!: number;

  @Expose()
  public rating!: number;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;
}
