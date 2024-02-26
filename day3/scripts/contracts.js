const hre = require("hardhat"); // THIS TIME IT`S NOT "es6", IT IS 'commonjs"
const { ethers } = require("ethers");

async function main() {
    const contractAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
    const lock = await hre.ethers.getContractAt("Lock", contractAddress)
    /* ALTERNATIVE WAY
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
    */

/*
    console.log(await lock.getGreeting());
    console.log("Changing..");
    const setTx = await lock.setGreeting("hey");
    await setTx.wait();
    console.log(await lock.getGreeting());
*/
    const withdrawTx = await lock.withdraw();
    await withdrawTx.wait();
    console.log("All TXs mined!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
