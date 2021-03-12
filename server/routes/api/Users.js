const router = require("express").Router();
const userController = require("../../server/controllers/userController");

// get favorites and save favorite
router.route('/')
    .get(userController.findAll)
    .post(userController.saveFavorite);

// api/book/:id route
router.route('/:id')
    .delete(userController.deleteFavorite);

module.exports = router;