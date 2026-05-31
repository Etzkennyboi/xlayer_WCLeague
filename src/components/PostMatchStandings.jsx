import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import Flag from './Flag';

export default function PostMatchStandings() {
    const { state, dispatch } = useGame();
    
    if (!state.showMatchModal) return null;

    const { playerMatch } = state.lastMatchResult || {};
    const teams = [...state.teams].sort((a, b) => b.stats.points - a.stats.points);



    const isWin = playerMatch?.homeIsPlayer 
        ? playerMatch.result.homeGoals > playerMatch.result.awayGoals 
        : playerMatch?.result.awayGoals > playerMatch?.result.homeGoals;
    const isDraw = playerMatch?.result.homeGoals === playerMatch?.result.awayGoals;

    return (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex flex-col p-8">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-4xl font-black font-heading tracking-widest text-white mb-2">ROUND {state.round - 1} COMPLETED</h1>
                <p className="text-gray-400">Leaderboard has been updated.</p>
            </motion.div>

            <div className="flex flex-1 gap-8 max-w-7xl mx-auto w-full min-h-0">
                {/* Left: Player Match Summary */}
                {playerMatch && (
                    <div className="w-1/3 flex flex-col gap-6">
                        <div className={`flex-1 rounded-3xl border flex flex-col items-center justify-center p-8 relative overflow-hidden ${isWin ? 'bg-neonGreen/10 border-neonGreen shadow-[0_0_50px_rgba(0,255,128,0.2)]' : isDraw ? 'bg-white/5 border-white/20' : 'bg-neonRed/10 border-neonRed shadow-[0_0_50px_rgba(255,0,0,0.2)]'}`}>
                            
                            <div className="text-2xl font-black font-heading mb-8 uppercase tracking-widest">
                                {isWin ? 'VICTORY' : isDraw ? 'DRAW' : 'DEFEAT'}
                            </div>

                            <div className="flex w-full items-center justify-between mb-8">
                                <div className="text-center flex flex-col items-center">
                                    <Flag code={playerMatch.homeTeam.code} size="w-20 h-20" className="mb-3" />
                                    <div className="font-bold">{playerMatch.homeTeam.abbr}</div>
                                </div>
                                <div className="text-5xl font-black font-mono">
                                    {playerMatch.result.homeGoals} - {playerMatch.result.awayGoals}
                                </div>
                                <div className="text-center flex flex-col items-center">
                                    <Flag code={playerMatch.awayTeam.code} size="w-20 h-20" className="mb-3" />
                                    <div className="font-bold">{playerMatch.awayTeam.abbr}</div>
                                </div>
                            </div>

                            <div className="bg-black/50 w-full rounded-2xl p-4 text-center border border-white/10">
                                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Match Income</div>
                                <div className="text-xl font-black text-neonGold">+€{(playerMatch.homeIsPlayer ? 1200000 : 400000).toLocaleString()}</div>
                            </div>
                        </div>

                        <button 
                            onClick={() => dispatch({ type: 'CLOSE_MATCH_MODAL' })}
                            className="w-full py-5 bg-white text-black font-black text-xl rounded-2xl hover:bg-gray-200 transition-colors shadow-xl"
                        >
                            CONTINUE TO NEXT ROUND
                        </button>
                    </div>
                )}

                {/* Right: Animated Leaderboard */}
                <div className="w-2/3 bg-black/60 border border-white/10 rounded-3xl overflow-hidden flex flex-col">
                    <div className="px-8 py-4 border-b border-white/10 bg-white/5 flex text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <div className="w-16">Pos</div>
                        <div className="flex-1">Nation</div>
                        <div className="w-16 text-center">P</div>
                        <div className="w-16 text-center">W</div>
                        <div className="w-16 text-center">D</div>
                        <div className="w-16 text-center">L</div>
                        <div className="w-16 text-center">GD</div>
                        <div className="w-16 text-right">Pts</div>
                    </div>
                    
                    <ul className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-2 relative">
                        {teams.map((t, idx) => {
                            const isPlayer = t.id === state.playerTeamIndex;
                            const gd = t.stats.goalsFor - t.stats.goalsAgainst;
                            return (
                                <motion.li 
                                    key={t.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className={`flex items-center px-4 py-3 rounded-xl border ${isPlayer ? 'bg-neonGold/20 border-neonGold shadow-[0_0_15px_rgba(255,215,0,0.2)]' : 'bg-black/40 border-white/5'}`}
                                >
                                    <div className={`w-12 font-bold ${idx < 4 ? 'text-neonGreen' : idx > 43 ? 'text-neonRed' : 'text-gray-400'}`}>
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1 flex items-center gap-3">
                                        <Flag code={t.code} size="w-6 h-6" />
                                        <span className={`font-bold ${isPlayer ? 'text-neonGold' : 'text-white'}`}>{t.name}</span>
                                    </div>
                                    <div className="w-16 text-center text-gray-400">{t.stats.played}</div>
                                    <div className="w-16 text-center text-gray-400">{t.stats.won}</div>
                                    <div className="w-16 text-center text-gray-400">{t.stats.drawn}</div>
                                    <div className="w-16 text-center text-gray-400">{t.stats.lost}</div>
                                    <div className="w-16 text-center text-gray-400">{gd > 0 ? `+${gd}` : gd}</div>
                                    <div className="w-16 text-right font-black text-lg">{t.stats.points}</div>
                                </motion.li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
