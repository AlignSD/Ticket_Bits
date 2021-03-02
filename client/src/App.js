import React, { Component } from "react";
import Web3 from 'web3';
import "./App.css";

class App extends Component {

componentWillMount() {
  this.loadBlockchainData();
}

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    console.log("network: ", network);
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] });
    console.log("account", accounts[0]);
  }


  constructor(props) {
    super(props);
    this.state = { account : "" }
  }

  render() {
    return (
      <div className="App">
        <h1>Hello, World!</h1>
        <p>Your Account: {this.state.account}</p>
      </div>
    );
  }
}

export default App;
