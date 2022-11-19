require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
// const { login, createUser } = require('./controllers/users');
const helmet = require('helmet');
const routes = require('./routes/index');
// const { validateLogin, validateCreateUser } = require('./middlewares/validator');
const NotFound = require('./errors/notfound');
// const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO } = require('./utils/config');
const limiter = require('./utils/limiters');
const errorsHandler = require('./middlewares/errorsHandler');

// подключаемся к серверу mongo
mongoose
  .connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  });

const app = express();

app.use(requestLogger); // подключаем логгер запросов

app.use(cors());

app.use(limiter);

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/signin', validateLogin, login);
// app.post('/signup', validateCreateUser, createUser);

app.use(routes);

// app.use(routes);
app.use((req, res, next) => {
  next(new NotFound({ message: 'Запрашиваемый ресурс не найден' }));
});

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
