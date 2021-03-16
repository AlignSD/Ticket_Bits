import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';


const Footer = () => (
  <footer className="bg-dark p-3 text-center">
    <div className="logo" />
    <p>
      Ticket-Bits{" "}
      <a target="_blank" rel="noopener noreferrer" href="https://auth0.com">
        Link to some random place
      </a>
    </p>
  </footer>
);


export default Footer;
