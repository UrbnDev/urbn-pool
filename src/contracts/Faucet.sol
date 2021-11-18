pragma solidity ^0.5.0;

import "./DaiToken.sol";

contract Faucet {
    string public name = "Faucet Urbn Tokens";
    address public owner;
    DaiToken public daiToken;

    constructor(DaiToken _daiToken) public {
        daiToken = _daiToken;
        owner = msg.sender;
    }

    function distribute() public payable returns (bool success) {
        // Check if there's any mDai left
        // hard limit - 100 tokens left
        require(daiToken.getTotalSupply() > 1000);
        // transfer faucet amomunt = 200
        daiToken.transferFrom(address(daiToken), msg.sender, 200);
        // response successful
        return true;
    }
}
