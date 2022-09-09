// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Booker is Ownable, ERC721, ERC721URIStorage{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public fee;
    address ownerAddress;
    bool isPaused;
    mapping(string => Stay) stays;
    IERC20 USDCToken;

    struct Stay {
        string id;
        uint256 costPerPerson;
        uint256 fundsRaised;
        uint8 spots;
        string imageURL;
        address[] housemates;
        uint[] nftsMinted;
    }

    event BookStay(address user, string stayId, uint256 value);
    event JoinStay(address user, uint256 value);

    constructor() ERC721("StayToken", "STV") {
        fee = 104;
        ownerAddress = msg.sender;
        USDCToken = IERC20(0x87284d4150b0FADe12255A7d208AD46526C519ee);
        // USDCToken = IERC20(0x88e8676363E1d4635a816d294634905AF292135A);
    }

    function addStay(string calldata id, uint256 costPerPerson, uint8 spots, string calldata imageURL) external {
        require(!isPaused, "smart contract paused");
        address[] memory arrayOfAddresses;
        uint[] memory nftIds;
        Stay memory newStay = Stay({
            id: id,
            costPerPerson: costPerPerson,
            fundsRaised: 0,
            spots: spots,
            imageURL: imageURL,
            housemates: arrayOfAddresses,
            nftsMinted: nftIds
        });
        stays[newStay.id] = newStay;
    }

    function joinStay(uint256 amount, string calldata stayId) external  {
        Stay storage stay = stays[stayId];
        require(!isPaused, "smart contract paused");
        require(amount <= USDCToken.balanceOf(msg.sender), "balance too low");
        require(amount == stay.costPerPerson*fee/100, "wrong amount of tokens");
        require(stay.spots > 0, "no spots left");
        USDCToken.transferFrom(msg.sender, address(this), amount);
        _tokenIds.increment();
        _mint(msg.sender, _tokenIds.current());
        _setTokenURI(_tokenIds.current(), stay.imageURL);
        stay.spots--;
        stay.fundsRaised += amount;
        stay.housemates.push(msg.sender);
        stay.nftsMinted.push(_tokenIds.current());
        if(stay.spots == 0){
            USDCToken.transferFrom(address(this), ownerAddress, stay.fundsRaised);
            emit BookStay(msg.sender, stayId, stay.fundsRaised);
            delete stays[stayId];
        }else{
            emit JoinStay(msg.sender, amount);
        }
    }

    function resign(string calldata stayId) external {
        Stay storage stay = stays[stayId];
        uint256 refund = stay.costPerPerson*95/100;
        for(uint i=0; i < stay.housemates.length; i++){
            if(stay.housemates[i] == msg.sender){
                delete stay.housemates[i];
                stay.spots++;
                stay.fundsRaised -= refund;
                USDCToken.transfer(msg.sender, refund);
                for(uint j = 0; j < stay.nftsMinted.length; j++){
                    if(ownerOf(stay.nftsMinted[j]) == msg.sender){
                        approve(address(this), stay.nftsMinted[j]);
                        _burn(stay.nftsMinted[j]);
                        delete stay.nftsMinted[j];
                    }
                }
            }
        }
    }
    function getNFTsMinted(string calldata stayId) public view returns(uint[] memory){
        Stay storage stay = stays[stayId];
        return stay.nftsMinted;
    }

    function getStay(string calldata id) external view returns(Stay memory){
        return stays[id];
    }
    function setFee(uint256 feePercentage) public onlyOwner {
        fee = feePercentage;
    }
    function setPause(bool pause) public onlyOwner {
        isPaused = pause;
    }
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
}