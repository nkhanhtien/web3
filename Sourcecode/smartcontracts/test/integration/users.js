// test/integration/users.js
const SupplyChain = artifacts.require("SupplyChain");

contract("addUser", () => {
  it("can create user", async () => {
    const storage = await SupplyChain.deployed();

    const tx = await storage.addUser(
      0,
      0x7c4d7bda8bb26813eee122ea547ae16805702a70,
      "test"
    );

    console.log(tx);
  });
});
