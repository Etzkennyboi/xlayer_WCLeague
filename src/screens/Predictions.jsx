import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useWeb3 } from '../web3/useWeb3';
import { getRealWorldFixtures } from '../services/api';

export default function Predictions() {
    const { state, dispatch } = useGame();
    const { wallet, placeBetOnChain } = useWeb3();
    const [betAmount, setBetAmount] = useState(1); // 1 OKB default
    
    const [realFixtures, setRealFixtures] = useState([]);
    const [loadingFixtures, setLoadingFixtures] = useState(false);
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
        const fetchThem = async () => {
            setLoadingFixtures(true);
            setApiError(null);
            try {
                const data = await getRealWorldFixtures();
                if (data && data.length > 0) {
                    setRealFixtures(data);
                } else {
                    setApiError("No live fixtures found today.");
                }
            } catch (err) {
                console.error(err);
                setApiError("Failed to connect to Oracle Network.");
            } finally {
                setLoadingFixtures(false);
            }
        };

        if (realFixtures.length === 0 && !loadingFixtures) {
            fetchThem();
        }
    }, [realFixtures.length, loadingFixtures]);

    const handleWeb3Bet = async (marketId, isYes) => {
        if (!wallet.connected) return alert("Please connect wallet first!");
        if (betAmount <= 0) return alert("Please enter a valid bet amount.");
        
        const res = await placeBetOnChain(marketId, isYes, betAmount);
        if (res.success) {
            alert("Transaction confirmed on X Layer!");
        } else {
            alert("Bet failed: " + res.error);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-heading font-black">PREDICTION MARKETS</h1>
                    <p className="text-gray-400">Bet on fixture outcomes with Real OKB.</p>
                </div>
            </header>

            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                <div className="bg-neonBlue/5 border border-neonBlue/20 rounded-3xl p-10 text-center relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-neonBlue/10 blur-[100px] rounded-full pointer-events-none"></div>
                    <h3 className="text-2xl font-bold mb-4 text-neonBlue">ORACLE CONNECTED</h3>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                        Place bets on real-world upcoming fixtures. Outcomes are verified via RapidAPI and settled securely on the X Layer blockchain using real OKB.
                    </p>
                    
                    <div className="flex items-center gap-4 bg-black/50 p-4 rounded-xl border border-white/10 z-10 relative">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">Bet Amount:</span>
                        <div className="relative">
                            <input 
                                type="number" 
                                min="0.1" 
                                step="0.1"
                                value={betAmount} 
                                onChange={(e) => setBetAmount(Number(e.target.value))}
                                className="bg-spaceBlack border border-white/20 rounded-xl px-4 py-2 text-lg text-white font-black outline-none focus:border-neonGold transition-colors w-32"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">OKB</span>
                        </div>
                    </div>
                </div>

                {loadingFixtures ? (
                    /* SKELETON LOADER */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 animate-pulse h-64">
                                <div className="h-4 bg-white/10 rounded w-1/3 mb-8 mx-auto"></div>
                                <div className="flex justify-between items-center mb-8">
                                    <div className="w-16 h-16 bg-white/10 rounded-full"></div>
                                    <div className="w-10 h-6 bg-white/10 rounded"></div>
                                    <div className="w-16 h-16 bg-white/10 rounded-full"></div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1 h-12 bg-white/10 rounded-xl"></div>
                                    <div className="flex-1 h-12 bg-white/10 rounded-xl"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : apiError ? (
                    <div className="text-center py-12 bg-neonRed/10 border border-neonRed/20 rounded-3xl text-neonRed">
                        <span className="text-4xl mb-4 block">⚠️</span>
                        <div className="font-bold text-lg">{apiError}</div>
                        <button onClick={() => setRealFixtures([])} className="mt-4 px-6 py-2 bg-neonRed/20 hover:bg-neonRed/40 rounded-lg text-white font-bold transition-colors">Retry</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {realFixtures.map(rf => (
                            <div key={rf.id} className="bg-black/60 border border-neonBlue/20 rounded-3xl p-5 sm:p-8 relative overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:border-neonBlue/50 transition-colors">
                                <div className="absolute top-0 left-0 w-full h-1 bg-neonBlue"></div>
                                <div className="text-xs text-neonGold mb-6 font-bold tracking-widest uppercase text-center truncate">{rf.league}</div>
                                
                                <div className="flex justify-between items-center mb-8">
                                    <div className="text-center w-2/5">
                                        <div className="text-3xl mb-2">⚽</div>
                                        <div className="font-bold truncate text-lg">{rf.home}</div>
                                    </div>
                                    <div className="text-xs font-black text-gray-500 bg-white/5 px-2 py-1 rounded">VS</div>
                                    <div className="text-center w-2/5">
                                        <div className="text-3xl mb-2">⚽</div>
                                        <div className="font-bold truncate text-lg">{rf.away}</div>
                                    </div>
                                </div>
                                
                                <div className="flex gap-4">
                                    <button onClick={() => handleWeb3Bet(rf.id, true, rf.homeOdds)} className="flex-1 py-3 sm:py-4 bg-neonBlue/20 hover:bg-neonBlue/40 border border-neonBlue/50 text-neonBlue font-bold rounded-xl transition-colors text-xs sm:text-sm flex flex-col items-center">
                                        <span>HOME WIN</span>
                                        <span className="text-white mt-1">{rf.homeOdds}x</span>
                                    </button>
                                    <button onClick={() => handleWeb3Bet(rf.id, false, rf.awayOdds)} className="flex-1 py-3 sm:py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-gray-300 font-bold rounded-xl transition-colors text-xs sm:text-sm flex flex-col items-center">
                                        <span>AWAY WIN</span>
                                        <span className="text-white mt-1">{rf.awayOdds}x</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
