const express = require('express');
const router = express.Router()

const Event = require('../models/Event');

router.get('/', (req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => console.log(err))
})
router.post('/', (req, res) => {
    const { eventName, eventStarts, eventEnds, ticketAmount, ticketPrice, summary, venueName, organizer, eventType, category} = req.body;
    const newEvent = new Event({
        _id : req.body.id,
        eventName: req.body.eventName,
        eventStarts: req.body.eventStarts,
        eventEnds: req.body.eventEnds,
        ticketAmount: req.body.ticketAmount,
        ticketPrice: req.body.ticketPrice,
        summary: req.body.summary,
        venueName: req.body.venueName,
        organizer: req.body.organizer,
        eventType: req.body.eventType,
        category: req.body.category,
    })
    console.log(newEvent, "newEvent")
    newEvent.save()
        .then(() => res.json({
            message: "Created event successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating event"
        }))
})
module.exports = router 