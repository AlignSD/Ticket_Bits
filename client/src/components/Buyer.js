import React, { Component } from 'react';


// Loads buyer page thru ticketmarketplace
class Buyer extends Component {

  render() {
    
    console.log(this.props);
    return (
      <div id="content">
        <h2>Buy Ticket</h2>
        <table className="table text-white">
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

export default Buyer;