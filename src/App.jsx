"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GameProvider, useGame } from './context/GameContext';
import { useWeb3, Web3Provider } from './web3/useWeb3';
import './index.css';

// Layout & Pages
import ManagerLayout from './layouts/ManagerLayout';
import LandingPage from './components/LandingPage';
import Dashboard from './screens/Dashboard';
import Squad from './screens/Squad';
import Matchday from './screens/Matchday';
import Collection from './screens/Collection';
import PKShooter from './screens/PKShooter';
import FantasyLeague from './screens/FantasyLeague';
import Onboarding from './screens/Onboarding';
import Toast from './components/Toast';


import PostMatchStandings from './components/PostMatchStandings';

function NftMintModal() {
    const { state, dispatch } = useGame();
    const { wallet, mintNFT } = useWeb3();
    const [minting, setMinting] = useState(false);

    if (state.pendingMints.length === 0) return null;
    const pending = state.pendingMints[0];

    const handleMint = async () => {
        if (!wallet.connected) {
            dispatch({ type: 'ADD_TOAST', payload: { message: "Wallet not connected", type: "error" }});
            return;
        }
        setMinting(true);
        const res = await mintNFT(wallet.address, pending.type, pending.info);
        setMinting(false);
        if (res.success) {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#ffffff', '#00ff00']
            });
            const newBadge = { type: pending.type, name: 'Achievement Badge', info: pending.info, date: new Date().toLocaleDateString() };
            dispatch({ type: 'DISMISS_MINT', payload: newBadge });
            dispatch({ type: 'ADD_TOAST', payload: { message: "NFT Minted on X Layer!", type: "success" }});
        } else {
            dispatch({ type: 'ADD_TOAST', payload: { message: "Mint Failed: " + res.error, type: "error" }});
        }
    };

    return (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ y: 50, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} className="text-center max-w-lg bg-white/5 border border-white/10 p-12 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-neonGold via-white to-neonGold animate-[shimmer_2s_infinite]"></div>
                <div className="text-neonGold text-8xl mb-8 drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">🏆</div>
                <h2 className="text-4xl font-heading font-black text-white mb-4">ACHIEVEMENT UNLOCKED</h2>
                <p className="text-xl text-gray-400 mb-8">{pending.info}</p>
                <div className="bg-black/60 rounded-2xl p-6 mb-10 border border-white/5">
                    <div className="text-sm text-gray-500 mb-2 uppercase tracking-widest font-bold">Exclusive Reward</div>
                    <div className="font-bold text-neonGold text-xl animate-pulse">MINT ON X LAYER</div>
                </div>
                <div className="flex gap-4 justify-center">
                    <button onClick={handleMint} disabled={minting} className="px-10 py-4 bg-neonGold text-black font-black rounded-xl hover:scale-105 transition-transform flex-1 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                        {minting ? 'MINTING...' : 'CLAIM NFT NOW'}
                    </button>
                    <button onClick={() => dispatch({ type: 'DISMISS_MINT', payload: { type: pending.type, name: 'Skipped Badge', info: pending.info, date: new Date().toLocaleDateString() } })} className="px-8 py-4 border border-white/20 text-gray-400 hover:text-white rounded-xl transition-colors">
                        SKIP
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

// --- MAIN ROUTER APP ---
function MainApp() {
    const { state } = useGame();
    const [activeTab, setActiveTab] = useState('dashboard');

    if (!state.gameStarted) return <Onboarding />;

    return (
        <>
            <Toast />
            <PostMatchStandings />
            <NftMintModal />
            <ManagerLayout activeTab={activeTab} setActiveTab={setActiveTab}>
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                    >
                        {activeTab === 'dashboard' && <Dashboard />}
                        {activeTab === 'squad' && <Squad />}
                        {activeTab === 'matchday' && <Matchday />}
                        {activeTab === 'collection' && <Collection />}
                        {activeTab === 'pk-shooter' && <PKShooter />}
                        {activeTab === 'fantasy' && <FantasyLeague />}
                    </motion.div>
                </AnimatePresence>
            </ManagerLayout>
        </>
    );
}

// --- ROOT WRAPPER ---
function RootApp() {
    const { wallet } = useWeb3();
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        if (wallet.connected) {
            setEntered(true);
        } else if (!wallet.loading) {
            setEntered(false);
        }
    }, [wallet.connected, wallet.loading]);

    if (wallet.loading) {
        return (
            <div className="min-h-screen bg-spaceBlack flex flex-col items-center justify-center text-white font-heading relative overflow-hidden">
                {/* Background pitch aesthetics */}
                <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
                <div className="absolute top-0 inset-x-0 h-96 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neonGold/10 via-spaceBlack/50 to-transparent pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-neonGold border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(255,215,0,0.3)]"></div>
                    <div className="text-center">
                        <span className="text-neonGold uppercase tracking-widest text-lg font-black block mb-1" style={{ textShadow: '0 0 15px rgba(255,215,0,0.5)' }}>CONNECTING PITCH</span>
                        <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Verifying Web3 Session...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <GameProvider>
            <AnimatePresence mode="wait">
                {!entered ? (
                    <motion.div key="landing" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }}>
                        <LandingPage onEnter={() => setEntered(true)} />
                    </motion.div>
                ) : (
                    <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <MainApp />
                    </motion.div>
                )}
            </AnimatePresence>
        </GameProvider>
    );
}

export default function App() {
    return (
        <Web3Provider>
            <RootApp />
        </Web3Provider>
    );
}
