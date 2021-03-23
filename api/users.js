const express = require('express');
const router = express.Router()

const User = require('../models/user');

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => console.log(err))
})
router.post('/', (req, res) => {
    console.log(req.body, "req");
    const { username, email, firstName, lastName } = req.body;
    const newUser = new User({
        _id : req.body.id,
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName
       

    })
    
    newUser.save()
        .then(() => res.json({
            message: "Created account successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating account"
        }))
        console.log(newUser, "newUser")
})
    router.put('/:id', (req, res) => {
        console.log(req.params, "res")
        User.findByIdAndUpdate(req.params.id,
            {
                _id : req.body.id,
                userName: req.body.userName,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            },  
            function(err, response){
                    if (err) {
             res.send(err);
            } else {
                console.log(response);
                console.log('user updated!');
                res.redirect('/profile');
                                }
            });
});
    
module.exports = router 