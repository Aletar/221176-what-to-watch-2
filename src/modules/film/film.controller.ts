import {Request, Response} from 'express';
import * as core from 'express-serve-static-core';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {FilmServiceInterface} from './film-service.interface.js';
import FilmResponse from './response/film.response.js';
import DetailedFilmResponse from './response/detailed-film.response.js';
import {fillDTO} from '../../utils/common.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import CommentResponse from '../comment/response/comment.response.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import CreateCommentDto from '../comment/dto/create-comment.dto.js';

type ParamsFilm = {
  filmId: string;
  status?: number
}

@injectable()
export default class FilmController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface
  ) {
    super(logger, configService);

    this.logger.info('Register routes for FilmController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateFilmDto)
      ]
    });

    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Put,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new ValidateDtoMiddleware(UpdateFilmDto),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });

    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });

    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Get,
      handler: this.getDetailed,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });

    this.addRoute({
      path: '/promo',
      method: HttpMethod.Get,
      handler: this.getPromo
    });

    this.addRoute({
      path: '/favourites',
      method: HttpMethod.Get,
      handler: this.getFavourites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });

    this.addRoute({
      path: '/:filmId/:toWatch',
      method: HttpMethod.Post,
      handler: this.setFavouritesStatus,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });

    this.addRoute({
      path: '/:filmId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });

    this.addRoute({
      path: '/:filmId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId'),
      ]
    });

  }

  public async index(_req: Request, res: Response): Promise<void> {
    const films = await this.filmService.find();
    this.ok(res, fillDTO(FilmResponse, films));
  }

  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response
  ): Promise<void> {

    const {body, user} = req;
    const result = await this.filmService.create({...body, userId: user.id});
    const film = await this.filmService.findById(result.id);
    this.created(res, fillDTO(FilmResponse, film));
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsFilm, Record<string, unknown>, UpdateFilmDto>,
    res: Response
  ): Promise<void> {
    const updatedFilm = await this.filmService.updateById(params.filmId, body);
    this.ok(res, fillDTO(FilmResponse, updatedFilm));
  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsFilm>,
    res: Response
  ): Promise<void> {
    const film = await this.filmService.deleteById(params.filmId);
    await this.commentService.deleteByFilmId(params.filmId);
    this.noContent(res, film);
  }

  public async getDetailed(
    {params}: Request<core.ParamsDictionary | ParamsFilm>,
    res: Response
  ): Promise<void> {
    const film = await this.filmService.findById(params.filmId);
    this.ok(res, fillDTO(DetailedFilmResponse, film));
  }

  public async getPromo(_req: Request, res: Response): Promise<void> {
    const film = await this.filmService.findFirst();
    this.ok(res, fillDTO(DetailedFilmResponse, film));
  }

  public async getFavourites(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response
  ): Promise<void> {

    const {user} = req;
    const films = await this.filmService.findToWatch(user.id);
    this.ok(res, fillDTO(FilmResponse, films));
  }

  public async setFavouritesStatus(
    {params, user}: Request<core.ParamsDictionary | ParamsFilm, Record<string, unknown>>,
    res: Response
  ): Promise<void> {

    if (params.status === 0) {
      await this.filmService.updateByIdRemoveToWatch(params.filmId, user.id);
    } else {
      await this.filmService.updateByIdAddToWatch(params.filmId, user.id);
    }

    this.noContent(res, {});
  }

  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsFilm, object, object>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByFilmId(params.filmId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }

  public async createComment(
    req: Request<core.ParamsDictionary | ParamsFilm, object, CreateCommentDto>,
    res: Response
  ): Promise<void> {

    const {params, body, user} = req;

    const comment = await this.commentService.create({...body, filmId: params.filmId, userId: user.id});
    const film = await this.filmService.changeCommentsCount(params.filmId, body.rating);
    if (film !== null) {
      await this.filmService.changeRating(params.filmId, film.ratingSum / film.commentCount);
    }
    this.created(res, fillDTO(CommentResponse, comment));
  }

}
