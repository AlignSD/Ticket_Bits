import React from 'react';
import ReactDOM  from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
// import App from "./App";
import Home from "./pages/Home"
import * as serviceWorker from './serviceWorker';
import "../src/pages/shanesStyle.css"

ReactDOM.render(
 
    
      <Home />,
      
    document.getElementById("root")
    
  );
  
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
