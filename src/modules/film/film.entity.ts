import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import { FilmGenre } from '../../types/film-genre.enum.js';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface FilmEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'films'
  }
})

export class FilmEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop({
    type: () => String,
    enum: FilmGenre
  })
  public genre!: FilmGenre;

  @prop()
  public year!: number;

  @prop()
  public rating!: number;

  @prop()
  public videoPreview!: string;

  @prop({
    required: true,
    default: [],
  })
  public starring!: string[];

  @prop()
  public director!: string;

  @prop()
  public runTime!: number;

  @prop({default: 0})
  public commentsCount!: number;

  @prop()
  public posterImage!: string;

  @prop()
  public backgroundImage!: string;

  @prop()
  public backgroundColor!: string;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const FilmModel = getModelForClass(FilmEntity);
