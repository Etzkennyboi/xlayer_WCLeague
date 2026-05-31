"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONFIG, ABIS } from './config';

const Web3Context = createContext();

export function Web3Provider({ children }) {
    const [wallet, setWallet] = useState({
        connected: false,
        address: null,
        chainId: null,
        balance: '0'
    });

    const connectWallet = async () => {
        try {
            if (!window.ethereum) throw new Error("MetaMask is not installed");
            
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const accounts = await provider.send("eth_requestAccounts", []);
            let network = await provider.getNetwork();
            
            if (network.chainId !== CONFIG.XLAYER_TESTNET_ID) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: ethers.utils.hexValue(CONFIG.XLAYER_TESTNET_ID) }],
                    });
                } catch (switchError) {
                    throw new Error("Please switch to X Layer Testnet in your wallet.", { cause: switchError });
                }
                // Wait for the provider to sync with the new network
                await new Promise(resolve => setTimeout(resolve, 1000));
                network = await provider.getNetwork();
            }
            
            const balance = await provider.getBalance(accounts[0]);
            
            setWallet({
                connected: true,
                address: accounts[0],
                chainId: network.chainId,
                balance: ethers.utils.formatEther(balance)
            });
            
            return { success: true };
        } catch (error) {
            console.error("Connection failed", error);
            return { success: false, error: error.message };
        }
    };

    const mintNFT = async (userAddress, badgeType, matchInfo) => {
        try {
            const response = await fetch('/api/mint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userAddress, badgeType, matchInfo })
            });
            const data = await response.json();
            
            if (data.success) {
                return { success: true, txHash: data.txHash, mock: data.mock };
            } else {
                throw new Error(data.error || "Mint failed on backend");
            }
        } catch (error) {
            console.error("Mint failed", error);
            // Even if it fails (e.g. no backend keys configured), fallback so user gets the UI reward
            console.log("Falling back to mock mint due to error...");
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { success: true, mock: true, error: error.message };
        }
    };

    const placeBetOnChain = async (marketId, isYes) => {
        try {
            if (!window.ethereum) throw new Error("Wallet not connected");
            
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner();
            
            const usdt = new ethers.Contract(CONFIG.USDT_ADDRESS, ABIS.ERC20, signer);
            const market = new ethers.Contract(CONFIG.PREDICTION_MARKET_ADDRESS, ABIS.PredictionMarket, signer);
            
            const amountWei = ethers.utils.parseUnits("10", 18);
            
            const approveTx = await usdt.approve(CONFIG.PREDICTION_MARKET_ADDRESS, amountWei);
            await approveTx.wait();
            
            const outcome = isYes ? 1 : 2;
            const betTx = await market.placeBet(marketId, outcome, amountWei);
            await betTx.wait();
            
            return { success: true };
        } catch (error) {
            console.error("Bet failed", error);
            return { success: false, error: error.message };
        }
    };

    return (
        <Web3Context.Provider value={{ wallet, connectWallet, mintNFT, placeBetOnChain }}>
            {children}
        </Web3Context.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWeb3() {
    return useContext(Web3Context);
}
