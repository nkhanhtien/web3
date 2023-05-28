module.exports = {
  networks: {
    development: {
      host: "INPUT_YOUR_IP_ADDRESS_HERE",
      port: 8545,
      network_id: "*",
    },
  },

  compilers: {
    solc: {
      version: "0.8.18"
    }
  }
};
