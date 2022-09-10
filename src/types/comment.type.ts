import { User } from './user.type.js';

export type Comment = {
  text: string,
  rating: number,
  date: Date,
  user: User
}
