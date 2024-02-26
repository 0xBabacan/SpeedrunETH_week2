// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat"); // THIS TIME IT`S NOT "es6", IT IS 'commonjs"
const { ethers } = require("ethers");

async function main() {
    const hardhatSigner = (await hre.ethers.getSigners())[0];
    const hardhatSignerAddr = hardhatSigner.address;
    const hardhatSignerBalance = await hardhatSigner.provider.getBalance(hardhatSignerAddr);
    console.log("hardhatSigner Balance:", ethers.formatEther(hardhatSignerBalance));
  
    const acc1Addr = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    const tx = await hardhatSigner.sendTransaction({
        to: acc1Addr,
        value: ethers.parseUnits(ethers.formatEther(hardhatSignerBalance/100n), 'ether')
    });
    console.log("TX Sent!");
    await tx.wait();
    console.log("TX Mined!");
    console.log("hardhatSigner Balance:", ethers.formatEther(await hardhatSigner.provider.getBalance(hardhatSignerAddr)));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
