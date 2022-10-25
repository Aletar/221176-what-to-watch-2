import {DocumentType} from '@typegoose/typegoose';
import {FilmEntity} from './film.entity.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import { FilmGenre } from '../../types/film-genre.enum.js';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';

export interface FilmServiceInterface extends DocumentExistsInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null>;
  deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  find(): Promise<DocumentType<FilmEntity>[]>;
  findByGenre(genre: FilmGenre): Promise<DocumentType<FilmEntity>[]>;
  findById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  incCommentCount(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  updateRating(filmId: string, rating: number): Promise<DocumentType<FilmEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
