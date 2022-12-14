import {inject, injectable} from 'inversify';
import {CommentServiceInterface} from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {SortType} from '../../types/sort-type.enum.js';
import {DEFAULT_COMMENT_COUNT} from './comment.constant.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private  readonly logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${dto.text}`);

    return result;
  }

  public async findById(commentId: string): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel
      .findById(commentId)
      .populate(['userId', 'filmId'])
      .exec();
  }

  public async findByFilmId(filmId: string): Promise<DocumentType<CommentEntity>[] | null> {
    return this.commentModel
      .find({films: filmId})
      .sort({createdAt: SortType.Down})
      .limit(DEFAULT_COMMENT_COUNT)
      .populate(['userId', 'filmId'])
      .exec();
  }

  public async deleteByFilmId(filmId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({filmId})
      .exec();

    return result.deletedCount;
  }

}
