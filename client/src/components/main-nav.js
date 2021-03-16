import {NavLink} from "react-router-dom";
import React from "react";

// MainNav links are visible to all users

const MainNav = () => (
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
  </div>
);

export default MainNav;