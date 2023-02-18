// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.17;

/**
 * @author Heather Swope
 * @title Killable
 * @dev Contract which provides a way to "kill" a contract without losing the Ether associated with
 * the contract account. The safeguardFunds moves money from the contract's account to the owner's account.
 */

import { Ownable}  from "@openzeppelin/contracts/access/Ownable.sol";
import { Pausable } from "@openzeppelin/contracts/security/Pausable.sol";
import "./Constants.sol";



contract Killable is Constants, Ownable, Pausable {

    bool private _killed;

    event LogKilled(address account);
    event LogFundsSafeguarded(address indexed recipient, uint256 amount);

    function isKilled() public view returns (bool) {
        return _killed;
    }

    function kill() public onlyOwner whenAlive whenPaused {
        _killed = true;
        emit LogKilled(msg.sender);
    }

    modifier whenAlive() {
        require(!_killed, KILLED);
        _;
    }

    modifier whenKilled() {
        require(_killed, ALIVE);
        _;
    }

    /**
     * @notice safeguards funds after contract has been killed. Funds can be redistributed if needed.
     * @param beneficiary - the address that will receive the funds
     * @return success or failure indicator
     */
    function safeguardFunds(address payable beneficiary) public onlyOwner whenKilled returns(bool success) {
        require(beneficiary != address(0), INVALID_ADDRESS);
        uint balance = address(this).balance;
        emit LogFundsSafeguarded(beneficiary, balance);
      
        (success, ) = beneficiary.call{value: balance}("");
        require(success, TRANSFER_FAILED);
        return success;
    
    }



}