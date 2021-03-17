import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import mongoose from 'mongoose';
import postRoutes from "./routes/posts.js";
const app = express();
const PORT = process.env.PORT || 5000;


// Add routes, both API and view
app.use('/posts', postRoutes);
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
// Start the API server
  .then(() => app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}  !`);}))
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);




