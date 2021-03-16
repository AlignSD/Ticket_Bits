var mongoose = require("mongoose");
const db = require("../models")

module.exports = {
    // 'api/books' GET
    findAll(req, res) {
        db.userSaved.find({})
            // .sort({ date: -1 })
            .then(tickbitdb => res.json(tickbitdb))
            .catch(err => res.status(422).json(err));
    },

    // 'api/books' POST
    saveFavorite(req, res) {
        db.userSaved.create(req.body)
            .then(tickbitdb => res.json(tickbitdb))
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    },

    // 'api/books/:id' DELETE
    deleteFavorite(req, res) {
        db.userSaved.findById(req.params.id)
            .then(tickbitdb => dUsers.remove())
            .then(tickbitdb => res.json(tickbitdb))
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    }
};