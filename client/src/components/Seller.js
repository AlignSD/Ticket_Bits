import React, { Component } from 'react';


// Event host sells tickets thru Seller component
// could be converted into a functional component if bored
class Seller extends Component {

  render() {
    console.log(this.props);
    return (
      <div id="content"  style={{position: 'absolute',
      zIndex: 1}}>
        <h1 style={{color: "white"}}>Add Ticket</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.ticketName.value
          const price = window.web3.utils.toWei(this.ticketPrice.value.toString(), 'Ether')
          this.props.createTicket(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              style={{widith: "30%"}}
              id="ticketName"
              type="text"
              ref={(input) => { this.ticketName = input }}
              className="form"
              placeholder="Ticket Name"
              required />
          </div>
          <div  className="form-group mr-sm-2">
            <input
              style={{widith: "30%"}}
              id="ticketPrice"
              type="text"
              ref={(input) => { this.ticketPrice = input }}
              className="form"
              placeholder="Ticket Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Ticket</button>
        </form>
        <p>&nbsp;</p>
      </div>
    );
  }
}

export default Seller;