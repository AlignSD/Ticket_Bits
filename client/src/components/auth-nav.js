import React from "react";
import AuthenticationButton from "./AuthenticationButton";

// AuthNav links should be only visible to logged in members

const AuthNav = () => (
  <div className="navbar-nav ml-auto">
    <AuthenticationButton />
            
  </div>
);

export default AuthNav;