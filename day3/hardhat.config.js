require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat", //defaultNetwork: "localhost",
  networks: {
    goerli: {
      url: 'https://goerli.infura.io/v3/'+process.env.INFURA_KEY,
      accounts: [process.env.MY_WALLET_PRIVATE_KEY]
    }
  },
  solidity: "0.8.19",
};
