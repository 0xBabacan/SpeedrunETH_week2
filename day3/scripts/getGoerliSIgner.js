// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.


const hre = require("hardhat"); // THIS TIME IT`S NOT "es6", IT IS 'commonjs"
const { ethers } = require("ethers");

async function main() {
    const signer = (await hre.ethers.getSigners())[0];
    const signerAddr = signer.address;
    const signerBalance = await signer.provider.getBalance(signerAddr);
    
    console.log("Balance:", ethers.formatEther(signerBalance));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
