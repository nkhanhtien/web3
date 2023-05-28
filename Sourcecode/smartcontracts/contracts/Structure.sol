// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

library Structure {
    struct User {
        Role role;
        address userAddress;
        string name;
    }

    struct Product {
        string id;
        string name;
        address manufacturerAddress;
        string manufacturerName;
        address thirdPartyAddress;
        string thirdPartyName;
        address deliveryHubAddress;
        string deliveryHubName;
        address customerAddress;
        string customerName;
        address owner;
        ProductState state;
        bool deliveryStatus;
    }

    enum ProductState {
        Manufactured,
        PurchasedByThirdParty,
        PurchasedByCustomer,
        ShippedByDeliveryHub,
        ReceivedByCustomer
    }

    enum Role {
        Manufacturer,
        ThirdParty,
        DeliveryHub,
        Customer
    }
}
