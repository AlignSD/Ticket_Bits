const mongoose = require("mongoose"); 
const Schema =  mongoose.Schema; 

const userSchema = new Schema({
    name: {type: String , required: true},
    email: {type: String, required: false}, 
    accountNumber: {type: String, required: false},
    ticketsOwned: {type: String, required: false},
    thumbnail: {type:String , required: false}
}); 

const userSaved = mongoose.model("userSaved", userSchema); 

module.exports = userSaved; 