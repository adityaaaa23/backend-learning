const { log } = require('console');
const fs = require('fs');

const mongoose = require('mongoose');

const Tour = require('./../models/tourModel');

{
  // exports.checkID = (req, res, next, val) => {
  //   console.log(`the id id ${val}`);
  //   const id = req.params.id * 1;
  //   // if (id > tours.length) {
  //   //   return res.status(404).json({
  //   //     status: 'fail',
  //   //     message: 'chore bawalaa ho rhe hii kei',
  //   //   });
  //   // }
  //   next();
  // };
} //ye sbb mongoose khud hi krr lega
exports.alias = (req, res, next) => {
  ((req.query.limit = '5'),
    (req.query.sort = '-price'),
    (req.query.fields = 'name,price,ratingAverage'));
  next();
};
exports.getAllTour = async (req, res) => {
  try {
    console.log(req.query);
    //filtering

    const queryObj = { ...req.query };
    const excludeObj = ['page', 'sort', 'limit', 'fields'];
    excludeObj.forEach((ele) => delete queryObj[ele]);

    console.log(excludeObj);
    console.log(queryObj);
    // Advanced Filtering
    // {difficulty: 'eazy' , duration: {$gte:5}}
    // {difficulty: 'eazy' , duration: { gte:5}}
    // Postman sends queries like:
    // ?duration[gte]=5&price[lt]=1000
    //
    // Express converts them into:
    // {
    //   duration: { gte: '5' },
    //   price: { lt: '1000' }
    // }
    //
    // But MongoDB only understands operators prefixed with '$':
    // {
    //   duration: { $gte: '5' },
    //   price: { $lt: '1000' }
    // }
    //
    // So:
    // 1. Convert the query object into a string using JSON.stringify().
    // 2. Replace gte, gt, lte, lt with $gte, $gt, $lte, $lt using regex.
    // 3. Convert the string back into an object using JSON.parse().
    // 4. Pass the parsed object to Tour.find() so MongoDB can execute the comparison operators.

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    //Sorting

    let query = Tour.find(JSON.parse(queryStr)); //building the query

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //feildSelction
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //pagination page=3&limit=10
    // ! PAGINATION
    //
    // URL:
    // ?page=3&limit=10
    //
    // Express receives:
    // page = "3"
    // limit = "10"
    //
    // Convert them to numbers:
    //
    // page = req.query.page * 1 || 1;
    // limit = req.query.limit * 1 || 100;
    //
    // Calculate how many documents to skip:
    //
    // skip = (page - 1) * limit;
    //
    // Page 1 -> skip 0
    // Page 2 -> skip 10
    // Page 3 -> skip 20
    //
    // skip() ignores the first 'skip' documents.
    // limit() returns only 'limit' documents.

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const tours = await query; // executing the query

    res.status(200).json({
      //sending  the response
      status: 'sucess',
      reults: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tours = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'sucessfull',
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'unsucessFull',
    });
  }
};

exports.patchTour = async (req, res) => {
  try {
    const newTour = await tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'sucess',
      data: {
        newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const newTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'sucessfull',
      data: null,
      message: 'deleted',
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'aya hoga kuch error',
      error: err,
    });
  }
};

exports.postTour = async (req, res) => {
  try {
    console.log(req.body);

    const newTour = await Tour.create(req.body);
    console.log(newTour);
    res.status(201).json({
      status: 'sucessfull',
      message: 'tour created sucessFully',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'unscessfull',
      message: err,
    });
  }
};
