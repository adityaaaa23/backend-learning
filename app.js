const { log } = require('console');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log('hello form the middle ware');
  next();
});
app.use(morgan('dev'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);

  next();
});
// mounting the routes
app.use('/api/V1/tours/', tourRouter);
app.use('/api/V1/users/', userRouter);

module.exports = app;