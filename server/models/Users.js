import mongoose from "mongoose";
const Schema =  mongoose.Schema; 

const userSchema = new Schema({
    name: {type: String , required: true},
    email: {type: String, required: false}, 
    accountNumber: {type: String, required: false},
    ticketsOwned: {type: String, required: false},
    thumbnail: {type:String , required: false},
    createdAt: {
        type: Date,
        default: new Date(),
    }
}); 

const userSaved = mongoose.model("userSaved", userSchema); 

export default userSaved; 