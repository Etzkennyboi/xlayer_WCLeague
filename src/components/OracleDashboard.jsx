import { useState, useEffect } from 'react';
import { fetchRealWorldFixtures } from '../data/oracleFixtures';
import Flag from './Flag';

export default function OracleDashboard() {
    const [fixtures, setFixtures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [simulatedAdminAction, setSimulatedAdminAction] = useState(null);
    const [userBets, setUserBets] = useState({}); // Track mocked bets

    useEffect(() => {
        async function loadFixtures() {
            setLoading(true);
            const data = await fetchRealWorldFixtures();
            setFixtures(data);
            setLoading(false);
        }
        loadFixtures();
    }, []);

    const handlePlaceBet = (fixtureId, selection) => {
        alert(`MetaMask Prompt: Sign transaction to place bet on ${selection} for fixture ${fixtureId} via PredictionMarket.sol`);
        // Mock successful transaction
        setUserBets(prev => ({ ...prev, [fixtureId]: { selection, claimed: false } }));
        setSimulatedAdminAction(`Bet placed on ${selection}`);
        setTimeout(() => setSimulatedAdminAction(null), 3000);
    };

    const handleResolveMarket = (fixtureId) => {
        alert(`Oracle Node Action: Calling PredictionMarket.sol -> resolveMarket(${fixtureId}, HOME_WIN) based on real-world RapidAPI data.`);
        setFixtures(prev => prev.map(f => f.id === fixtureId ? { ...f, status: 'resolved', result: 'home' } : f));
        setSimulatedAdminAction(`Market ${fixtureId} resolved as HOME WIN`);
        setTimeout(() => setSimulatedAdminAction(null), 3000);
    };

    const handleClaimWinnings = (fixtureId) => {
        alert(`MetaMask Prompt: Sign transaction to claim winnings from PredictionMarket.sol for fixture ${fixtureId}`);
        setUserBets(prev => ({ ...prev, [fixtureId]: { ...prev[fixtureId], claimed: true } }));
        setSimulatedAdminAction(`Winnings claimed for ${fixtureId}`);
        setTimeout(() => setSimulatedAdminAction(null), 3000);
    };

    return (
        <div className="flex-1 flex gap-8 h-full">
            {/* Left: Oracle Markets */}
            <div className="flex-[2] flex flex-col bg-black/40 border border-neonBlue/30 rounded-3xl overflow-hidden shadow-[0_0_20px_rgba(0,191,255,0.1)]">
                <div className="bg-neonBlue/10 px-6 py-4 border-b border-neonBlue/30 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">🔮</span>
                        <h2 className="font-bold tracking-widest text-sm text-neonBlue uppercase">X Layer Oracle Markets</h2>
                    </div>
                    <span className="text-xs font-bold text-gray-400 bg-black/50 px-3 py-1 rounded-full border border-white/10">Data: RapidAPI World Cup Feeds</span>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto hide-scrollbar space-y-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <span className="text-neonBlue animate-pulse font-bold tracking-widest">FETCHING ON-CHAIN DATA...</span>
                        </div>
                    ) : (
                        fixtures.map((f) => {
                            const userBet = userBets[f.id];
                            const isResolved = f.status === 'resolved';

                            return (
                                <div key={f.id} className="bg-black/60 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                                    {isResolved && <div className="absolute inset-0 bg-black/80 z-10 flex items-center justify-center backdrop-blur-sm">
                                        <div className="text-center">
                                            <div className="text-2xl font-black text-white mb-2">MARKET RESOLVED</div>
                                            <div className="text-sm font-bold text-neonGold uppercase tracking-widest">Result: {f.result}</div>
                                            {userBet && !userBet.claimed && userBet.selection === f.result && (
                                                <button onClick={() => handleClaimWinnings(f.id)} className="mt-4 px-6 py-2 bg-neonGold text-black font-bold rounded hover:bg-white transition-colors shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                                                    CLAIM WINNINGS
                                                </button>
                                            )}
                                            {userBet && userBet.claimed && (
                                                <div className="mt-4 text-xs font-bold text-gray-500 uppercase">Payout Claimed</div>
                                            )}
                                        </div>
                                    </div>}

                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-4 w-5/12 justify-end">
                                            <span className="font-bold text-lg text-white">{f.homeTeam}</span>
                                            <Flag code={f.homeCode} size="w-8 h-8" />
                                        </div>
                                        <div className="w-2/12 flex justify-center text-xs font-bold text-gray-500 uppercase">VS</div>
                                        <div className="flex items-center gap-4 w-5/12 justify-start">
                                            <Flag code={f.awayCode} size="w-8 h-8" />
                                            <span className="font-bold text-lg text-white">{f.awayTeam}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button onClick={() => handlePlaceBet(f.id, 'home')} disabled={userBet || isResolved} className={`flex-1 py-3 rounded-xl border transition-all ${userBet?.selection === 'home' ? 'bg-neonBlue text-black border-neonBlue' : 'bg-white/5 border-white/10 hover:border-neonBlue/50 hover:bg-neonBlue/5'}`}>
                                            <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">HOME</div>
                                            <div className="font-black text-lg">{f.odds.home}</div>
                                        </button>
                                        <button onClick={() => handlePlaceBet(f.id, 'draw')} disabled={userBet || isResolved} className={`flex-1 py-3 rounded-xl border transition-all ${userBet?.selection === 'draw' ? 'bg-neonBlue text-black border-neonBlue' : 'bg-white/5 border-white/10 hover:border-neonBlue/50 hover:bg-neonBlue/5'}`}>
                                            <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">DRAW</div>
                                            <div className="font-black text-lg">{f.odds.draw}</div>
                                        </button>
                                        <button onClick={() => handlePlaceBet(f.id, 'away')} disabled={userBet || isResolved} className={`flex-1 py-3 rounded-xl border transition-all ${userBet?.selection === 'away' ? 'bg-neonBlue text-black border-neonBlue' : 'bg-white/5 border-white/10 hover:border-neonBlue/50 hover:bg-neonBlue/5'}`}>
                                            <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">AWAY</div>
                                            <div className="font-black text-lg">{f.odds.away}</div>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Right: Oracle Admin Panel */}
            <div className="flex-1 flex flex-col gap-6">
                <div className="bg-black/60 border border-neonRed/30 rounded-3xl p-6 shadow-[0_0_20px_rgba(255,0,0,0.1)]">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-2 h-2 rounded-full bg-neonRed animate-pulse"></span>
                        <h2 className="font-bold text-xs uppercase tracking-widest text-neonRed">Oracle Resolver Node</h2>
                    </div>
                    <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                        This panel simulates the backend Oracle Node. On Mainnet, an automated script will fetch RapidAPI results and call <code className="text-neonRed">resolveMarket()</code> on the smart contract.
                    </p>
                    
                    <div className="space-y-3">
                        {fixtures.filter(f => f.status === 'upcoming').map(f => (
                            <button 
                                key={`resolve-${f.id}`} 
                                onClick={() => handleResolveMarket(f.id)}
                                className="w-full py-3 px-4 bg-white/5 border border-white/10 hover:border-neonRed/50 rounded-xl text-left flex justify-between items-center transition-colors group"
                            >
                                <div>
                                    <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">TRIGGER RESULT FETCH</div>
                                    <div className="font-bold text-sm text-gray-300 group-hover:text-white transition-colors">{f.homeTeam} vs {f.awayTeam}</div>
                                </div>
                                <span className="text-neonRed text-xl">⚡</span>
                            </button>
                        ))}
                        {fixtures.filter(f => f.status === 'upcoming').length === 0 && (
                            <div className="text-center text-xs text-gray-500 py-4">All markets resolved.</div>
                        )}
                    </div>
                </div>

                {simulatedAdminAction && (
                    <div className="bg-neonGreen/10 border border-neonGreen text-neonGreen p-4 rounded-xl text-sm font-bold text-center animate-in fade-in">
                        {simulatedAdminAction}
                    </div>
                )}
            </div>
        </div>
    );
}
