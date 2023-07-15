<<<<<<< Updated upstream
const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
=======
const winston = require("winston");
const expressWinston = require("express-winston");

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log" })],
>>>>>>> Stashed changes
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
<<<<<<< Updated upstream
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
=======
  transports: [new winston.transports.File({ filename: "error.log" })],
>>>>>>> Stashed changes
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
