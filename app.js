require('dotenv').config();
<<<<<<< Updated upstream
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
=======
const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
>>>>>>> Stashed changes
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/index');
<<<<<<< Updated upstream
const { DB_URL } = require('./utils/constants');
=======
>>>>>>> Stashed changes

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();

<<<<<<< Updated upstream
const { PORT = 3000, NODE_ENV, DB_URL } = process.env;
mongoose.connect(NODE_ENV === 'production' ? DB_PATH : DB_URL);

const allowedCors = [
  'https://elviram.movies-explorer.nomoredomains.work',
  'http://elviram.movies-explorer.nomoredomains.work',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', 'true');
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
=======
const { PORT = 3000 } = process.env;

const cors = require('./middlewares/cors');

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
>>>>>>> Stashed changes
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.use(routes);

app.use(errorLogger);

<<<<<<< Updated upstream
app.use(errorHandler);

app.listen(PORT);
=======
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
>>>>>>> Stashed changes
