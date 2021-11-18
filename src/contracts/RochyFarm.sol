pragma solidity ^0.5.0;

import "./UrbnToken.sol";
import "./DaiToken.sol";

contract RochyFarm {
    string public name = "Urbn Rochy Farm";
    address public owner;
    UrbnToken public urbnToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(UrbnToken _urbnToken, DaiToken _daiToken) public {
        urbnToken = _urbnToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    function stakeTokens(uint256 _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Trasnfer Mock Dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array *only* if they haven't staked already
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstaking Tokens (Withdraw)
    function unstakeTokens(uint256 _amount) public {
        // Fetch staking balance
        uint256 balance = stakingBalance[msg.sender];
        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");
        require(balance > _amount, "there's not enough funds");

        // Transfer Mock Dai tokens to this contract for staking
        daiToken.transfer(msg.sender, _amount);

        // Reset staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] - _amount;

        // Update staking status
        if (stakingBalance[msg.sender] == 0) {
            isStaking[msg.sender] = false;
        }
    }

    // Issuing Tokens
    function issueTokens() public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient];
            if (balance > 0) {
                urbnToken.transfer(recipient, balance);
            }
        }
    }
}
