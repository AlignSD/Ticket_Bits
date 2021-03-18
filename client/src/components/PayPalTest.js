import React from "react";

export default function PaypalTest(props){
    console.log(props)

    return(
        <div id="content">
        <h2 style={{color: "white"}}>Buy Ticket</h2>
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
            {props.tickets.map((ticket, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{ticket.id.toString()}</th>
                  <td>{ticket.name}</td>
                  <td>{window.web3.utils.fromWei(ticket.price.toString(), 'Ether')}</td>
                  <td>{ticket.owner}</td>
                  <td>
                  { !ticket.purchased
                    ? <button className="buyButton text-dark font-weight-bold rounded btn-success" 
                    name={ticket.id}
                    value={ticket.price} 
                      onClick={(event) => {
                        props.purchaseTicket(event.target.name, event.target.value)
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
    )
}
