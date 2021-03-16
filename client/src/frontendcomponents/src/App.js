import React from 'react';
// import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
// import Card from "./components/Card";
import Grid from "./components/Grid";
import Footer from "./components/Footer";
import CreateEvent from "./pages/CreateEvent";
import UserProfile from "./pages/UserProfile";
import EventDetails from "./pages/EventDetails";
// import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <Grid />
      <CreateEvent />
      <UserProfile />
      <EventDetails />
      <Footer />
    </div>
  );
}

export default App;
