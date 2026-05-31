import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

export default function BetSlip() {
    const { state, dispatch } = useGame();
    const { betSlip, budget } = state;

    const totalStake = betSlip.reduce((sum, b) => sum + b.amount, 0);
    const totalPotential = betSlip.reduce((sum, b) => sum + (b.amount * parseFloat(b.odds)), 0);
    const canConfirm = betSlip.length > 0 && totalStake <= budget;

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
                    {betSlip.map(bet => (
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
                                {[1000, 5000, 10000, 50000].map(amt => (
                                    <button
                                        key={amt}
                                        onClick={() => dispatch({ type: 'UPDATE_SLIP_AMOUNT', payload: { matchId: bet.matchId, amount: amt } })}
                                        className={`flex-1 text-xs py-1.5 rounded-lg border transition-colors ${bet.amount === amt ? 'bg-neonGold/20 border-neonGold/50 text-neonGold' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                                    >
                                        {amt >= 1000 ? `${amt/1000}K` : amt}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="p-4 border-t border-white/10 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Stake</span>
                    <span className={`font-bold ${totalStake > budget ? 'text-neonRed' : 'text-white'}`}>€{totalStake.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Potential Return</span>
                    <span className="font-bold text-neonGreen">€{Math.floor(totalPotential).toLocaleString()}</span>
                </div>
                {totalStake > budget && (
                    <div className="text-xs text-neonRed text-center">Insufficient funds</div>
                )}
                <button
                    onClick={() => dispatch({ type: 'CONFIRM_SLIP' })}
                    disabled={!canConfirm}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${canConfirm ? 'bg-neonGreen text-black hover:scale-[1.02]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                >
                    CONFIRM BETS
                </button>
            </div>
        </div>
    );
}
