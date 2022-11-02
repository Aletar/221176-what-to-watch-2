import { FilmGenre } from '../../../types/film-genre.enum.js';
import {IsArray, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength} from 'class-validator';

export default class UpdateFilmDto {

  @MinLength(2, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsInt({message: 'Year must be an integer'})
  @Min(1890, {message: 'Minimum year is 1890'})
  @Max(2100, {message: 'Maximum year is 2100'})
  public year!: number;

  @IsEnum(FilmGenre, {message: 'type must be valid genre'})
  public genre!: FilmGenre;

  @MaxLength(256, {message: 'Too short for field videoPreview'})
  public videoPreview!: string;

  @MaxLength(256, {message: 'Too short for field videoPreview'})
  public video!: string;

  @IsArray({message: 'Field starring must be an array'})
  public starring!: string[];

  public director!: string;

  @IsInt({message: 'runTime must be an integer'})
  @Min(1, {message: 'Minimum runTime is 1'})
  @Max(500, {message: 'Maximum runTime is 500'})
  public runTime!: number;

  @MaxLength(256, {message: 'Too short for field posterImage'})
  public posterImage!: string;

  @MaxLength(256, {message: 'Too short for field backgroundImage'})
  public backgroundImage!: string;

  public backgroundColor!: string;

  @IsMongoId({message: 'userId field must be valid an id'})
  public userId!: string;
}
