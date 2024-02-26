import 'dotenv/config';     // To hide secret keys in env
import {BigNumber, ethers} from "ethers";

const randomWallet = ethers.Wallet.createRandom();

console.log("address:", randomWallet.address);
console.log("private key:", randomWallet.privateKey);
console.log("mnemonic.phrase:", randomWallet.mnemonic.phrase);
console.log("mnemonic.path:", randomWallet.mnemonic.path);
console.log("--0--");

let defaultPath, myWallet, privateKey8;
for (let i=0; i<10; i++) {
    // While path changing, corresponding address & private key are changing
    defaultPath = `m/44'/60'/0'/0/${i}`;
    myWallet = ethers.Wallet.fromMnemonic(randomWallet.mnemonic.phrase, defaultPath)
    console.log("address:", i, myWallet.address);
    console.log("private key:", i, myWallet.privateKey);
    if (i == 8)     // Random wallet for testing
        privateKey8 = myWallet.privateKey;
}
console.log("--1--");


const signer = new ethers.Wallet(privateKey8);
console.log("address8:", signer.address);
console.log("Is signer", signer._isSigner);    // signer is the local cryptography stuff that signs
console.log("--2--");

// You dont need to be on network to generate this signed message (signature)
const signature = await signer.signMessage("Hello World!");
console.log("Signed Message", signature);
// and anyone who takes this signed message and "Hello World!", can recover and get the wallet8 address from the network
const signerAddress = ethers.utils.verifyMessage("Hello World!", signature);
console.log("Signer Address (=address8)", signerAddress);
console.log("--3--");


const infuraID = process.env.INFURA_KEY;
const mainnetUrl = 'https://mainnet.infura.io/v3/' + infuraID;
const mainnetProvider = new ethers.providers.JsonRpcProvider(mainnetUrl);
const goerliUrl = 'https://goerli.infura.io/v3/' + infuraID;
const goerliProvider = new ethers.providers.JsonRpcProvider(goerliUrl);

const goerliSigner = new ethers.Wallet(process.env.MY_WALLET_PRIVATE_KEY, goerliProvider)   // connected too
/* ALTERNATIVE WAY
const goerliSigner = new ethers.Wallet(process.env.MY_WALLET_PRIVATE_KEY.address);
goerliSigner.connect(goerliProvider);
*/
console.log("Goerli address", goerliSigner.address);
const goerliSignerBalance = await goerliProvider.getBalance(goerliSigner.address);
console.log("Goerli balance", ethers.utils.formatEther(goerliSignerBalance));
console.log("--4--");


// Resolving names can be done only in mainnet, but the address is the same and can be used in other networks
const vitalikAddress = await mainnetProvider.resolveName("vitalik.eth");
console.log("Vitalik address", vitalikAddress);
const tx = await goerliSigner.sendTransaction({
    to: vitalikAddress,
    value: goerliSignerBalance.div(BigNumber.from(100))       // divide by 100
}); 
// When the code reaches here, that doesnt mean the transaction is done, it has been just sent
console.log("***TX Sent");
console.log(tx);
console.log("--5--");
await tx.wait();    // Wait until the transaction is completed
console.log("***TX Confirmed");
console.log(tx);
console.log("Goerli balance after TX", ethers.utils.formatEther(goerliSignerBalance));
