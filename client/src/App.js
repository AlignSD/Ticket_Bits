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
// --- Post bootstrap -----

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div id="app" style={{height: "100%"}} className="d-flex flex-column h-100">
      <NavBar />
      <div className="container flex-grow-1">
        <Switch>
        <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/external-api" component={ExternalApi} />
          <ProtectedRoute exact path='/TicketMarketPlace' component={TicketMarketPlace}/>
        </Switch>
        
      </div>
      <Footer />
    </div>
  );
};

export default App;