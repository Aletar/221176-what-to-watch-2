import {Expose, Type} from 'class-transformer';
import { FilmGenre } from '../../../types/film-genre.enum.js';
import UserResponse from '../../user/response/user.response.js';

export default class FilmResponse {

  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose({ name: 'createdAt'})
  public date!: string;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public commentCount!: number;

  @Expose()
  public genre!: FilmGenre;

  @Expose()
  public posterImage!: string;

  @Expose()
  public videoPreview!: string;
}
