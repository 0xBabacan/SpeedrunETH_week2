import 'dotenv/config';
import {ethers} from "ethers";


const generateNewWallet = () => {
    const randomWallet = ethers.Wallet.createRandom();

    console.log("address:", randomWallet.address);
    console.log("private key:", randomWallet.privateKey);
    console.log("mnemonic.phrase:", randomWallet.mnemonic.phrase);
};

const getProvider = (mainnet = false) => {
    const providerUrl = mainnet
        ? 'https://mainnet.infura.io/v3/'+process.env.INFURA_KEY
        : 'https://goerli.infura.io/v3/'+process.env.INFURA_KEY

    return new ethers.providers.JsonRpcProvider(providerUrl);
};

const getSigner = (mainnet = false, privateKey = process.env.MY_WALLET_PRIVATE_KEY) => {
    const provider = getProvider(mainnet);

    return new ethers.Wallet(privateKey, provider);
};

export { generateNewWallet, getProvider, getSigner };

//const signer = getSigner();
//console.log("Signer address: ", await signer.getAddress());
//const provider = getProvider(true);
//console.log("Provider Network: ", await provider.getNetwork());
