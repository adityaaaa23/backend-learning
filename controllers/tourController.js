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

exports.getAllTour = async (req, res) => {
  try {
    console.log(req.query);
    // const tours = await Tour.find({
    //   // duration: 5,   hard coded the queery
    //   // difficulty: 'easy',
    // });
    const queryObj = { ...req.query };

    const excludeObj = ['page', 'sort', 'limit', 'feilds'];

    excludeObj.forEach((ele) => delete queryObj[ele]);

    console.log(excludeObj);
    console.log(queryObj);

    const query = Tour.find(queryObj); //building the query
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
    res.status(200).json({
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
