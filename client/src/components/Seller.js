import React, { Component } from 'react';

class Seller extends Component {

  render() {
    console.log(this.props);
    return (
      <div id="content">
        <h1>Add Ticket</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.ticketName.value
          const price = window.web3.utils.toWei(this.ticketPrice.value.toString(), 'Ether')
          this.props.createTicket(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="ticketName"
              type="text"
              ref={(input) => { this.ticketName = input }}
              className="form-control"
              placeholder="Ticket Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="ticketPrice"
              type="text"
              ref={(input) => { this.ticketPrice = input }}
              className="form-control"
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