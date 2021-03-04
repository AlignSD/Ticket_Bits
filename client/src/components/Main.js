import React, { Component } from 'react';

class Main extends Component {

  render() {
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
        <h2>Buy Ticket</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="ticketList">
            { this.props.tickets.map((ticket, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{ticket.id.toString()}</th>
                  <td>{ticket.name}</td>
                  <td>{window.web3.utils.fromWei(ticket.price.toString(), 'Ether')}</td>
                  <td>{ticket.owner}</td>
                  <td>
                   { !ticket.purchased
                    ? <button className="buyButton" 
                      name={ticket.id}
                      value={ticket.price} 
                        onClick={(event) => {
                          this.props.purchaseTicket(event.target.name, event.target.value)
                        } }
                      >
                        Buy
                        </button>
                        : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;