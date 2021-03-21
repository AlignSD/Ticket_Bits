// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;


contract Marketplace {
    string public name;
    uint256 public ticketCount = 0;
    mapping(uint256 => Ticket) public tickets;

    struct Ticket {
        uint256 id;
        string name;
        uint256 price;
        address payable owner;
        bool purchased;
    }

    event TicketCreated(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool purchased
    );

    event TicketPurchased(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "Marketplace";
    }

    function createTicket(string memory _name, uint256 _price) public {
        //Require a valid name
        require(bytes(_name).length > 0);
        // Reuire a valid price
        require(_price > 0);
        // Make sure parameters are correct
        // Increment Ticket count
        ticketCount++;
        //Create the ticket
        tickets[ticketCount] = Ticket(
            ticketCount,
            _name,
            _price,
            msg.sender,
            false
        );
        //Trigger an event
        emit TicketCreated(ticketCount, _name, _price, msg.sender, false);
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
            _ticket.name,
            _ticket.price,
            msg.sender,
            true
        );
    }
}