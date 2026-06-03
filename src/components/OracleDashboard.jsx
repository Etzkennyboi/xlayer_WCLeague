import { useState, useEffect, useCallback } from 'react';
import { useWeb3 } from '../web3/useWeb3';
import Flag from './Flag';

export default function OracleDashboard() {
    const { wallet, placeBetOnChain, claimPredictionWinnings, getOnChainUserBet } = useWeb3();
    const [fixtures, setFixtures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userBets, setUserBets] = useState({}); // Stores actual on-chain bets
    const [betAmounts, setBetAmounts] = useState({}); // Custom bet sizes per fixture
    const [actionLoading, setActionLoading] = useState({}); // tracks button loading status
    const [notification, setNotification] = useState(null);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/fixtures');
            if (res.ok) {
                const data = await res.json();
                setFixtures(data);

                // Fetch on-chain bet details for each fixture if wallet is connected
                if (wallet.connected && wallet.address) {
                    const bets = {};
                    for (const f of data) {
                        if (f.onChain?.initialized) {
                            const userBet = await getOnChainUserBet(f.id, wallet.address);
                            bets[f.id] = userBet;
                        }
                        // Set default bet amount to 0.1 OKB if not yet set
                        setBetAmounts(prev => ({ ...prev, [f.id]: prev[f.id] || "0.1" }));
                    }
                    setUserBets(bets);
                }
            }
        } catch (err) {
            console.error("Failed to load fixtures:", err);
        } finally {
            setLoading(false);
        }
    }, [wallet.connected, wallet.address, getOnChainUserBet]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handlePlaceBet = async (fixtureId, selection) => {
        if (!wallet.connected) {
            showNotification("Please connect your wallet first!", "error");
            return;
        }

        const amount = betAmounts[fixtureId] || "0.1";
        if (parseFloat(amount) <= 0) {
            showNotification("Enter a valid bet amount.", "error");
            return;
        }

        let selectionInt = 0;
        if (selection === 'home') selectionInt = 1;
        else if (selection === 'away') selectionInt = 2;
        else if (selection === 'draw') selectionInt = 3;

        setActionLoading(prev => ({ ...prev, [fixtureId]: 'betting' }));
        showNotification(`Confirming bet of ${amount} OKB on ${selection.toUpperCase()}...`, "info");

        const res = await placeBetOnChain(fixtureId, selectionInt, amount);
        
        setActionLoading(prev => ({ ...prev, [fixtureId]: null }));

        if (res.success) {
            showNotification(`Bet placed successfully! Tx: ${res.txHash.slice(0, 10)}...`, "success");
            loadData(); // reload on-chain data
        } else {
            showNotification(`Bet failed: ${res.error}`, "error");
        }
    };

    const handleResolveMarket = async (fixtureId, winningOutcome) => {
        setActionLoading(prev => ({ ...prev, [fixtureId]: 'resolving' }));
        showNotification(`Oracle node resolving market ${fixtureId} on-chain as ${winningOutcome.toUpperCase()}...`, "info");

        try {
            const response = await fetch('/api/fixtures/resolve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fixtureId, result: winningOutcome })
            });
            const data = await response.json();
            
            setActionLoading(prev => ({ ...prev, [fixtureId]: null }));

            if (data.success) {
                showNotification(`Market resolved on-chain!`, "success");
                loadData();
            } else {
                showNotification(`Resolution failed: ${data.error}`, "error");
            }
        } catch (err) {
            setActionLoading(prev => ({ ...prev, [fixtureId]: null }));
            showNotification(`Error: ${err.message}`, "error");
        }
    };

    const handleClaimWinnings = async (fixtureId) => {
        setActionLoading(prev => ({ ...prev, [fixtureId]: 'claiming' }));
        showNotification(`Claiming winnings for ${fixtureId}...`, "info");

        const res = await claimPredictionWinnings(fixtureId);

        setActionLoading(prev => ({ ...prev, [fixtureId]: null }));

        if (res.success) {
            showNotification(`Winnings claimed successfully! Payout sent to your wallet.`, "success");
            loadData();
        } else {
            showNotification(`Claim failed: ${res.error}`, "error");
        }
    };

    const showNotification = (message, type = "info") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    return (
        <div className="flex-1 flex flex-col lg:flex-row gap-8 h-full">
            {/* Left: Oracle Markets */}
            <div className="flex-[2] flex flex-col bg-black/40 border border-neonBlue/30 rounded-3xl overflow-hidden shadow-[0_0_20px_rgba(0,191,255,0.1)]">
                <div className="bg-neonBlue/10 px-6 py-4 border-b border-neonBlue/30 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">🔮</span>
                        <h2 className="font-bold tracking-widest text-sm text-neonBlue uppercase">World Cup Predictions</h2>
                    </div>
                    <span className="text-xs font-bold text-gray-400 bg-black/50 px-3 py-1 rounded-full border border-white/10">Active Contract</span>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto hide-scrollbar space-y-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <span className="text-neonBlue animate-pulse font-bold tracking-widest">LOADING WEB3 PREDICTION CONTRACTS...</span>
                        </div>
                    ) : (
                        fixtures.map((f) => {
                            const userBet = userBets[f.id];
                            const isResolved = f.onChain?.isResolved || f.status === 'resolved';
                            const outcomeString = f.onChain?.outcome === 1 ? 'home' : f.onChain?.outcome === 2 ? 'away' : f.onChain?.outcome === 3 ? 'draw' : f.result;
                            const isWinner = userBet?.hasBet && userBet?.selection === f.onChain?.outcome;

                            return (
                                <div key={f.id} className="bg-black/60 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                                    {/* Overlay for Resolved Markets */}
                                    {isResolved && (
                                        <div className="absolute inset-0 bg-black/85 z-10 flex items-center justify-center backdrop-blur-sm">
                                            <div className="text-center p-4">
                                                <div className="text-2xl font-black text-white mb-1">MARKET RESOLVED</div>
                                                <div className="text-sm font-bold text-neonGold uppercase tracking-widest mb-3">Result: {outcomeString?.toUpperCase()}</div>
                                                
                                                {userBet?.hasBet ? (
                                                    isWinner ? (
                                                        !userBet.claimed ? (
                                                            <button 
                                                                onClick={() => handleClaimWinnings(f.id)} 
                                                                disabled={actionLoading[f.id] === 'claiming'}
                                                                className="px-6 py-2.5 bg-neonGold text-black font-black rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,215,0,0.4)] text-sm"
                                                            >
                                                                {actionLoading[f.id] === 'claiming' ? 'CLAIMING...' : 'CLAIM PAYOUT 🏆'}
                                                            </button>
                                                        ) : (
                                                            <div className="text-xs font-bold text-neonGreen uppercase tracking-widest bg-neonGreen/10 border border-neonGreen/30 px-4 py-2 rounded-lg">
                                                                Payout Claimed ✓
                                                            </div>
                                                        )
                                                    ) : (
                                                        <div className="text-xs font-bold text-red-400 uppercase tracking-widest bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-lg">
                                                            Prediction Lost
                                                        </div>
                                                    )
                                                ) : (
                                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">No Bet Placed</div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Header: Teams & Flags */}
                                    <div className="flex justify-between items-center mb-5">
                                        <div className="flex items-center gap-3 w-5/12 justify-end">
                                            <span className="font-bold text-base text-white truncate">{f.homeTeam}</span>
                                            <Flag code={f.homeCode} size="w-7 h-7" />
                                        </div>
                                        <div className="w-2/12 flex justify-center text-xs font-bold text-gray-500 uppercase">VS</div>
                                        <div className="flex items-center gap-3 w-5/12 justify-start">
                                            <Flag code={f.awayCode} size="w-7 h-7" />
                                            <span className="font-bold text-base text-white truncate">{f.awayTeam}</span>
                                        </div>
                                    </div>

                                    {/* Sub-info: Pool sizes */}
                                    <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-4 px-2">
                                        <span>Home Pool: {f.onChain?.pools?.home || "0.0"} OKB</span>
                                        <span>Draw Pool: {f.onChain?.pools?.draw || "0.0"} OKB</span>
                                        <span>Away Pool: {f.onChain?.pools?.away || "0.0"} OKB</span>
                                    </div>

                                    {/* Wager inputs & buttons */}
                                    <div className="flex flex-col gap-4">
                                        {/* Bet Amount Input */}
                                        {!userBet?.hasBet && !isResolved && (
                                            <div className="flex items-center justify-between bg-black/40 border border-white/5 rounded-xl px-4 py-2">
                                                <span className="text-[10px] text-gray-400 font-bold uppercase">Wager size:</span>
                                                <div className="flex items-center gap-2">
                                                    <input 
                                                        type="number"
                                                        step="0.05"
                                                        min="0.05"
                                                        value={betAmounts[f.id] || "0.1"}
                                                        onChange={(e) => setBetAmounts(prev => ({ ...prev, [f.id]: e.target.value }))}
                                                        className="bg-transparent border-none text-right outline-none text-white font-black text-sm w-20"
                                                    />
                                                    <span className="text-[10px] text-gray-400 font-bold">OKB</span>
                                                </div>
                                            </div>
                                        )}

                                        {userBet?.hasBet && (
                                            <div className="text-center text-xs font-bold text-neonBlue bg-neonBlue/5 border border-neonBlue/20 py-2 rounded-xl">
                                                You bet {userBet.amount} OKB on {userBet.selection === 1 ? 'HOME' : userBet.selection === 2 ? 'AWAY' : 'DRAW'}
                                            </div>
                                        )}

                                        {/* Betting Action Buttons */}
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => handlePlaceBet(f.id, 'home')} 
                                                disabled={userBet?.hasBet || isResolved || actionLoading[f.id] === 'betting'} 
                                                className={`flex-1 py-2.5 rounded-xl border transition-all flex flex-col items-center justify-center ${userBet?.selection === 1 ? 'bg-neonBlue text-black border-neonBlue font-black' : 'bg-white/5 border-white/10 hover:border-neonBlue/50 hover:bg-neonBlue/5'}`}
                                            >
                                                <span className="text-[9px] text-gray-400 font-bold uppercase mb-0.5">HOME</span>
                                                <span className="font-bold text-sm">{f.odds.home}</span>
                                            </button>
                                            <button 
                                                onClick={() => handlePlaceBet(f.id, 'draw')} 
                                                disabled={userBet?.hasBet || isResolved || actionLoading[f.id] === 'betting'} 
                                                className={`flex-1 py-2.5 rounded-xl border transition-all flex flex-col items-center justify-center ${userBet?.selection === 3 ? 'bg-neonBlue text-black border-neonBlue font-black' : 'bg-white/5 border-white/10 hover:border-neonBlue/50 hover:bg-neonBlue/5'}`}
                                            >
                                                <span className="text-[9px] text-gray-400 font-bold uppercase mb-0.5">DRAW</span>
                                                <span className="font-bold text-sm">{f.odds.draw}</span>
                                            </button>
                                            <button 
                                                onClick={() => handlePlaceBet(f.id, 'away')} 
                                                disabled={userBet?.hasBet || isResolved || actionLoading[f.id] === 'betting'} 
                                                className={`flex-1 py-2.5 rounded-xl border transition-all flex flex-col items-center justify-center ${userBet?.selection === 2 ? 'bg-neonBlue text-black border-neonBlue font-black' : 'bg-white/5 border-white/10 hover:border-neonBlue/50 hover:bg-neonBlue/5'}`}
                                            >
                                                <span className="text-[9px] text-gray-400 font-bold uppercase mb-0.5">AWAY</span>
                                                <span className="font-bold text-sm">{f.odds.away}</span>
                                            </button>
                                        </div>
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
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-neonRed animate-pulse"></span>
                        <h2 className="font-bold text-xs uppercase tracking-widest text-neonRed">Oracle Resolver Node</h2>
                    </div>
                    <p className="text-[11px] text-gray-400 mb-5 leading-relaxed">
                        This panel simulates the backend Oracle resolver node. Click a result button below to execute `resolveMarket` on the smart contract for any upcoming fixture.
                    </p>
                    
                    <div className="space-y-4">
                        {fixtures.filter(f => f.status === 'upcoming').map(f => (
                            <div key={`resolve-${f.id}`} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                                <div className="text-xs font-bold text-gray-300 truncate">{f.homeTeam} vs {f.awayTeam}</div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleResolveMarket(f.id, 'home')}
                                        disabled={actionLoading[f.id] === 'resolving'}
                                        className="flex-1 py-2 bg-neonRed/15 border border-neonRed/30 hover:bg-neonRed hover:text-black rounded-lg text-xs font-black text-neonRed transition-colors"
                                    >
                                        HOME
                                    </button>
                                    <button 
                                        onClick={() => handleResolveMarket(f.id, 'draw')}
                                        disabled={actionLoading[f.id] === 'resolving'}
                                        className="flex-1 py-2 bg-neonRed/15 border border-neonRed/30 hover:bg-neonRed hover:text-black rounded-lg text-xs font-black text-neonRed transition-colors"
                                    >
                                        DRAW
                                    </button>
                                    <button 
                                        onClick={() => handleResolveMarket(f.id, 'away')}
                                        disabled={actionLoading[f.id] === 'resolving'}
                                        className="flex-1 py-2 bg-neonRed/15 border border-neonRed/30 hover:bg-neonRed hover:text-black rounded-lg text-xs font-black text-neonRed transition-colors"
                                    >
                                        AWAY
                                    </button>
                                </div>
                            </div>
                        ))}
                        {fixtures.filter(f => f.status === 'upcoming').length === 0 && (
                            <div className="text-center text-xs text-gray-500 py-4">All matches resolved.</div>
                        )}
                    </div>
                </div>

                {notification && (
                    <div className={`p-4 rounded-xl text-xs font-black text-center border animate-in fade-in ${notification.type === 'error' ? 'bg-red-500/10 border-red-500 text-red-400' : notification.type === 'success' ? 'bg-neonGreen/10 border-neonGreen text-neonGreen' : 'bg-neonBlue/10 border-neonBlue text-neonBlue'}`}>
                        {notification.message}
                    </div>
                )}
            </div>
        </div>
    );
}
