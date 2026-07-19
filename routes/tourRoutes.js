const express = require('express');

const tourController = require('../controllers/tourController');

const router = express.Router();

// console.log(tourController);
// console.log('postTour =', tourController.postTour);
// router.param('id',tourController.checkID);

//Remove check body as mongoose will do it on its own...
router
  .route('/top-5-cheap')
  .get(tourController.alias, tourController.getAllTour);

router
  .route('/:id')
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour)
  .get(tourController.getTour);
router.route('/').post(tourController.postTour).get(tourController.getAllTour);

module.exports = router;
