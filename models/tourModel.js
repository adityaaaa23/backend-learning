const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: Number,
  price: {
    type: Number,
    required: true,
    default: 1000,
  },
});

const tour = mongoose.model('Tour', tourSchema);

module.exports = tour;
