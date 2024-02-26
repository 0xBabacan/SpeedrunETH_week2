const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {

  it("Should revert if the counter is not updated", async function () {
    const [signer0, signer1] = await ethers.getSigners();
    console.log("deploying contract as", signer0.address);

    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(10);
    expect(await counter.get()).to.equal(10);

    const incTx = await counter.inc();
    await incTx.wait();
    expect(await counter.get()).to.equal(11);
    expect(await counter.boss()).to.equal(signer0.address);

    const dec0Tx = await counter.connect(signer0).dec(); // will work
    const dec1Tx = await counter.connect(signer1).dec(); // will give an error 'Sorry, not the boss'
  });
});
