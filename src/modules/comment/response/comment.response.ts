import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';
import FilmResponse from '../../film/response/film.response.js';

export default class CommentResponse {
  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose({ name: 'createdAt'})
  public date!: string;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose({ name: 'filmId'})
  @Type(() => FilmResponse)
  public film!: FilmResponse;
}
