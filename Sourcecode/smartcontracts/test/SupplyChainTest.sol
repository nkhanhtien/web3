// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../contracts/SupplyChain.sol";
import "../contracts/Structure.sol";
// These files are dynamically created at test time
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract SupplyChainTest {
    function testAddUser() public {
        SupplyChain supplyChain = SupplyChain(DeployedAddresses.SupplyChain());

        supplyChain.addUser(
            0,
            0x7c4D7bda8BB26813EEe122ea547AE16805702A70,
            "Sang"
        );

        Assert.equal(
            supplyChain.usersCount(),
            1,
            "Contract should have 1 user"
        );
    }
}
