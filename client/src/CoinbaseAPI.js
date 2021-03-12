import React, { useState, useEffect, useRef } from "react";
import Dashboard from "./components/dashboard"

const CoinbasePro = require('coinbase-pro');
const publicClient = new CoinbasePro.PublicClient();


export default function CoinbaseAPI () {
    // let result;
    // publicClient.getProducts((error, response, data) => {
    //     if (error) {
    //       // handle the error
    //       console.log("You're a ticker")
    //     } else {
    //       // work with data
    //     //   publicClient.getProductTicker('ETH-USD', result);
    //       console.log(response);
    //       console.log(data);
    //     }
    //   });
    var result = "";
      publicClient.getProductTicker(
        'ETH-USD',
        (error, response, data, result) => {
          if (error) {
            console.log("You're a ticker")
        }
        else {
            console.log(response)
            console.log(data)

            console.log(data.price)
            result = JSON.stringify(data.price)
            console.log(result)
        }
        return result
    });

    return (
        <div>
          <Dashboard price={result}/>
        </div>
    )  

}