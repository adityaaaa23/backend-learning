const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'we should know the duration of thr trip'],
  },
  maxGroupSize: {
    type: Number,
    required: [
      true,
      'number of people who can take part in the tour simontnously',
    ],
  },
  difficulty: {
    type: String,
    required: [true, 'how difficult is the treak'],
  },
  ratingAverage: {
    type: Number,
    default: 3.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 1000,
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'Summery is essential'],
  },
  discption: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'image is also required'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: [Date],
});

const tour = mongoose.model('Tour', tourSchema);

module.exports = tour;
