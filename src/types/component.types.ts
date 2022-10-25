export const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  UserController: Symbol.for('UserController'),
  FilmServiceInterface: Symbol.for('FilmServiceInterface'),
  FilmModel: Symbol.for('FilmModel'),
  FilmController: Symbol.for('FilmController'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),
  CommentController: Symbol.for('CommentController'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface')
} as const;
