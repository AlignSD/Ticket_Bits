import withRoot from './modules/withRoot';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import Login from './login';
import TicketMarketPlace from '../components/TicketMarketPlace';
import { Auth0Provider } from "@auth0/auth0-react";
// --- Post bootstrap -----
import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import AppAppBar from './modules/views/AppAppBar';



function Index() {
  return (
    <Auth0Provider
      domain={"ucsdproject3.us.auth0.com"}
      clientId="bMbAEFLsufycv3Y5PEsflHkcsutmwQ2b"
      redirectUri="http://localhost:3000/TicketMarketPlace">
      
    <React.Fragment>
      <Router>
      <AppAppBar />
      <Switch>
        <Route exact path='/SignUp' component={SignUp}></Route>
        <Route exact path='/SignIn' component={SignIn}></Route>
        <Route exact path='/Terms' component={Terms}></Route>
        <Route exact path='/Privacy' component={Privacy}></Route>
        <Route exact path='/TicketMarketPlace' component={TicketMarketPlace}></Route>
      <ProductHero />
      <ProductValues />
      </Switch>
      <AppFooter />
      </Router>
    </React.Fragment>
    </Auth0Provider>
    
  );
}

export default withRoot(Index);