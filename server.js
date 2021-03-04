const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const { auth } = require('express-openid-connect');

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'de261f24e9a40705f9d4fcfe15f59e640d012a292931f0092a50d6b76dbfed83',
  baseURL: 'http://localhost:3000',
  clientID: 'tMW0fzqF5wOPQsGQE2g7wlM3PTzzaKbg',
  issuerBaseURL: 'https://ucsdproject3.us.auth0.com'
};

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

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
