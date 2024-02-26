import {ethers} from "ethers";
import { getProvider, getSigner } from './utils.js';
// ABI = Application Binary Interface
import merklyNFTAbi from "./abi/merklyNFTAbi.js";    // https://goerli.etherscan.io/address/0x885ef5813e46ab6efb10567b50b77aaad4d258ce#code

const merklyNFTAddress = "0x885ef5813E46ab6EFb10567b50b77aAAD4d258ce"; // @goerli testnet network
const goerliProvider = getProvider(false);

const merklyContract = new ethers.Contract( 
    merklyNFTAddress,
    merklyNFTAbi,
    goerliProvider 
);

const NFTMintFee = await merklyContract.fee();
console.log("NFT Mint Fee:", ethers.utils.formatEther(NFTMintFee));
