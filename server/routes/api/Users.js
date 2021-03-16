const router = require("express").Router();
const userController = require("../../controllers/userController");

// get favorites and save favorite
router.route('/')
    .get(userController.findAll)
    .post(userController.saveFavorite);

// api/book/:id route
router.route('/:id')
    .delete(userController.deleteFavorite);

module.exports = router;