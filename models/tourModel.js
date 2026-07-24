const mongoose = require('mongoose');
const slugify = require('slugify');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
    },
    slug: String,
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
    ratingsAverage: {
      type: Number,
      default: 3.5,
    },

    ratingsQuantity: {
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
    description: {
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
    startDates: [Date],
    secretTours: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);
tourSchema.virtual('durationWeeks').get(function () {
  //these are virtual proerties which can be derived from other properties rather than expilcity storing them bhut sense nai banata  prr inko queries me use nai krr skte
  return this.duration / 7;
});
//document middle ware runs before create cmnd and save smd
// tourSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });
// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();

  next();
});
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const tour = mongoose.model('Tour', tourSchema);

module.exports = tour;
