import React, { Component } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button'

const Navbar = () => {
    const { logout } = useAuth0();
    return (
        <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ticket Bits
          </a>
          <Button href="#" variant="contained" color="primary">
      <a onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </a>
      </Button>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              {/* <small className="text-white"><span id="account">{this.props.account}</span></small> */}
            </li>
          </ul>
        </nav>
        </div>
    )
    
  
};

export default Navbar;