import React from "react";
import AuthenticationButton from "./AuthenticationButton";

// AuthNav links should be only visible to logged in members

function AuthNav(props) {
  return(
  <div className="navbar-nav ml-auto">
    <AuthenticationButton purchaseTicket={props.purchaseTicket}  />
            
  </div>
  )
};

export default AuthNav;