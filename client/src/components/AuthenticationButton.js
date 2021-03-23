import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

/* Changes button components depending on the user being logged in or out
   so that we dont need two buttons taking up space on navbar */
   
function AuthenticationButton(props) {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LogoutButton purchaseTicket={props.purchaseTicket} /> : <LoginButton />;
};

export default AuthenticationButton;