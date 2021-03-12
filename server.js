const express = require("express");
const cors = require('cors')

const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const { auth } = require('express-openid-connect');
const apiPort = 3000

const db = require('./db')
const routes = require("./server/routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Auth0 information
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'de261f24e9a40705f9d4fcfe15f59e640d012a292931f0092a50d6b76dbfed83',
  baseURL: 'http://localhost:3000',
  clientID: 'tMW0fzqF5wOPQsGQE2g7wlM3PTzzaKbg',
  issuerBaseURL: 'https://ucsdproject3.us.auth0.com'
};
// routes for backend database
app.use(routes);
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
