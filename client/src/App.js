import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./components/Navbar";
import Loading from "./components/loading";
import Footer from "./components/footer";
// import NavBar from "./components/NavBar";
import TicketMarketPlace from './components/TicketMarketPlace';
import Home from "./views/home";
import Profile from "./views/profile";
import ExternalApi from "./views/external-api";
import ProtectedRoute from "./auth/protected-route";
import CoinbaseAPI from "./CoinbaseAPI";
import CreateEvent from "./pages/pages/CreateEvent"
// --- Post bootstrap -----

const App = () => {
  const { isLoading } = useAuth0();

  // const apiKey = '3bb54333680d7672149c11bb6d783ccfe95329ecf2f5a7df443e0d323ea3db25';


  // var request = require('request');
  // request('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR&api_key=3bb54333680d7672149c11bb6d783ccfe95329ecf2f5a7df443e0d323ea3db25' , function (error, response, body) {
  //   console.log('error:', error);
  //   console.log('statusCode:', response && response.statusCode); 
  //   console.log('body:', body);
  // });

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div id="app" style={{height: "100%"}} className="d-flex flex-column h-100">
      <NavBar />
      <div className="container flex-grow-1">
        <Switch>
        <Route path="/" exact component={Home} />
        <ProtectedRoute path="/coinbaseAPI" component={CoinbaseAPI} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/external-api" component={ExternalApi} />
          <ProtectedRoute exact path='/TicketMarketPlace' component={TicketMarketPlace}/>
        </Switch>
        <CreateEvent/>
        
      </div>
      <Footer />
    </div>
  );
};

export default App;