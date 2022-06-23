// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SimpleNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public constant COMMON_TOKEN_URI =
        "https://gateway.pinata.cloud/ipfs/QmPrVVinxdtiLq1BymDRTt9HkfcvCUqeM1WboYydDrqGJq";
    uint256 public mintCost = 0.001 ether;

    constructor() ERC721("SimpleNFT", "NFT") {}

    function mint(address _to) public payable returns (uint256) {
        require(msg.value >= mintCost, "Min cost 0.001ETH");
        uint256 newTokenId = _tokenIds.current();
        _mint(_to, newTokenId);
        _setTokenURI(newTokenId, COMMON_TOKEN_URI);
        _tokenIds.increment();
        return newTokenId;
    }
}
