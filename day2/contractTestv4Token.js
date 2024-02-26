import {ethers} from "ethers";
import { getProvider, getSigner } from './utils.js';
// ABI = Application Binary Interface
import testv4TokenAbi from "./abi/testv4TokenAbi.js";    // https://goerli.etherscan.io/address/0x499d11e0b6eac7c0593d8fb292dcbbf815fb29ae#code

const testv4TokenAddress = "0x499d11E0b6eAC7c0593d8Fb292DCBbF815Fb29Ae"; // @goerli testnet network

const mainnetProvider = getProvider(true);
const vitalikAddress = await mainnetProvider.resolveName("vitalik.eth");
const goerliProvider = getProvider(false);
const goerliSigner = getSigner(false);

const testv4TokenContract = new ethers.Contract( 
    testv4TokenAddress,
    testv4TokenAbi,
    goerliProvider 
);

console.log("My Address:\t", goerliSigner.address);
console.log("My Balance:\t", ethers.utils.formatEther(await goerliSigner.getBalance()));
console.log("My testv4 Token Balance:\t", ethers.utils.formatEther(await testv4TokenContract.balanceOf(goerliSigner.address)));
console.log("Vitalik's testv4 Token Balance:\t", ethers.utils.formatEther(await testv4TokenContract.balanceOf(vitalikAddress)));

const testv4TokenContract_Signer = new ethers.Contract( 
    testv4TokenAddress,
    testv4TokenAbi,
    goerliSigner 
);

console.log("Sending testv4 Token ...");
const testv4TokenTransfer = await testv4TokenContract_Signer.transfer(vitalikAddress, ethers.utils.parseEther("0.01"));
console.log("TX sent", testv4TokenTransfer.hash);
await testv4TokenTransfer.wait();
console.log("TX mined!");

console.log("My testv4 Token Balance:\t", ethers.utils.formatEther(await testv4TokenContract.balanceOf(goerliSigner.address)));
console.log("Vitalik's testv4 Token Balance:\t", ethers.utils.formatEther(await testv4TokenContract.balanceOf(vitalikAddress)));
/* ALTERNATIVE WAY
console.log("My testv4 Token Balance:\t", ethers.utils.formatEther(await testv4TokenContract_Signer.balanceOf(goerliSigner.address)));
console.log("Vitalik's testv4 Token Balance:\t", ethers.utils.formatEther(await testv4TokenContract_Signer.balanceOf(vitalikAddress)));
*/
