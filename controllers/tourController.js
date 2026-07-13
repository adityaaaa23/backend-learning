const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);


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
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',

      message: 'chore bawalaa ho rhe hii kei',
    });
  }
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
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'sucess',
        data: {
          tours: newTour,
        },
      });
    },
  );

  res.end('done');
};
