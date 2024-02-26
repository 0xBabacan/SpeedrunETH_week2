import 'dotenv/config';     // To hide secret keys in env
import {BigNumber, ethers} from "ethers";

// To instantiate the Infura Provider
const infuraID = process.env.INFURA_KEY;
const infuraUrl = 'https://mainnet.infura.io/v3/' + infuraID;
const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
/* An alternative way
const provider = new ethers.providers.InfuraProvider(
    "homestead",
    process.env.INFURA_KEY
);
*/

console.log("Current block number", await provider.getBlockNumber());
console.log("-----");

const addr = await provider.resolveName("atg.eth");
console.log("atg.eth is", addr);
console.log("owner of", addr, "is", await provider.lookupAddress(addr));
console.log("-----");

// ETH (Readable No) —> wei (Big No)
console.log("1.0 ETH is", ethers.utils.parseEther("1.0").toString(), "wei (Big Number)");

let bigNumber = BigNumber.from(100);
const vitalikBalance = (await provider.getBalance("vitalik.eth"));
// wei (Big No) —> ETH (Readable No)
console.log("balance of vitalik.eth is", ethers.utils.formatEther(vitalikBalance), "ETH");       

if (vitalikBalance > bigNumber) {
    console.log("Vitalik's balance is bigger than", bigNumber.toString());
} else {
    console.log("Vitalik's balance is smaller than", bigNumber.toString());
}
console.log("-----");
