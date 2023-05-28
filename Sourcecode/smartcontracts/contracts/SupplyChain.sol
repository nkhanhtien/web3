// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Structure.sol";

/// @author Truong Manh Sang
/// @title Supply Chain contract
contract SupplyChain {
    constructor() {
        owner = msg.sender;
        uid = 1;
        usersCount = 0;
        productsCount = 0;
    }

    mapping(string => Structure.Product) productsMapping;
    mapping(string => uint256) productsIndexMapping;
    mapping(address => Structure.User) public usersMapping;
    uint256 public uid;
    address owner;
    Structure.User[] users;
    uint256 public usersCount;
    Structure.Product[] products;
    uint256 public productsCount;

    modifier verifyValidRole(uint256 role) {
        require(
            role == 0 || role == 1 || role == 2 || role == 3,
            "Role is invalid"
        );
        _;
    }
    modifier verifyUserNotExists(address account) {
        require(
            usersMapping[account].userAddress == address(0),
            "User is exists"
        );
        _;
    }
    modifier verifyProductIdUnique(string memory productId) {
        require(!isProductIdExist(productId), "Product id exists");
        _;
    }
    modifier hasRole(address account, Structure.Role role) {
        require(
            usersMapping[account].userAddress != address(0) &&
                usersMapping[account].role == role,
            "User doesn't have required role"
        );
        _;
    }
    modifier productExists(string memory productId) {
        require(
            productsMapping[productId].owner != address(0),
            "Product doesn't exists"
        );
        _;
    }

    /// Add new user
    /// @param role The role for user in int
    ///             0: Manufacturer
    ///             1: ThirdParty
    ///             2: DeliveryHub
    ///             3: Customer
    /// @param userAddress Wallet address of user
    /// @param name Name of user
    function addUser(
        uint256 role,
        address userAddress,
        string memory name
    ) public verifyValidRole(role) verifyUserNotExists(userAddress) {
        Structure.User memory user;
        if (role == 0) {
            user.role = Structure.Role.Manufacturer;
        } else if (role == 1) {
            user.role = Structure.Role.ThirdParty;
        } else if (role == 2) {
            user.role = Structure.Role.DeliveryHub;
        } else if (role == 3) {
            user.role = Structure.Role.Customer;
        }
        user.userAddress = userAddress;
        user.name = name;
        users.push(user);
        usersCount++;

        usersMapping[userAddress] = user;
    }

    /// Purchase the product by third party
    /// @param account Wallet address of third party
    /// @param productId Product Id
    function purchaseByThirdParty(
        address account,
        string memory productId
    )
        public
        hasRole(account, Structure.Role.ThirdParty)
        productExists(productId)
    {
        Structure.User memory user = usersMapping[account];

        productsMapping[productId].state = Structure
            .ProductState
            .PurchasedByThirdParty;
        productsMapping[productId].thirdPartyAddress = account;
        productsMapping[productId].thirdPartyName = user.name;
        productsMapping[productId].owner = account;

        products[productsIndexMapping[productId]] = productsMapping[productId];
    }

    /// Purchase the product by customer
    /// @param account Wallet address of customer
    /// @param productId Product Id
    function purchaseByCustomer(
        address account,
        string memory productId
    )
        public
        hasRole(account, Structure.Role.Customer)
        productExists(productId)
    {
        Structure.User memory user = usersMapping[account];

        productsMapping[productId].state = Structure
            .ProductState
            .PurchasedByCustomer;
        productsMapping[productId].customerAddress = account;
        productsMapping[productId].customerName = user.name;
        productsMapping[productId].owner = account;
        productsMapping[productId].deliveryStatus = false;

        products[productsIndexMapping[productId]] = productsMapping[productId];
    }

    /// Ship by delivery hub
    /// @param account Wallet address of delivery hub
    /// @param productId Product Id
    function shipByDeliveryHub(
        address account,
        string memory productId
    )
        public
        hasRole(account, Structure.Role.DeliveryHub)
        productExists(productId)
    {
        Structure.User memory user = usersMapping[account];

        productsMapping[productId].state = Structure
            .ProductState
            .ShippedByDeliveryHub;
        productsMapping[productId].deliveryHubAddress = account;
        productsMapping[productId].deliveryHubName = user.name;
        productsMapping[productId].owner = account;
        productsMapping[productId].deliveryStatus = true;

        products[productsIndexMapping[productId]] = productsMapping[productId];
    }

    /// Receive by customer
    /// @param account Wallet address of customer
    /// @param productId Product Id
    function receiveByCustomer(
        address account,
        string memory productId
    )
        public
        hasRole(account, Structure.Role.Customer)
        productExists(productId)
    {
        productsMapping[productId].state = Structure
            .ProductState
            .ReceivedByCustomer;
        productsMapping[productId].owner = account;
        products[productsIndexMapping[productId]] = productsMapping[productId];
    }

    /// Add new product
    /// @param id Product Id
    /// @param name Product Name
    /// @param account Wallet address of manufacturer
    function addProduct(
        string memory id,
        string memory name,
        address account
    )
        public
        verifyProductIdUnique(id)
        hasRole(account, Structure.Role.Manufacturer)
    {
        Structure.User memory user = usersMapping[account];
        Structure.Product memory product;

        product.id = id;
        product.name = name;
        product.manufacturerAddress = account;
        product.manufacturerName = user.name;
        product.owner = account;
        product.state = Structure.ProductState.Manufactured;
        products.push(product);
        productsCount++;

        productsMapping[id] = product;
        productsIndexMapping[id] = productsCount - 1;
    }

    /// Get all products
    /// @return Product Product list
    function getAllProducts() public view returns (Structure.Product[] memory) {
        return products;
    }

    /// Check product exist
    /// @param id Product Id
    /// @return bool True: product is exist - False: product isn't exist
    function isProductIdExist(string memory id) public view returns (bool) {
        for (uint256 i = 0; i < productsCount; i++) {
            if (keccak256(bytes(products[i].id)) == keccak256(bytes(id))) {
                return true;
            }
        }
        return false;
    }

    /// Validate if a user address has been registered with some role.
    /// @param account User address
    /// @return bool True: if user exists
    function isValidUser(address account) public view returns (bool) {
        if (usersMapping[account].userAddress == address(0)) {
            return false;
        }

        return true;
    }
}
