const dotenv = require('dotenv');

const fs = require('fs');

const result = dotenv.config({
  path: `${__dirname}/../../config.env`,
  debug: true,
});

const mongoose = require('mongoose');

const Tour = require('./../../models/tourModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  })
  .then((con) => {
    console.log('connected sucessfully');
  });
//reading the file from tours-sample-json

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

//writing the data in database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data copied sucessfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete all collections

const deleteAllData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data deleted sucessfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
}
if (process.argv[2] === '--delete') {
  deleteAllData();
}
