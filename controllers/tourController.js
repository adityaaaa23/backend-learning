const { log } = require('console');
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.checkBody = (req, res, next) => {
  console.log('check body called');

  if (req.body.name != null || req.body.price != null) {
    console.log(`yaah it constains ${req.body.name} and ${req.body.price}`);
  } else {
    return res.status(200).json({
      message: 'aree yaar dekno naam ya price nai hoga',
      status: 'fail ',
    });
  }
  next();
};

exports.checkID = (req, res, next, val) => {
  console.log(`the id id ${val}`);
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',

      message: 'chore bawalaa ho rhe hii kei',
    });
  }
  next();
};

exports.getAllTour = (req, res) => {
  const tour = tours;
  return res.status(200).json({
    status: 'sucess',
    tour,
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'sucess',
    time: req.requestTime,
    tours: tour,
  });
};

exports.patchTour = (req, res) => {
  if (req.params.id > tours.length) {
    res.status(404).json({
      status: 'not found',
      messgae: 'areee',
    });
  }
  res.status(200).json({
    status: 'sucess',
    data: {
      tour: 'updataed babyyy',
    },
  });
};

exports.deleteTour = (req, res) => {
  if (req.params.id > tours.length) {
    res.status(404).json({
      status: 'notfound',
      message: 'sahi se dalo bade bhaiij',
    });
  }
  res.status(204).json({
    status: 'deleted',
    data: null,
  });
};

exports.postTour = (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // res.status(201).json({
      //   status: 'sucess',
      //   data: {
      //     tours: newTour,
      //   },
      // });
    },
  );

  res.end('done');
};
