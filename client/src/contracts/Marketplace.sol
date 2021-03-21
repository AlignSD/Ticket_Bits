// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint256 newAvailable;
    uint256 public ticketCount = 0;
    mapping(uint256 => Ticket) public tickets;

    struct Ticket {
        uint256 id;
        string name;
        uint256 price;
        string date;
        string location;
        string description;
        string available;
        // string quanity;
        address payable owner;
        bool purchased;
    }

    event TicketCreated(
        uint256 id,
        string name,
        uint256 price,
        string date,
        string location,
        string description,
        string available,
        // string quantity,
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

    function createTicket(
        string memory _name,
        uint256 _price,
        string memory _date,
        string memory _location,
        string memory _description,
        string memory _available // string memory _quantity
    ) public {
        //Require a valid name
        require(bytes(_name).length > 0);
        // Reuire a valid price
        require(_price > 0);
        // Require valid date
        require(bytes(_date).length > 0);
        // Require a valid location
        require(bytes(_location).length > 0);
        // Require a valid description
        require(bytes(_description).length > 0);
        // Require a ticket or tickets to be available
        require(bytes(_available).length > 0);
        // // Require a quanity for purchase
        // require(_quantity > 0);
        // //Require available tickets is >= to quantity
        // require(_available >= _quantity);
        // Make sure parameters are correct
        // Increment Ticket count
        ticketCount++;
        // Subtract quantity from available tickets
        // if (_available >= _quantity) {
        //     newAvailable = _available - _quantity;
        //     _available = newAvailable;
        // }
        //Create the ticket
        tickets[ticketCount] = Ticket(
            ticketCount,
            _name,
            _price,
            _date,
            _location,
            _description,
            _available,
            // _quantity,
            msg.sender,
            false
        );
        //Trigger an event
        emit TicketCreated(
            ticketCount,
            _name,
            _price,
            _date,
            _location,
            _description,
            _available,
            // _quantity,
            msg.sender,
            false
        );
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
            _ticket.id,
            _ticket.name,
            _ticket.price,
            msg.sender,
            true
        );
    }
}
