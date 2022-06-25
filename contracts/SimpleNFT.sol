// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public commonTokenURI;
    uint256 public mintCost;

    constructor(string memory _tokenURI, uint256 _mintCost) ERC721("SimpleNFT", "NFT") {
        commonTokenURI = _tokenURI;
        mintCost = _mintCost;
    }

    function mint(address _to) public payable returns (uint256) {
        require(msg.value >= mintCost, "Min cost 0.001ETH");
        uint256 newTokenId = _tokenIds.current();
        _mint(_to, newTokenId);
        _setTokenURI(newTokenId, commonTokenURI);
        _tokenIds.increment();
        return newTokenId;
    }

    function changeTokenURI(string calldata _newURI) public onlyOwner {
        commonTokenURI = _newURI;
    }
}
