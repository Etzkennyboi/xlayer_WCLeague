import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useWeb3 } from '../web3/useWeb3';

export default function BetSlip() {
    const { state, dispatch } = useGame();
    const { betSlip } = state;
    const { wallet, sendBetToTreasury } = useWeb3();
    const [isProcessing, setIsProcessing] = useState(false);

    const totalStake = betSlip.reduce((sum, b) => sum + (b.amount || 0.01), 0);
    const totalPotential = betSlip.reduce((sum, b) => sum + ((b.amount || 0.01) * parseFloat(b.odds)), 0);
    const canConfirm = betSlip.length > 0 && wallet?.connected && !isProcessing;

    const handleConfirm = async () => {
        if (!wallet?.connected) {
            alert("Please connect wallet first.");
            return;
        }

        setIsProcessing(true);
        try {
            const txResult = await sendBetToTreasury(totalStake);
            if (txResult.success) {
                dispatch({ 
                    type: 'CONFIRM_WEB3_SLIP', 
                    payload: { txHash: txResult.txHash, totalCost: totalStake } 
                });
            } else {
                alert("Transaction failed or rejected.");
            }
        } catch (e) {
            console.error("Bet slip confirmation error:", e);
            alert("Transaction error.");
        }
        setIsProcessing(false);
    };

    if (betSlip.length === 0) {
        return (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Bet Slip</div>
                <div className="text-gray-600 text-xs py-8">Click any odds to add a selection</div>
            </div>
        );
    }

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-4 bg-neonGold/10 border-b border-neonGold/20 flex justify-between items-center">
                <span className="font-bold text-sm text-neonGold uppercase tracking-widest">Bet Slip ({betSlip.length})</span>
                <button onClick={() => dispatch({ type: 'CLEAR_SLIP' })} className="text-xs text-gray-400 hover:text-neonRed transition-colors">Clear All</button>
            </div>

            <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto hide-scrollbar">
                <AnimatePresence>
                    {betSlip.map(bet => {
                        const betAmount = bet.amount || 0.01;
                        return (
                        <motion.div
                            key={bet.matchId}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-black/40 rounded-xl p-4 border border-white/5"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="text-xs text-gray-400">{bet.homeAbbr} vs {bet.awayAbbr}</div>
                                    <div className="font-bold text-sm">
                                        {bet.selection === '1' ? bet.homeAbbr + ' Win' : bet.selection === '2' ? bet.awayAbbr + ' Win' : 'Draw'}
                                        <span className="text-neonGreen ml-2">@{bet.odds}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => dispatch({ type: 'REMOVE_FROM_SLIP', payload: bet.matchId })}
                                    className="text-gray-500 hover:text-neonRed text-lg leading-none"
                                >×</button>
                            </div>
                            <div className="flex gap-2">
                                {[0.01, 0.05, 0.1, 0.5].map(amt => (
                                    <button
                                        key={amt}
                                        onClick={() => dispatch({ type: 'UPDATE_SLIP_AMOUNT', payload: { matchId: bet.matchId, amount: amt } })}
                                        className={`flex-1 text-xs py-1.5 rounded-lg border transition-colors ${betAmount === amt ? 'bg-neonGold/20 border-neonGold/50 text-neonGold' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                                    >
                                        {amt} OKB
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )})}
                </AnimatePresence>
            </div>

            <div className="p-4 border-t border-white/10 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Stake</span>
                    <span className="font-bold text-white">{totalStake.toFixed(2)} OKB</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Potential Return</span>
                    <span className="font-bold text-neonGreen">{totalPotential.toFixed(2)} OKB</span>
                </div>
                {!wallet?.connected && (
                    <div className="text-xs text-neonRed text-center">Connect wallet to bet</div>
                )}
                <button
                    onClick={handleConfirm}
                    disabled={!canConfirm}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${canConfirm ? 'bg-neonGreen text-black hover:scale-[1.02]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'} ${isProcessing ? 'animate-pulse' : ''}`}
                >
                    {isProcessing ? 'PROCESSING...' : 'CONFIRM BETS'}
                </button>
            </div>
        </div>
    );
}
