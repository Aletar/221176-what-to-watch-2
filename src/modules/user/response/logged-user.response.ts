import {Expose} from 'class-transformer';

export default class LoggedUserResponse {

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;
}