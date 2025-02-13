// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.


const hre = require("hardhat"); // THIS TIME IT`S NOT "es6", IT IS 'commonjs"
const { ethers } = require("ethers");

async function main() {
    const localProviderUrl = "http://127.0.0.1:8545/";
    const localProvider = new ethers.JsonRpcProvider(localProviderUrl);

    const account0Address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const account0Balance = await localProvider.getBalance(account0Address);
    console.log("account0Balance:", ethers.formatEther(account0Balance));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
