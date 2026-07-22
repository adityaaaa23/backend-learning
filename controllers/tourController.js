const { log } = require('console');
const fs = require('fs');

const APIfeatures = require('./../utils/apiFeatures');

const mongoose = require('mongoose');

const Tour = require('./../models/tourModel');
const { runInNewContext } = require('vm');

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

    const feature = new APIfeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFeild()
      .pagination();
    const tours = await feature.query; // executing the query

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
    const newTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
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
exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingAverage: { $gte: 3.0 } },
      },
      {
        $group: {
          _id: '$difficulty',
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingQuantity' },
          avgRatings: { $avg: '$ratingAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);
    res.status(200).json({
      status: 'all well',
      stat: {
        stats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'unscessfull',
      message: err,
    });
  }
};
exports.getMonthlyPlan = async (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({
      result: 'faliure',
      message: err,
    });
  }
};
