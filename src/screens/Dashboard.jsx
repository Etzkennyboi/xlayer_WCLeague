import { useGame } from '../context/GameContext';
import Flag from '../components/Flag';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const { state } = useGame();
    
    const winRate = state.activeBets.length > 0 
        ? ((state.activeBets.filter(b => b.won).length / state.activeBets.filter(b => b.resolved).length) * 100).toFixed(1) 
        : 0;

    const totalWon = state.activeBets.filter(b => b.won).length;
    const totalLost = state.activeBets.filter(b => b.resolved && !b.won).length;

    const playerTeam = state.teams[state.playerTeamIndex];
    const form = ['W', 'D', 'W', 'W', 'L'];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-body">
            <header className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-4xl font-heading font-bold text-white uppercase tracking-wider shadow-black drop-shadow-lg">MANAGER OVERVIEW</h1>
                    <p className="text-neonGreen font-bold uppercase tracking-widest text-xs mt-1">Live Broadcast Data Center</p>
                </div>
                <div className="flex gap-1 bg-black/50 p-2 rounded-xl border border-white/5 shadow-inner">
                    {form.map((res, i) => (
                        <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-lg ${res === 'W' ? 'bg-neonGreen text-black shadow-[0_0_10px_rgba(16,185,129,0.4)]' : res === 'D' ? 'bg-gray-600 text-white' : 'bg-neonRed text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]'}`}>
                            {res}
                        </div>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column (Wider) */}
                <div className="col-span-1 xl:col-span-2 space-y-8">
                    
                    {/* Top Row: Analytics & Team Stats & PK Stats */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Analytics Card */}
                        <div className="bg-stadiumBlue/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden shadow-2xl group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl group-hover:scale-110 transition-transform">📈</div>
                            <h2 className="font-bold text-gray-400 mb-6 uppercase tracking-widest text-xs flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-neonGold"></span>Prediction Analytics</h2>
                            <div className="text-6xl font-heading font-bold text-neonGold mb-1 tracking-wider drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">{winRate}%</div>
                            <div className="text-sm text-gray-400 mb-4 font-bold uppercase tracking-wider">Oracle Accuracy Rate</div>
                            
                            <div className="flex w-full h-3 bg-black/80 rounded-full overflow-hidden border border-white/5">
                                <div className="bg-neonGreen transition-all shadow-[0_0_10px_rgba(16,185,129,0.8)]" style={{ width: `${(totalWon / (totalWon + totalLost)) * 100 || 0}%` }}></div>
                                <div className="bg-neonRed transition-all shadow-[0_0_10px_rgba(239,68,68,0.8)]" style={{ width: `${(totalLost / (totalWon + totalLost)) * 100 || 0}%` }}></div>
                            </div>
                            <div className="flex justify-between mt-3 text-xs font-bold tracking-widest">
                                <span className="text-neonGreen">{totalWon} WINS</span>
                                <span className="text-neonRed">{totalLost} LOSSES</span>
                            </div>
                        </div>

                        {/* Team Card (Ultimate Team Style) */}
                        <div className="bg-gradient-to-br from-stadiumBlue/90 to-black border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden shadow-2xl flex items-center">
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.03)_50%,transparent_75%)] bg-[size:250px_250px] animate-[shimmer_3s_infinite_linear]"></div>
                            <div className="relative z-10 flex w-full items-center gap-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-neonBlue blur-2xl opacity-20"></div>
                                    <Flag code={playerTeam.code} size="w-24 h-24" className="shadow-2xl border-2 border-white/10 rounded-lg relative z-10" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-neonBlue mb-1 uppercase tracking-widest text-xs">Your Franchise</h2>
                                    <div className="text-3xl font-heading font-bold text-white uppercase tracking-wider drop-shadow-md">{playerTeam.name}</div>
                                    <div className="flex gap-4 mt-3">
                                        <div>
                                            <div className="text-[10px] text-gray-500 font-bold uppercase">Points</div>
                                            <div className="font-heading text-xl text-white">{playerTeam.stats.points}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 font-bold uppercase">Goals</div>
                                            <div className="font-heading text-xl text-white">{playerTeam.stats.gf}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PK Shootout Stats Card */}
                        <div className="bg-stadiumBlue/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden shadow-2xl group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl group-hover:scale-110 transition-transform">🎯</div>
                            <h2 className="font-bold text-gray-400 mb-6 uppercase tracking-widest text-xs flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-neonGreen"></span>PK Shootout Stats</h2>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <div className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Win Rate</div>
                                    <div className="text-3xl font-heading font-bold text-white mb-4">
                                        {state.pkShooterStats.totalPlayed ? Math.round((state.pkShooterStats.totalWins / state.pkShooterStats.totalPlayed) * 100) : 0}%
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Best Score</div>
                                    <div className="text-3xl font-heading font-bold text-neonGold mb-4">{state.pkShooterStats.bestScore}/5</div>
                                </div>
                            </div>
                            <div className="flex justify-between mt-3 text-xs font-bold tracking-widest pt-3 border-t border-white/5">
                                <span className="text-gray-300">{state.pkShooterStats.totalWins} WINS</span>
                                <span className="text-gray-300">{state.pkShooterStats.totalPlayed} PLAYED</span>
                                <span className="text-neonBlue">{state.pkShooterStats.winStreak} STREAK</span>
                            </div>
                        </div>
                    </div>

                    {/* Active Bets Section */}
                    <div className="bg-stadiumBlue/60 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl overflow-hidden">
                        <div className="bg-black/40 px-6 py-4 border-b border-white/10 flex justify-between items-center">
                            <span className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <span className="text-neonGreen animate-pulse">●</span> LIVE MARKETS
                            </span>
                        </div>
                        <div className="p-2">
                            {state.activeBets.length === 0 ? (
                                <div className="p-12 text-center text-gray-500 font-bold uppercase tracking-widest text-sm">No Active Markets</div>
                            ) : (
                                <div className="space-y-2">
                                    {state.activeBets.map((bet, idx) => (
                                        <div key={bet.id || `${bet.marketId}-${bet.selection}-${idx}`} className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-black/50 rounded-lg flex items-center justify-center border border-white/5 font-heading text-xl text-neonGold shadow-inner">
                                                    {bet.selection}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white tracking-wider">{bet.homeAbbr} <span className="text-gray-600 text-xs mx-1">VS</span> {bet.awayAbbr}</div>
                                                    <div className="text-xs text-gray-400 font-bold uppercase mt-1">Stake: <span className="text-neonGold">{bet.stake}</span></div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Status</div>
                                                {bet.resolved ? (
                                                    <span className={`px-3 py-1 rounded font-bold text-xs uppercase ${bet.won ? 'bg-neonGreen/20 text-neonGreen border border-neonGreen/30' : 'bg-neonRed/20 text-neonRed border border-neonRed/30'}`}>
                                                        {bet.won ? 'WON' : 'LOST'}
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 rounded font-bold text-xs uppercase bg-neonBlue/20 text-neonBlue border border-neonBlue/30 animate-pulse">
                                                        PENDING
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Prediction History Log */}
                <div className="bg-stadiumBlue/60 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col h-[600px] overflow-hidden">
                    <div className="bg-black/40 px-6 py-4 border-b border-white/10">
                        <span className="text-sm font-bold text-white uppercase tracking-widest">TRANSACTION LOG</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
                        {state.activeBets.filter(b => b.resolved).length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 p-6 text-center">
                                <div className="text-4xl mb-4 opacity-50">🧾</div>
                                <div className="text-sm font-bold uppercase tracking-widest">No History</div>
                                <p className="text-xs mt-2">Resolved markets will appear here.</p>
                            </div>
                        ) : (
                            state.activeBets.filter(b => b.resolved).map((bet, i) => (
                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={`hist-${bet.id || i}-${i}`} 
                                    className="p-3 border border-white/5 rounded-xl bg-black/40 flex justify-between items-center"
                                >
                                    <div>
                                        <div className="text-xs font-bold text-gray-400">{bet.homeAbbr} vs {bet.awayAbbr}</div>
                                        <div className="text-[10px] text-gray-600 uppercase font-bold mt-1">Pick: {bet.selection} • Odds: {bet.odds}</div>
                                    </div>
                                    <div className={`font-heading text-lg ${bet.won ? 'text-neonGreen drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'text-neonRed opacity-50'}`}>
                                        {bet.won ? `+${(parseFloat(bet.stake) * parseFloat(bet.odds)).toFixed(2)}` : `-${bet.stake}`}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
