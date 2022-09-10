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

    constructor() ERC721("StayToken", "STY") {
        fee = 104;
        ownerAddress = msg.sender;
        USDCToken = IERC20(0x87284d4150b0FADe12255A7d208AD46526C519ee);
    }

    function addStay(string calldata stayId, uint256 tokensPerPerson, uint8 availableSpots, string calldata imageURL) external {
        require(!isPaused, "smart contract paused");
        require(tokensPerPerson > 0, "wrong tokens per person");
        require(availableSpots > 0, "wrong amount of spots");
        address[] memory arrayOfAddresses;
        uint[] memory nftIds;
        Stay memory newStay = Stay({
            id: stayId,
            costPerPerson: tokensPerPerson,
            fundsRaised: 0,
            spots: availableSpots,
            imageURL: imageURL,
            housemates: arrayOfAddresses,
            nftsMinted: nftIds
        });
        stays[newStay.id] = newStay;
    }

    function joinStay(uint256 deposit, string calldata stayId) external  {
        Stay storage stay = stays[stayId];
        require(!isPaused, "smart contract paused");
        require(deposit <= USDCToken.balanceOf(msg.sender), "balance too low");
        require(deposit == stay.costPerPerson*fee/100, "wrong amount of tokens");
        require(stay.spots > 0, "no spots left");
        USDCToken.transferFrom(msg.sender, address(this), deposit);
        _tokenIds.increment();
        _mint(msg.sender, _tokenIds.current());
        _setTokenURI(_tokenIds.current(), stay.imageURL);
        stay.spots--;
        stay.fundsRaised += deposit;
        stay.housemates.push(msg.sender);
        stay.nftsMinted.push(_tokenIds.current());
        if(stay.spots == 0){
            USDCToken.transfer(ownerAddress, stay.fundsRaised);
            emit BookStay(msg.sender, stayId, stay.fundsRaised);
            delete stays[stayId];
        }else{
            emit JoinStay(msg.sender, deposit);
        }
    }

    function resign(string calldata stayId) external {
        Stay storage stay = stays[stayId];
        require(stay.spots > 0, "You can't resign now");
        uint256 refund = stay.costPerPerson*95/100;
        for(uint i=0; i < stay.housemates.length; i++){
            if(stay.housemates[i] == msg.sender){
                delete stay.housemates[i];
                stay.spots++;
                stay.fundsRaised -= refund;
                USDCToken.transfer(msg.sender, refund);
                for(uint j = 0; j < stay.nftsMinted.length; j++){
                    if(stay.nftsMinted[j] != 0){
                        if(ownerOf(stay.nftsMinted[j]) == msg.sender){
                            approve(address(this), stay.nftsMinted[j]);
                            _burn(stay.nftsMinted[j]);
                            delete stay.nftsMinted[j];
                            break;
                            }
                    }
                }
                break;
            }
        }
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