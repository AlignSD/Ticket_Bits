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

  const [inputName, setInputName] = useState("")
  const [inputStart, setInputStart] = useState("")
  const [inputEnd, setInputEnd] = useState("")
  const [inputSupply, setInputSupply] = useState(0)
  const [inputTicketPrice, setInputTicketPrice] = useState(0)
  const [inputDescription, setInputDescription] = useState("")
  const [inputLocation, setInputLocation] = useState("")

  const [marketplaceState, setMarket] = useState();
  const [eventState, setEvent] = useState('');
  const [eventFactoryState, setEventFactory] = useState('');
  const [openPopup, setOpenPopup] = useState(false)

  const [eventModel, setEventModel] = useState({
    name: "",
    start: "",
    end: "",
    supply: 0,
    ticketPrice: 0,
    description: "",
    location: ""
  })

  return(
    <TicketsContext.Provider value={{account, tickets, loading, userType, paypalState, marketplaceState, openPopup, eventState, eventFactoryState, inputName, inputStart, inputEnd, inputSupply, inputDescription, inputTicketPrice, inputLocation, setAccountName, setTickets, setLoading, setUserType, setPaypalState, setMarket, setOpenPopup, setEvent, setEventFactory, setInputName, setInputStart, setInputEnd, setInputSupply,setInputTicketPrice, setInputDescription, setInputLocation}}>
        {props.children}
        </TicketsContext.Provider>
  )
}

export default TicketsContextProvider;
