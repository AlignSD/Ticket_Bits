import React, { Component, useEffect, useState, setState } from 'react';
import Web3 from 'web3';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar'
import Main from './Main'
import { useAuth0 } from "@auth0/auth0-react";
import { loadWeb3, loadBlockchainData } from "./Main"

    
function TicketMarketPlace() {
  const [accountName, setAccountName ] = useState({
    account: '',
    ticketCount: 0,
    tickets: [],
    loading: true
  });

  const [marketplaceState, setMarket ] = useState();
  
  useEffect(() => {
    // Update the document title using the browser API
    
    loadWeb3();
    loadBlockchainData();
    
  },[]);

  

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts[0]);
    let accountNum = accounts[0]
    setAccountName( ...accountName, ({ account: accountNum }))
    console.log(accountName.account);
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if(networkData) {
      const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
      console.log(marketplace);
      setMarket(marketplace);
      const ticketCount = await marketplace.methods.ticketCount().call()
      // Load Products
      for (var i = 1; i<= ticketCount; i++) {
        const ticket = await marketplace.methods.tickets(i).call()
        this.setState({
          tickets: [...this.state.tickets, ticket]
        })
      }
      setAccountName({ ...accountName, loading: false })
      console.log(marketplace);
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  
  
        
  
  // state = {
  //       account: '',
  //       ticketCount: 0,
  //       tickets: [],
  //       loading: true
  //     }
// constructor(props) {
//   super(props)
//   this.state = {
//     account: '',
//     ticketCount: 0,
//     tickets: [],
//     loading: true
//   }

//   this.createTicket = this.createTicket.bind(this)
//   this.purchaseTicket = this.purchaseTicket.bind(this)
// }

function createTicket(name, price) {
  
  if(marketplaceState){
    console.log(accountName)
    setAccountName({ ...accountName, loading: true })
    marketplaceState.methods.createTicket(name, price).send({ from: accountName.account }).once('receipt', (receipt) => {
      setAccountName({ ...accountName, loading: false })
    })
  }
}
function purchaseTicket(id, price) {
  if(marketplaceState){
    console.log(accountName.account)
    setAccountName({ ...accountName, loading: true })
    marketplaceState.methods.purchaseTicket(id).send({ from: accountName.account, value: price }).once('receipt', (receipt) => {
      setAccountName({ ...accountName, loading: false })
    })
  }
}
        
        
        
  const {isAuthenticated} = useAuth0();
  
    return (
      <div>
        
        <Navbar account={accountName.accounts} />
        
        <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { accountName.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : 
                
                <Main 
                tickets={accountName.tickets} 
                createTicket={createTicket} 
                purchaseTicket={purchaseTicket}/>
              }
            </main>
          </div>
      </div>
    );
    }
  
  //   async componentDidMount() { //useEffect is the same
      
  //       await this.loadWeb3()
  //       await this.loadBlockchainData()
      
  //     }
    
     
    
    //   render() {
    //     return (
    //       <div>
            
    //         <Navbar account={this.state.account} />
            
    //         <div className="row">
    //             <main role="main" className="col-lg-12 d-flex">
    //               { this.state.loading
    //                 ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
    //                 : 
                    
    //                 <Main 
    //                 tickets={this.state.tickets} 
    //                 createTicket={this.createTicket} 
    //                 purchaseTicket={this.purchaseTicket}/>
    //               }
    //             </main>
    //           </div>
    //       </div>
    //     );
    //   }
    // }
    
    export default TicketMarketPlace;

    //   async componentWillMount(){
    //     await this.loadWeb3();
    //     console.log("*********",window.ethereum);
    //     this.loadBlockchainData();
    //   }
    
    //   async loadWeb3() {
    //     if (window.ethereum) {
    //       handleEthereum();
    //     } else {
    //       window.addEventListener('ethereum#initialized', handleEthereum, {
    //         once: true,
    //       });
        
    //       // If the event is not dispatched by the end of the timeout,
    //       // the user probably doesn't have MetaMask installed.
    //       setTimeout(handleEthereum, 3000); // 3 seconds
    //     }
        
    //     function handleEthereum() {
    //       const { ethereum } = window;
    //       if (ethereum && ethereum.isMetaMask) {
    //         console.log('Ethereum successfully detected!');
    //         // Access the decentralized web!
    //       } else {
    //         console.log('Please install MetaMask!');
    //       }
    //     }
    // }
      
    // async loadBlockchainData() {
    //   // const web3 = window.web3
    //   // Load account
    //   const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    //   this.setState({ account: accounts[0] })
    //   const networkId = await window.ethereum.request({ method: 'eth_chainId' });
    //   console.log(networkId);
    //   const networkData = Marketplace.networks[networkId]
    //   console.log(networkData)
    //   if(networkData) {
    //     const marketplace = window.ethereum.request.Contract(Marketplace.abi, networkData.address)
    //     console.log(marketplace)
    //   } else {
    //     window.alert('Marketplace contract not deployed to detected network.')
    //   }
    // }


    // class TicketMarketPlace extends Component {
     
    //   async componentDidMount() { //useEffect is the same
        
    //       await this.loadWeb3()
    //       await this.loadBlockchainData()
        
    //     }
      
    //     async loadWeb3() {
    //       if (window.ethereum) {
    //         window.web3 = new Web3(window.ethereum)
    //         await window.ethereum.enable()
    //       }
    //       else if (window.web3) {
    //         window.web3 = new Web3(window.web3.currentProvider)
    //       }
    //       else {
    //         window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    //       }
    //     }
      
    //     async loadBlockchainData() {
    //       const web3 = window.web3
    //       // Load account
    //       const accounts = await web3.eth.getAccounts()
    //       this.setState({ account: accounts[0] })
    //       const networkId = await web3.eth.net.getId()
    //       const networkData = Marketplace.networks[networkId]
    //       if(networkData) {
    //         const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
    //         this.setState({ marketplace })
    //         const ticketCount = await marketplace.methods.ticketCount().call()
    //         // Load Products
    //         for (var i = 1; i<= ticketCount; i++) {
    //           const ticket = await marketplace.methods.tickets(i).call()
    //           this.setState({
    //             tickets: [...this.state.tickets, ticket]
    //           })
    //         }
    //         this.setState({ loading: false })
            
    //       } else {
    //         window.alert('Marketplace contract not deployed to detected network.')
    //       }
    //     }
      
    //  constructor(props) {
    //     super(props)
    //     this.state = {
    //       account: '',
    //       ticketCount: 0,
    //       tickets: [],
    //       loading: true
    //     }
      
    //     this.createTicket = this.createTicket.bind(this)
    //     this.purchaseTicket = this.purchaseTicket.bind(this)
    //   }
      
    //   createTicket(name, price) {
    //     this.setState({ loading: true })
    //     this.state.marketplace.methods.createTicket(name, price).send({ from: this.state.account }).once('receipt', (receipt) => {
    //       this.setState({ loading: false })
    //     })
    //   }
      
    //   purchaseTicket(id, price) {
    //     this.setState({ loading: true })
    //     this.state.marketplace.methods.purchaseTicket(id).send({ from: this.state.account, value: price }).once('receipt', (receipt) => {
    //       this.setState({ loading: false })
    //     })
    //   }
      
    //     render() {
    //       return (
    //         <div>
              
    //           <Navbar account={this.state.account} />
              
    //           <div className="row">
    //               <main role="main" className="col-lg-12 d-flex">
    //                 { this.state.loading
    //                   ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
    //                   : 
                      
    //                   <Main 
    //                   tickets={this.state.tickets} 
    //                   createTicket={this.createTicket} 
    //                   purchaseTicket={this.purchaseTicket}/>
    //                 }
    //               </main>
    //             </div>
    //         </div>
    //       );
    //     }
    //   }
      
    //   export default TicketMarketPlace;