
import React, {useState} from "react";

import MainNav from "./main-nav";
import AuthNav from "./auth-nav";

function NavBar(props){
 

  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-primary">
        <div className="container">
          <div className="navbar-brand logo" />
          <MainNav
          props={props} />
          <AuthNav />
        </div>
      </nav>
    </div>
  )};


export default NavBar;
