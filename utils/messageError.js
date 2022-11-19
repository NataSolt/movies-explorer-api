const SERVER_ERROR = 'На сервере произошла ошибка';

const UNAUTHORIZED = 'Необходимо авторизироваться';

const VALIDATION_ERROR = 'ValidationError';

const CAST_ERROR = 'CastError';

const SUCCESS = 'Успешно';

const USER_NOT_FOUND = 'Нет такого пользователя';

const MOVIE_NOT_FOUND = 'нет такого фильма';

const USER_CONFLICT_ERROR = 'Пользователь с таким email уже существует';

const USER_INVALID_DATA = 'Переданы некорректные данные при создании пользователя';

const USER_INVALID_UPDATEDATA = 'Переданы некорректные данные при обновлении пользователя';

const MOVIE_INVALID_DATA = 'Переданы некорректные данные при создании фильма';

const MOVIE_FORBIDDEN_DELETE = 'Нет прав для удаления фильма';

const INVALID_ID = 'Неерный id';

module.exports = {
  USER_NOT_FOUND,
  MOVIE_NOT_FOUND,
  USER_CONFLICT_ERROR,
  USER_INVALID_DATA,
  MOVIE_INVALID_DATA,
  MOVIE_FORBIDDEN_DELETE,
  USER_INVALID_UPDATEDATA,
  INVALID_ID,
  UNAUTHORIZED,
  SERVER_ERROR,
  VALIDATION_ERROR,
  CAST_ERROR,
  SUCCESS,
};
