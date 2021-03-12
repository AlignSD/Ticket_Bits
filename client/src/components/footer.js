import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';


const Footer = () => (
  <footer className="bg-dark p-3 text-center">
    <div className="logo" />
    <p>
      Sample project provided by{" "}
      <a target="_blank" rel="noopener noreferrer" href="https://auth0.com">
        Auth0
      </a>
    </p>
  </footer>
);


export default Footer;
