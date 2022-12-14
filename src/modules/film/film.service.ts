import {inject, injectable} from 'inversify';
import {FilmServiceInterface} from './film-service.interface.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {FilmEntity} from './film.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import { FilmGenre } from '../../types/film-genre.enum.js';
import { DEFAULT_FILM_COUNT } from './film.constant.js';
import { SortType } from '../../types/sort-type.enum.js';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private  readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>
  ) {}

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New film created: ${dto.title}`);

    return result;
  }

  public async updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndDelete(filmId)
      .exec();
  }

  public async findFirst(): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findOne()
      .populate(['userId'])
      .exec();
  }

  public async find(genre?: FilmGenre, count?: number): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ?? DEFAULT_FILM_COUNT;

    return genre
      ? this.filmModel
        .find({genre: genre})
        .sort({createdAt: SortType.Down})
        .limit(limit)
        .populate(['userId'])
        .exec()
      : this.filmModel
        .find()
        .sort({createdAt: SortType.Down})
        .limit(limit)
        .populate(['userId'])
        .exec();
  }

  public async findById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findById(filmId)
      .populate(['userId'])
      .exec();
  }

  public async changeCommentsCount(filmId: string, rating: number): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, {'$inc': {
        commentCount: 1,
        ratingSum: rating
      }}).exec();
  }

  public async changeRating(filmId: string, rating: number): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(filmId, {'$set': {
        rating: rating
      }}).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.filmModel
      .exists({_id: documentId})) !== null;
  }

  public async findToWatch(userId: string): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .find({usersToWatch: userId})
      .populate(['userId'])
      .exec();
  }

  public async updateByIdAddToWatch(filmId: string, userId: string): Promise<void> {
    this.filmModel
      .findByIdAndUpdate(filmId, {$addToSet: {usersToWatch: userId}}).exec();
  }

  public async updateByIdRemoveToWatch(filmId: string, userId: string): Promise<void> {
    this.filmModel
      .findByIdAndUpdate(filmId, {$pull: {usersToWatch: userId}}).exec();
  }

}
