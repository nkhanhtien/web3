const SupplyChain = artifacts.require("SupplyChain");


contract('Supplychain', () => {
    // it('Should create user', async () => {
    //     const supplyChainInstance = await SupplyChain.deployed();
    //     await supplyChainInstance.addUser(1, '0x7c4D7bda8BB26813EEe122ea547AE16805702A70', 'Sang');
    //     assert.equal(await supplyChainInstance.usersCount(), 1);
    // });

    it('Should test', async () => {
        const supplyChainInstance = await SupplyChain.deployed();
        await supplyChainInstance.addUser(0, '0x7c4D7bda8BB26813EEe122ea547AE16805702A70', 'Sang');
        await supplyChainInstance.addProduct('ABC', 'ADIDAS', '0x7c4D7bda8BB26813EEe122ea547AE16805702A70');
        var result = await supplyChainInstance.getAllProducts();
        console.log(result);
    });
});