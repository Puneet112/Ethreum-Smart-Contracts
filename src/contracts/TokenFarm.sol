pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    address public owner;
    DappToken public dappToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        owner = msg.sender;
        dappToken = _dappToken;
        daiToken = _daiToken;
    }

    // 1. Staking Tokens (Deposit)
    function stakeTokens(uint256 _amount) public {
        // Require _amount > 0
        require(_amount > 0, "Amount must be greater than 0");

        // Transfer tokens to contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update Staking Balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update Staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // 2. Un-Staking Tokens (Withdraw)
    function unstakeTokens(uint256 _amount) public {
        // Require _amount > 0
        require(_amount > 0, "Amount must be greater than 0");

        // Fetch staking balance
        uint256 balance = stakingBalance[msg.sender];

        // Balance should be > 0
        require(balance > 0, "Stakng balance must be greater thn 0");

        // Transfer mDAI tokens back to the investor
        if (_amount < balance) {
            daiToken.transfer(msg.sender, _amount);

            // Reset staking balance
            stakingBalance[msg.sender] = balance - _amount;
        }
        if (_amount == balance) {
            daiToken.transfer(msg.sender, _amount);

            // Reset staking balance
            stakingBalance[msg.sender] = 0;

            // Update staking status
            isStaking[msg.sender] = false;
        }
    }

    // 3. Issue Tokens (Reaward/Profit)
    function issueTokens() public {
        // Only owner can call this function
        require(
            msg.sender == owner,
            "Only owner has the permission to call this functions"
        );

        // Issue Tokens
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient];
            if (balance > 0) {
                dappToken.transfer(recipient, balance);
            }
        }
    }
}
