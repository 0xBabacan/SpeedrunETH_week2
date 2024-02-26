import {BigNumber, ethers} from "ethers";
import { getProvider, getSigner } from './utils.js';
// ABI = Application Binary Interface
import merklyNFTAbi from "./abi/merklyNFTAbi.js";    // https://goerli.etherscan.io/address/0x885ef5813e46ab6efb10567b50b77aaad4d258ce#code
import { parseEther } from 'ethers/lib/utils.js';

// SAMPLE OUTPUT: https://goerli.etherscan.io/tx/0x971620c398c27827c830d9ff0f081e272e83cd21b8706a94f1f61f8cca4248ea

const merklyNFTAddress = "0x885ef5813E46ab6EFb10567b50b77aAAD4d258ce"; // @goerli testnet network
const goerliSigner = getSigner(false);

const merklyContract = new ethers.Contract( 
    merklyNFTAddress,
    merklyNFTAbi,
    goerliSigner 
);
console.log("1-Signer  Balance:", ethers.utils.formatEther(await goerliSigner.getBalance()));
const NFTMintFee = await merklyContract.fee();

console.log("Minting NFT...");
const mintTx = await merklyContract.mint({
    value: NFTMintFee
});
/* ALTERNATIVE WAY
const mintTx = await merklyContract.mint({
    fee: ethers.utils.parseEther(0.0005)
});
*/
console.log("TX sent", mintTx.hash);
await mintTx.wait();
console.log("TX mined!");
console.log("2-Signer  Balance:", ethers.utils.formatEther(await goerliSigner.getBalance()));
console.log("-----");

const mintCallData = "0x1249c58b";  // Just go https://emn178.github.io/online-tools/keccak_256.html and write "mint()" and see the output
console.log("Minting NFT with call data...");
const mintTx_CalllData = await goerliSigner.sendTransaction({
    to: merklyNFTAddress,
    value: NFTMintFee,
    data: mintCallData
});
console.log("TX Sent", mintTx_CalllData.hash);
await mintTx_CalllData.wait();
console.log("TX mined!");
console.log("3-Signer  Balance:", ethers.utils.formatEther(await goerliSigner.getBalance()));
