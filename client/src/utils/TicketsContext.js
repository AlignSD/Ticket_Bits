import React, {createContext, useState} from 'react';

export const TicketsContext = createContext();

const TicketsContextProvider = (props) => {
    const [account, setAccountName] = useState("");
  // const [ticketCount, setTicketCount] = useState(0)
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("");
  const [paypalState, setPaypalState] = useState({
    total: 0,
    checkoutList: [],
    isCheckout: false,
  });

  const [marketplaceState, setMarket] = useState();
  const [openPopup, setOpenPopup] = useState(false)
  return(
    <TicketsContext.Provider value={{account, tickets, loading, userType, paypalState, marketplaceState, openPopup, setAccountName, setTickets, setLoading, setUserType, setPaypalState, setMarket, setOpenPopup, setOpenPopup}}>
        {props.children}
        </TicketsContext.Provider>
)
    
}



export default TicketsContextProvider;
