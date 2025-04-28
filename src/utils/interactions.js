import { ethers } from "ethers";
import { providerRpc, getSigner } from "./web3connect";
import abi from "../contracts/Baladomino.json"

const contractAddress = "0x05ffA72597e6ca58D104D2889947E30C0E785737";

export const getAllGames = async () => {
    try {
        const provider = await providerRpc();
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const games = await contract.getAllGames();
        console.log("All games:", games);
        return games;
    } catch (error) {
        console.error("Failed get data:", error);
        return null;
    }
};

export const getGamesOpen = async () => {
    try {
        const provider = await providerRpc();
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const games = await contract.getOpenGames();
        console.log("Opened games:", games);
        return games;
    } catch (error) {
        console.error("Failed get data:", error);
        return null;
    }
};

export const getGamesByPlayer = async (address) => {
    try {
        const provider = await providerRpc();
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const games = await contract.getGamesByPlayer(address);
        console.log("Opened games:", games);
        return games;
    } catch (error) {
        console.error("Failed get data:", error);
        return null;
    }
};

export const getLeaderboard = async () => {
    try {
        const provider = await providerRpc();
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const result = await contract.getSortedLeaderboard();
        console.log("Leaderboard:", result);
        return result;
    } catch (error) {
        console.error("Failed get data:", error);
        return null;
    }
};

export const getGamesById = async (id) => {
    try {
        const provider = await providerRpc();
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const a = await contract.games(id);
        return a;
    } catch (error) {
        return null;
    }
}

export const joinBattle = async (id, val) => {
    try {
        const signer = await getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const a = await contract.joinGame(id, {
            value: val
        });
        await a.wait();
        return true;
    } catch (error) {
        return false;
    }
}

export const getCard = async (id) => {
    try {
        const signer = await getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const a = await contract.getMyDominoes(id);
        
        return a;
    } catch (error) {
        console.log(error);
        
        return null;
    }
}

export const getCardGameCompleted = async (id, address) => {
    try {
        const provider = await providerRpc();
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const a = await contract.showHandIfGameCompleted(id,address);
        return a;
    } catch (error) {
        return null;
    }
}

export const confirmContinue = async (gameid) => {
    try {
        const signer = await getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const a = await contract.confirmContinue(gameid);
        await a.wait();
        return true;
    } catch (error) {
        return null;
    }
}

export const surrenderGame = async (gameid) => {
    try {
        const signer = await getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const a = await contract.surrender(gameid);
        await a.wait();
        return true;
    } catch (error) {
        return null;
    }
}

export const finishGame = async (gameid) => {
    try {
        const signer = await getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const estimatedGas = await contract.estimateGas.resolveGame(gameid);
        const gasLimit = estimatedGas.add(estimatedGas.div(10)); // Tambah 10% buffer
        console.log(gasLimit);
        
        const a = await contract.resolveGame(gameid, {
            gasLimit: gasLimit
        });
        await a.wait();
        return true;
    } catch (error) {
        console.log(error);
        
        return null;
    }
}

export const createRoom = async (tier) => {

    let t = null;
    let amount = tier.toString();

    if (tier == 0.01) {
        t = 0;
    } else if(tier == 0.1) {
        t = 1;
    }else if(tier == 0.5) {
        t = 2;
    }else if(tier == 1) {
        t = 3;
    }else if(tier == 2) {
        t = 4;
    }else if(tier == 5) {
        t = 5;
    }else if(tier == 10) {
        t = 6;
    }else{
        t = null;
    }

    try {
        const signer = await getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const interact = await contract.createGame(t,{
            value: ethers.utils.parseEther(amount)
        });
        await interact.wait();
        return true;
    } catch (error) {
        alert("Transaction failed!");
        return false;
    }
}

export const getBlockNumber = async () => {
    try {
        const provider = await providerRpc();
        const b = await provider.getBlockNumber();
        return Number(b);
    } catch (error) {
        return null;
    }
}

export const sleep = async (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}