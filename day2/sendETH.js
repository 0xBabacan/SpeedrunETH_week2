import {BigNumber, ethers} from "ethers";
import { getProvider, getSigner } from './utils.js';

const mainnetProvider = getProvider(true);
const goerliSigner = getSigner(false);
const goerliSignerBalance = await goerliSigner.getBalance();

console.log("Goerli address:\t", goerliSigner.address);
console.log("Goerli balance:\t", ethers.utils.formatEther(goerliSignerBalance));

// Resolving names can be done only in mainnet, but the address is the same and can be used in other networks
const vitalikAddress = await mainnetProvider.resolveName("vitalik.eth");

console.log("Sending ETH to:\t", vitalikAddress);
const tx = await goerliSigner.sendTransaction({
    to: vitalikAddress,
    value: goerliSignerBalance.div(BigNumber.from(100))       // divide by 100
}); 

// When the code reaches here, that doesnt mean the transaction is done, it has been just sent
console.log("***TX Sent - Hash:", tx.hash)
await tx.wait();    // Wait until the transaction is completed
console.log("***TX Confirmed");
console.log("Goerli balance after TX", ethers.utils.formatEther(goerliSigner.getBalance()));
