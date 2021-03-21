pragma solidity ^0.5.0;


contract Marketplace {
    string public name;
    uint256 public availableTickets;
    uint256 public availableEventTickets;
    uint public ticketCount = 0;
    uint public eventCount = 0;
    mapping (uint => Event) public events;
    mapping(uint => Ticket) public tickets;

    struct Event {
        uint id;
        string name;
        uint price;
        string startDate;
        string location;
        string description;
        uint quanity;
        address payable owner;
        bool soldout;
    }

    struct Ticket {
        uint id;
        string name;
        uint price;
        string startDate;
        string location;
        string description;
        uint quanity;
        uint availableTickets;
        address payable owner;
        bool purchased;
    }

    event AddTicket (
        uint id,
        string name,
        uint price,
        string startDate,
        string location,
        string description,
        uint quanity,
        uint availableTickets,
        address payable owner,
        bool purchased
    );

    event TicketPurchased(
        uint id,
        string name,
        uint price,
        uint quanity,
        address payable owner,
        bool purchased
    );

    event EventCreated (
        uint id,
        string name,
        uint price,
        string startDate,
        string location,
        string description,
        uint quanity,
        address payable owner
    );

    event EventTicketPurchased(
        uint id,
        uint ticketId,
        string name,
        uint price,
        uint quanity,
        address payable owner,
        bool soldout
    );

    constructor() public {
        name = "Marketplace";
    }

    function eventCreated(string memory _name, uint _price, string memory _startDate, string memory _location, string memory _description, uint _quanity) public {
        //Require a valid name
        require(bytes(_name).length > 0);
        // Reuire a valid price
        require(_price > 0);
        //Require a start date
        require(bytes(_startDate).length > 0);
        //Require a location
        require(bytes(_location).length > 0);
        // Require a quanity
        require(_quanity > 0);

        eventCount ++;

        events[eventCount] = Event(eventCount, _name, _price, _startDate, _location, _description, _quanity, msg.sender, false);

        emit EventCreated(eventCount, _name, _price, _startDate, _location, _description, _quanity, msg.sender);

    }

    function purchaseEventTicket(uint _id, uint _quantity) public payable {
        // Fetch the product
        Event memory _event = events[_id];
        // Fetch the owner
        address payable _seller = _event.owner;
        // Require that there is enough Ether in the transaction
        require(msg.value >= _event.price);
        // Require that the ticket has not been purchased already
        require(msg.value >= (_event.price) * (_quantity), "not enough money sent");
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        require(availableEventTickets >= _quantity, "not enough ticket quantity available");

        uint _ticketId;

        for(uint8 i = 0; i < _quantity; i++) {
            _ticketId++;
            _quantity--;
        }
        _event.owner = msg.sender;
        // Mark as soldout
        if(_quantity == 0){
        _event.soldout = true;
        }
        // Update the ticket
        events[_id] = _event;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        //Trigger an event
         emit EventTicketPurchased(eventCount, _ticketId, _event.name, _event.price, _event.quanity, msg.sender,_event.soldout);
    }

    function addTicket(string memory _name, uint _price, string memory _startDate, string memory _location, string memory _description, uint _quanity, uint _availableTickets) public {
        //Require a valid name
        require(bytes(_name).length > 0);
        // Reuire a valid price
        require(_price > 0);
        //Require a start date
        require(bytes(_startDate).length > 0);
        //Require a location
        require(bytes(_location).length > 0);
        //Require a description
        require(bytes(_description).length > 0);
        //Require a quanity 
        require(_quanity > 0);
        //
        // Make sure parameters are correct
        // Increment Ticket count
        _quanity = availableTickets;
        ticketCount ++;
        //
        //Create the ticket
        tickets[ticketCount] = Ticket(ticketCount, _name, _price, _startDate, _location, _description, _quanity, _availableTickets, msg.sender, false);
        //Trigger an event
        emit AddTicket(ticketCount, _name, _price, _startDate, _location, _description, _quanity, _availableTickets, msg.sender, false);
    }

    function purchaseTicket(uint _id, uint _quantity) public payable {
        // Fetch the product
        Ticket memory _ticket = tickets[_id];
        // Fetch the owner
        address payable _seller = _ticket.owner;
        // Make sure the ticket has a valid id
        require(_ticket.id > 0 && _ticket.id <= ticketCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= (_ticket.price) * (_quantity), "not enough money sent");
        // Require that the ticket has not been purchased already
        require(!_ticket.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        require(availableTickets >= _quantity, "not enough ticket quantity available");

        for(uint8 i = 0; i < _quantity; i++) {
            availableTickets--;
        }
        _ticket.owner = msg.sender;
        // Mark as purchased
        _ticket.purchased = true;
        // Update the ticket
        tickets[_id] = _ticket;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        //Trigger an event
         emit TicketPurchased(ticketCount, _ticket.name, _ticket.price, _ticket.quanity, msg.sender, true);
    }
}