const express = require('express');

const userController = require('../controllers/userController')

const router = express.Router();

router
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);
router.route('/').get(userController.getAllUser).post(userController.newUser);

module.exports = router;

