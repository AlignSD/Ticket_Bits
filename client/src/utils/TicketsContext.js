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
  const [eventState, setEvent] = useState('');
  const [eventFactoryState, setEventFactory] = useState('');
  const [openPopup, setOpenPopup] = useState(false)
  const [addToCart, setAddToCart] = useState({
    0: "",
1: "",
2: "",
3: "",
4: "",
5: "",
6: "",
7: true,
description: "",
id: "",
location: "",
name: "",
owner: "",
price: "",
purchased: false,
startDate: ""
  })

  const [eventModel, setEventModel] = useState({
    id: 0,
    name: "",
    location: "",
    startDate: 0,
    endDate: 0,
    description: "",
    ticketPrice: 0,
    availableTickets: 0
  })

  const [captureFile, setCaptureFile] = useState()
  const [bufferState, setBufferState] = useState();

  return(
    <TicketsContext.Provider value={{account, tickets, loading, userType, paypalState, marketplaceState, openPopup, eventState, eventFactoryState, captureFile, bufferState, setAccountName, setTickets, setLoading, setUserType, setPaypalState, setMarket, setOpenPopup, setEvent, setEventFactory, eventModel, setEventModel, setCaptureFile, setBufferState, addToCart, setAddToCart}}>
        {props.children}
        </TicketsContext.Provider>
  )
}

export default TicketsContextProvider;
