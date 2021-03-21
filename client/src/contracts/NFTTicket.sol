pragma solidity 0.5.0;

import "./ERC721Full.sol";

contract NFTTicket is ERC721Full {
  string[] public tickets;
  mapping(string => bool) _ticketExists;

  constructor() ERC721Full("Tickets", "TKT") public {
  }

 
  function mint(string memory _ticket) public {
    require(!_ticketExists[_ticket]);
    uint _id = tickets.push(_ticket);
    _mint(msg.sender, _id);
    _ticketExists[_ticket] = true;
  }

}