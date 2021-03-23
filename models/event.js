const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    eventName: {
        type: String,
        required: false
    },
    eventStarts: {
        type: Date,
        required: false
    },
    eventEnds: {
        type: Date,
        required: false
    },
    ticketAmount: {
        type: Number,
        required: false
    },
    ticketPrice: {
        type: Number,
        required: false
    },
    summary: {
        type: String,
        required: false
    },
    venueName: {
        type: String,
        required: false
    },
    organizer: {
        type: String,
        required: false
    },
    eventType: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
})
 module.exports = mongoose.model("Event", userSchema, "events")