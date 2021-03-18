import {NavLink} from "react-router-dom";
import React from "react";
// import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
// import Popup from '../components/Popup'

// MainNav links are visible to all users

function MainNav(props){
  console.log(props)

  return(
  <div className="navbar-nav mr-auto">
    <NavLink
      to="/"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Home
    </NavLink>
    <NavLink
      to="/coinbaseAPI"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      CoinbaseAPI
    </NavLink> 
    <NavLink
      to="/profile"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Profile
    </NavLink>
    <NavLink
      to="/TicketMarketPlace"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Ticket Marketplace
    </NavLink>
    <NavLink
      to="/CreateEvent"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Create Event
    </NavLink>
    <NavLink
      to="/Checkout"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      CheckOut
    </NavLink>
  </div>
  )
};

export default MainNav;