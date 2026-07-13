const express = require('express');

const tourController = require('../controllers/tourController')

const router = express.Router();

router.param('id',tourController.checkID);

router
  .route('/:id')
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour)
  .get(tourController.getTour);
router.route('/').post(tourController.postTour).get(tourController.getAllTour);

module.exports = router;