const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { errorHandler } = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const limiter = require('./utils/limiter');
const router = require('./routes/index');
const config = require('./config');

const app = express();

mongoose
  .connect(
    config.basePath,
    { useNewUrlParser: true },
  )
  .then(() => console.log(`Connected to DB: ${config.basePath}`)) // eslint-disable-line no-console
  .catch((err) => console.log(err)); // eslint-disable-line no-console

app.use(cors);
app.use(helmet());
// app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`); // eslint-disable-line no-console
});
