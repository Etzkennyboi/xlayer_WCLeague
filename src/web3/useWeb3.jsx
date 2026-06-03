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
        balance: '0',
        loading: true
    });

    const verifyAndSwitchNetwork = async () => {
        if (!window.ethereum) throw new Error("MetaMask is not installed");
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const network = await provider.getNetwork();
        
        if (network.chainId !== CONFIG.XLAYER_MAINNET_ID) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: ethers.utils.hexValue(CONFIG.XLAYER_MAINNET_ID) }],
                });
                // Wait for the provider to sync with the new network
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (switchError) {
                // Error code 4902 indicates that the chain has not been added to MetaMask
                if (switchError.code === 4902 || switchError.message?.includes('4902') || switchError.message?.includes('wallet_addEthereumChain')) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: ethers.utils.hexValue(CONFIG.XLAYER_MAINNET_ID),
                                chainName: 'X Layer Mainnet',
                                nativeCurrency: {
                                    name: 'OKB',
                                    symbol: 'OKB',
                                    decimals: 18
                                },
                                rpcUrls: [CONFIG.XLAYER_RPC],
                                blockExplorerUrls: ['https://www.oklink.com/xlayer']
                            }]
                        });
                        // Wait for the provider to sync with the new network
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    } catch (addError) {
                        throw new Error("Could not add X Layer Mainnet to your wallet.", { cause: addError });
                    }
                } else {
                    throw new Error("Please switch to X Layer Mainnet in your wallet.", { cause: switchError });
                }
            }
        }
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) throw new Error("MetaMask is not installed");
            
            setWallet(prev => ({ ...prev, loading: true }));
            
            // Switch network if needed
            await verifyAndSwitchNetwork();
            
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const accounts = await provider.send("eth_requestAccounts", []);
            const network = await provider.getNetwork();
            const balance = await provider.getBalance(accounts[0]);
            
            setWallet({
                connected: true,
                address: accounts[0],
                chainId: network.chainId,
                balance: ethers.utils.formatEther(balance),
                loading: false
            });
            
            localStorage.setItem('wallet_connected_before', 'true');
            return { success: true, address: accounts[0] };
        } catch (error) {
            console.warn("Connection failed", error);
            setWallet(prev => ({ ...prev, loading: false }));
            return { success: false, error: error.message || String(error) };
        }
    };

    const switchNetwork = async () => {
        try {
            await verifyAndSwitchNetwork();
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
                const accounts = await provider.listAccounts();
                const network = await provider.getNetwork();
                if (accounts.length > 0) {
                    const balance = await provider.getBalance(accounts[0]);
                    setWallet(prev => ({
                        ...prev,
                        chainId: network.chainId,
                        balance: ethers.utils.formatEther(balance)
                    }));
                }
            }
            return { success: true };
        } catch (error) {
            console.warn("Network switch failed", error);
            return { success: false, error: error.message || String(error) };
        }
    };

    const disconnectWallet = useCallback(() => {
        setWallet({
            connected: false,
            address: null,
            chainId: null,
            balance: '0',
            loading: false
        });
        localStorage.removeItem('wallet_connected_before');
    }, []);

    // Eager connection check and MetaMask Event Listeners
    useEffect(() => {
        const eagerConnect = async () => {
            if (!window.ethereum) {
                setWallet(prev => ({ ...prev, loading: false }));
                return;
            }
            const isConnectedBefore = localStorage.getItem('wallet_connected_before') === 'true';
            if (!isConnectedBefore) {
                setWallet(prev => ({ ...prev, loading: false }));
                return;
            }

            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
                const accounts = await provider.listAccounts();
                if (accounts.length > 0) {
                    const network = await provider.getNetwork();
                    const balance = await provider.getBalance(accounts[0]);
                    setWallet({
                        connected: true,
                        address: accounts[0],
                        chainId: network.chainId,
                        balance: ethers.utils.formatEther(balance),
                        loading: false
                    });
                } else {
                    setWallet(prev => ({ ...prev, loading: false }));
                }
            } catch (err) {
                console.warn("Eager connection failed", err);
                setWallet(prev => ({ ...prev, loading: false }));
            }
        };

        eagerConnect();

        if (!window.ethereum) return;

        const handleAccountsChanged = async (accounts) => {
            if (accounts.length === 0) {
                disconnectWallet();
            } else {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
                    const network = await provider.getNetwork();
                    const balance = await provider.getBalance(accounts[0]);
                    setWallet({
                        connected: true,
                        address: accounts[0],
                        chainId: network.chainId,
                        balance: ethers.utils.formatEther(balance),
                        loading: false
                    });
                    localStorage.setItem('wallet_connected_before', 'true');
                } catch (err) {
                    console.warn("Account change sync failed", err);
                }
            }
        };

        const handleChainChanged = () => {
            // MetaMask standard recommendation is to reload the page to clean up cache/state
            window.location.reload();
        };

        const handleDisconnect = () => {
            disconnectWallet();
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
        window.ethereum.on('disconnect', handleDisconnect);

        return () => {
            if (window.ethereum.removeListener) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
                window.ethereum.removeListener('disconnect', handleDisconnect);
            }
        };
    }, [disconnectWallet]);

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

    const placeBetOnChain = async (marketId, outcomeIndex, amountInEther) => {
        try {
            if (!window.ethereum) throw new Error("Wallet not connected");
            
            await verifyAndSwitchNetwork();
            
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner();
            
            const market = new ethers.Contract(CONFIG.PREDICTION_MARKET_ADDRESS, ABIS.PredictionMarket, signer);
            const amountWei = ethers.utils.parseEther(amountInEther.toString());
            
            const betTx = await market.placeBet(marketId, outcomeIndex, { value: amountWei });
            await betTx.wait();
            
            // Refresh balance after transaction
            const newBalance = await provider.getBalance(await signer.getAddress());
            setWallet(prev => ({ ...prev, balance: ethers.utils.formatEther(newBalance) }));

            return { success: true, txHash: betTx.hash };
        } catch (error) {
            console.warn("Bet failed or rejected", error);
            const errorMessage = error?.data?.message || error?.message || error?.reason || String(error);
            return { success: false, error: errorMessage };
        }
    };

    const claimPredictionWinnings = async (marketId) => {
        try {
            if (!window.ethereum) throw new Error("Wallet not connected");
            
            await verifyAndSwitchNetwork();
            
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner();
            
            const market = new ethers.Contract(CONFIG.PREDICTION_MARKET_ADDRESS, ABIS.PredictionMarket, signer);
            const claimTx = await market.claimWinnings(marketId);
            await claimTx.wait();
            
            // Refresh balance after transaction
            const newBalance = await provider.getBalance(await signer.getAddress());
            setWallet(prev => ({ ...prev, balance: ethers.utils.formatEther(newBalance) }));

            return { success: true, txHash: claimTx.hash };
        } catch (error) {
            console.warn("Claim failed or rejected", error);
            const errorMessage = error?.data?.message || error?.message || error?.reason || String(error);
            return { success: false, error: errorMessage };
        }
    };

    const getOnChainUserBet = async (marketId, userAddress) => {
        try {
            const provider = new ethers.providers.StaticJsonRpcProvider(CONFIG.XLAYER_RPC, {
                name: CONFIG.XLAYER_MAINNET_ID === 196 ? "xlayer" : "xlayer_test",
                chainId: CONFIG.XLAYER_MAINNET_ID
            });
            const marketContract = new ethers.Contract(CONFIG.PREDICTION_MARKET_ADDRESS, ABIS.PredictionMarket, provider);
            const bet = await marketContract.bets(marketId, userAddress);
            return {
                hasBet: bet.amount.gt(0),
                selection: bet.selection, // 1 = Home, 2 = Away, 3 = Draw
                amount: ethers.utils.formatEther(bet.amount),
                claimed: bet.claimed
            };
        } catch (error) {
            console.error("Error reading user bet from contract:", error);
            return { hasBet: false, selection: 0, amount: "0", claimed: false };
        }
    };

    const sendBetToTreasury = async (amountInEther) => {
        try {
            if (!window.ethereum) throw new Error("Wallet not connected");
            
            await verifyAndSwitchNetwork();
            
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner();
            
            const amountWei = ethers.utils.parseEther(Number(amountInEther).toFixed(6));
            const tx = await signer.sendTransaction({
                to: CONFIG.TREASURY_ADDRESS,
                value: amountWei
            });
            
            await tx.wait();
            
            // Refresh balance after transaction
            const newBalance = await provider.getBalance(await signer.getAddress());
            setWallet(prev => ({ ...prev, balance: ethers.utils.formatEther(newBalance) }));

            return { success: true, txHash: tx.hash };
        } catch (error) {
            console.warn("Treasury transfer failed or rejected", error);
            const errorMessage = error?.data?.message || error?.message || error?.reason || String(error);
            return { success: false, error: errorMessage };
        }
    };

    return (
        <Web3Context.Provider value={{ wallet, connectWallet, switchNetwork, disconnectWallet, mintNFT, placeBetOnChain, claimPredictionWinnings, getOnChainUserBet, sendBetToTreasury }}>
            {children}
        </Web3Context.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWeb3() {
    return useContext(Web3Context);
}
