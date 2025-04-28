import Web3 from "web3";
import { ref } from "vue";
import { ethers } from "ethers";

export const web3 = ref(null);
export const account = ref(null);


export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      // Paksa MetaMask selalu menampilkan pop-up untuk memilih akun
      await window.ethereum.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: [] }] });

      web3.value = new Web3(window.ethereum);
      const accounts = await web3.value.eth.getAccounts();
      account.value = accounts[0].toLowerCase();

      // Simpan status koneksi di localStorage untuk auto-reconnect
      localStorage.setItem("connected", "true");

      await switchChain(10143);

      return web3.value;
    } catch (error) {
      console.error("User rejected the connection", error);
    }
  } else {
    alert("MetaMask atau EVM Wallet tidak terdeteksi. Harap instal terlebih dahulu.");
  }
};


export const disconnectWallet = async () => {
  web3.value = null;
  account.value = null;
  localStorage.removeItem("connected");
};



const switchChain = async (chainId) => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(chainId) }],
      });
      
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: Web3.utils.toHex(chainId),
                chainName: "Monad Testnet",
                rpcUrls: ["https://testnet-rpc.monad.xyz"],
                blockExplorerUrls: ["https://testnet.monadexplorer.com"],
                nativeCurrency: {
                  name: "Monad",
                  symbol: "MON",
                  decimals: 18,
                },
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add custom chain", addError);
        }
      } else {
        console.error("Failed to switch chain", error);
      }
    }
  }
};

export const autoConnect = async () => {
  if (localStorage.getItem("connected") === "true" && window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        web3.value = new Web3(window.ethereum);
        account.value = accounts[0];
      } else {
        localStorage.removeItem("connected");
      }
    } catch (error) {
      console.error("Gagal menghubungkan ulang akun", error);
    }
  }
};

export const getSigner = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider.getSigner();
}

export const providerRpc = async () => {
  return new ethers.providers.JsonRpcProvider("https://testnet-rpc.monad.xyz");
}
