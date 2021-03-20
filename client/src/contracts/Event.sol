pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./ERC721Full.sol"

/** @title Event */
contract Event is ERC721 {

    string  public eventName;
    uint256 public startDate;
    uint256 private ticketId;
    uint256 public endDate;
    uint256 public available;
    string public location;
    string public  description;
    uint public ticketPrice;
    address payable public owner;
   
    event TicketPurchased(address purchaser, uint quanntity, uint date, address indexed indexedPurchased );
    event TicketTransfered(address _from, address _to, uint _tokenId);
    event PaymentCollected(address _event, address _organizer, uint _balance );


    /**@dev created new instance of Event
    @param _organizer account address of event organizer creating the event 
    @param _name title of the event
    @param _start start date of event given in unix timestamp
    @param _end end date of event provided in unix timestamp
    @param _description extra description of the event
    @param _location event location
    @param supply available tickets for sell to the event
    @param _ticketPrice ticket price in wei
    */

    constructor(address payable _organizer, 
    string memory _name, 
    uint _start, 
    uint _end,
    string memory _description,  
    string memory _location,
    uint supply, 
    uint _ticketPrice
    ) ERC721(_name, "TKT") public {

        eventName = _name;
        startDate = _start;
        endDate = _end;
        ticketPrice = _ticketPrice;
        available = supply;
        description = _description;
        owner = _organizer;
        location = _location;

    }



    /**
    @dev allows user to purchase ticket for the event
    @param quantity total amount of ticket the user wishes to purchase maximum amount is 5
    */
    function purchaseTicket(uint quantity) public payable {
        require(available  >= quantity, "not enough ticket quantity available!!!");
        require(msg.value >= ticketPrice * quantity, "not enough money sent");
        
        for(uint8 i = 0; i < quantity; i++) {
            ticketId++;
            available--;
            _mint(msg.sender,ticketId);
        }

        emit TicketPurchased(msg.sender, quantity, block.timestamp, msg.sender);
    }


    
    function transferTicket(address _to, uint _tokenId) public {
        require(address(0) != _to, "invalid address provided");
        transferFrom(msg.sender, _to, _tokenId);
        emit TicketTransfered(msg.sender, _to, _tokenId);
    }


    /**
    
    @dev validated if a given ticket id is owned by the given user 
    @param _owner address of the owner of ticket to be validated
    @param _tokenId id of the ticket to be validated
    @return x boolean value holding the result 
    */
    function isTicketValid(address _owner, uint _tokenId) onlyOwner public  returns(bool) {
        if(ownerOf(_tokenId) == _owner) {
            _burn(_tokenId);
            return true;
        }  else {
            return false;
        }
    }


 
    

  
  
//   @dev returns tickets array owned by a given user
//   @param _owner address of the required 
//   @return x arrays of ticket id owned by user
//   */

    // mapping(address => mapping(uint256 => uint256)) private _ownedTokens; 
    // mapping(uint256 => uint256) private _ownedTokensIndex;
    // uint256 tokens;
    // mapping()
    // uint256[] _tokenOwners;

    // function _tokensOfOwner(address owner) internal view returns (uint256[] storage) {
    //     return _ownedTokens[owner];
    // }

    // function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256 tokenId);


    function getOwnersTicket(address _owner) internal view returns(uint256[] memory) {
        
        return _tokensOfOwner(_owner);
    }

    // // Pagination of owner tokens
    // function gtOwnersTickets(address _owner, uint8 _tickets, uint8 _ownersTickets) public view returns(uint256[] memory) {
    //     require(_tickets > 0, "_tokens should be greater than 0");
    //     require(_ownersTickets > 0, "_ownersTokens should be greater than 0");

    //     uint256 _tokenCount = balanceOf(_owner);
    //     uint256 _offset = (_tickets - 1) * _ownersTickets;
    //     uint256 _range = _offset > _tokenCount ? 0 : min(_tokenCount - _offset, _ownersTickets);

    //     uint256[] memory _tokens = new uint256[](_range);
    //     for (uint256 i = 0; i < _range; i++) {
    //         _tokens[i] = tokenOfOwnerByIndex(_owner, _offset + i);
    //     }
    //     return _tokens;
    // }

    // function min(uint256 a, uint256 b) private pure returns (uint256) {
    //     return a > b ? b : a;
    // }


    // function getOwnersTicket(address owner, uint256 index) public view virtual returns (uint256) {
    //     require(index < ERC721.balanceOf(owner), "ERC721Enumerable: owner index out of bounds");
    //     return _ownedTokens[owner][index];
    // }
    
    /**
    
    @dev lets event organizer get ether collected for tickets sold for the event
     */

    function collectPayment() onlyOwner public {
      // require(now > endDate && !canceled, "can not collect payment before the event is over");
        //owner.transfer(address(this).balance);
        selfdestruct(msg.sender);
       emit PaymentCollected(address(this), msg.sender, address(this).balance );
    }

    /**
    

    /**
    
    
    @dev modifier that checked if current request is made by the event owner 
     */
      modifier onlyOwner {
        require(msg.sender == owner, "only event owner is allowed to perform this action");
        _;
    }

}