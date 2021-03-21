  
// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;


contract Marketplace {
    string public name;
    uint256 public ticketCount = 0;
    mapping(uint256 => Ticket) public tickets;


    struct Ticket {
        uint256 id;
        string imgHash;
        string name;
        uint256 price;
        string startDate;
        string location;
        string description;
        address payable owner;
        bool purchased;
    }

      event TicketCreated(
        uint256 id,
        string imgHash,
        string name,
        uint256 price,
        string startDate,
        string location,
        string description,
        address payable owner,
        bool purchased
    );

    event TicketPurchased(
        uint256 id,
        string imgHash,
        string name,
        uint256 price,
        string startDate,
        string location,
        string description,
        address payable owner,
        bool purchased
    );
    constructor() public {
        name = "Marketplace";
    }

    function createTicket(string memory _imgHash, string memory _name, uint256 _price, string memory _startDate, string memory _location, string memory _description) public {
        //Validate uploader address exists
        require(msg.sender!=address(0)); 
        //Validate hash exists
        require(bytes(_imgHash).length > 0);
        //Require a valid name
        require(bytes(_name).length > 0);
        // Reuire a valid price
        require(_price > 0);
        // Require valid date
        require(bytes(_startDate).length > 0);
        // Require a valid location
        require(bytes(_location).length > 0);
        // Require a valid description
        require(bytes(_description).length > 0);
        // Make sure parameters are correct
        // Increment Ticket count
        ticketCount++;
        //Create the ticket
        tickets[ticketCount] = Ticket(
            ticketCount,
            _imgHash,
            _name,
            _price,
            _startDate,
            _location,
            _description,
            msg.sender,
            false
        );
        //Trigger an event
        emit TicketCreated(ticketCount, _imgHash, _name, _price, _startDate, _location, _description, msg.sender, false);
    }


    function purchaseTicket(uint256 _id) public payable {
        // Fetch the product
        Ticket memory _ticket = tickets[_id];
        // Fetch the owner
        address payable _seller = _ticket.owner;
        // Make sure the ticket has a valid id
        require(_ticket.id > 0 && _ticket.id <= ticketCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _ticket.price);
        // Require that the ticket has not been purchased already
        require(!_ticket.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _ticket.owner = msg.sender;
        // Mark as purchased
        _ticket.purchased = true;
        // Update the product
        tickets[_id] = _ticket;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        //Trigger an event
        emit TicketPurchased(
            ticketCount,
            _ticket.imgHash,
            _ticket.name,
            _ticket.price,
            _ticket.startDate,
            _ticket.location,
            _ticket.description,
            msg.sender,
            true
        );
    }
}