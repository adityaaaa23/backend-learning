const { log } = require('console');
const fs = require('fs');

const mongoose = require('mongoose');

const Tour = require('./../models/tourModel');
const tour = require('./../models/tourModel');
//Tanking data form
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

exports.checkID = (req, res, next, val) => {
  console.log(`the id id ${val}`);
  const id = req.params.id * 1;
  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',

  //     message: 'chore bawalaa ho rhe hii kei',
  //   });
  // }
  next();
};

exports.getAllTour = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'sucess',
      retults: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(200).json({
      status: 'failed',
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tours = await tour.findById(req.params.id);
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

exports.deleteTour = (req, res) => {
  // if (req.params.id > tours.length) {
  //   res.status(404).json({
  //     status: 'notfound',
  //     message: 'sahi se dalo bade bhaiij',
  //   });
  // }
  res.status(204).json({
    status: 'deleted',
    data: null,
  });
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
