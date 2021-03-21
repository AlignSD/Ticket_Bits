import React from 'react';
import ReactDOM  from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
// import App from "./App";
import App from "./App"
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import TicketsContextProvider from './utils/TicketsContext'
import LandingPage from "./views/landingpage"
import {Route, Switch} from "react-router-dom"
ReactDOM.render(
    <Router>
      <Auth0ProviderWithHistory>
      <TicketsContextProvider>
      <Switch>
      <Route exact path="/"><LandingPage/></Route>
      <Route exact path="/home"><App/></Route>
      <App/>
    </Switch>
      </TicketsContextProvider>
      </Auth0ProviderWithHistory>
      </Router>,
    document.getElementById("root")
    
  );
  
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
