require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const connectionDB = require('./utils/connectionDB');
const { limiter } = require('./middlewares/limiter');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/index');

const app = express();

const { PORT = 3000 } = process.env;

connectionDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors);
app.use(requestLogger);
app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
