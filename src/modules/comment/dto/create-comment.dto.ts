import {IsMongoId, IsString, Length, IsInt, Max, Min} from 'class-validator';

export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(5, 1024, {message: 'Min length is 5, max is 1024'})
  public text!: string;

  @IsInt({message: 'Price must be an integer'})
  @Min(1, {message: 'Minimum price is 1'})
  @Max(10, {message: 'Maximum price is 10'})
  public rating!: number;

  public userId!: string;

  @IsMongoId({message: 'filmId field must be a valid id'})
  public filmId!: string;
}
