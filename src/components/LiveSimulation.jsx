import React, { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import Flag from './Flag';
import { motion, AnimatePresence } from 'framer-motion';

// Symmetrical compact match row memoized to only rerender if specific scores change.
const LiveMatchRow = React.memo(({ homeTeam, awayTeam, matchId, score }) => {
    return (
        <div className="flex items-center justify-between py-2 px-3 border-b border-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2 w-5/12 justify-end">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">{homeTeam.abbr}</span>
                <Flag code={homeTeam.code} size="w-5 h-5 rounded-sm shadow-md" />
            </div>
            
            <div className="w-2/12 flex justify-center text-lg font-heading font-bold px-2 bg-black/40 rounded border border-white/5 shadow-inner">
                <motion.span key={`h-${score.home}`} initial={{ scale: 1.5, color: '#10B981' }} animate={{ scale: 1, color: '#fff' }} transition={{ duration: 0.5 }}>{score.home}</motion.span>
                <span className="mx-1 text-gray-600">-</span>
                <motion.span key={`a-${score.away}`} initial={{ scale: 1.5, color: '#10B981' }} animate={{ scale: 1, color: '#fff' }} transition={{ duration: 0.5 }}>{score.away}</motion.span>
            </div>

            <div className="flex items-center gap-2 w-5/12 justify-start">
                <Flag code={awayTeam.code} size="w-5 h-5 rounded-sm shadow-md" />
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">{awayTeam.abbr}</span>
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    return prevProps.score.home === nextProps.score.home && prevProps.score.away === nextProps.score.away;
});

export default function LiveSimulation() {
    const { state, dispatch } = useGame();
    const { liveSim, round } = state;
    const { minute, scores, playerMatchEvents, active, allResults } = liveSim;
    const eventsEndRef = useRef(null);

    // Auto-scroll the commentary feed to the bottom
    useEffect(() => {
        if (eventsEndRef.current) {
            eventsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [playerMatchEvents]);

    if (!active) return null;

    const matchData = allResults || [];
    
    // Separate the player's match from the rest
    const playerMatchIdx = matchData.findIndex(m => m.fixture.home === state.playerTeamIndex || m.fixture.away === state.playerTeamIndex);
    const playerMatch = playerMatchIdx !== -1 ? matchData[playerMatchIdx] : null;
    
    // The other 23 matches
    const otherMatches = matchData.filter((_, idx) => idx !== playerMatchIdx);

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-50 flex flex-col p-6 gap-6 font-body"
        >
            {/* Immersive Stadium Background */}
            <div className="absolute inset-0 bg-stadiumBlue z-[-1] overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
                <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neonGreen/20 via-stadiumBlue/80 to-stadiumBlue opacity-90 blur-3xl"></div>
                <div className="absolute bottom-0 inset-x-0 h-[300px] bg-gradient-to-t from-black to-transparent"></div>
            </div>

            {/* HERO SECTION: TV Broadcast Scoreboard */}
            {playerMatch && (
                <div className="bg-gradient-to-b from-stadiumBlue/90 to-black/80 border border-white/20 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden flex items-center justify-between backdrop-blur-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neonGreen via-pitchLime to-neonGreen"></div>
                    
                    {/* Left: Clock */}
                    <div className="w-1/4 text-center">
                        <div className="text-neonGreen font-bold uppercase tracking-widest text-[10px] mb-1">Match Clock</div>
                        <div className="text-7xl font-heading font-bold text-white leading-none tracking-wider drop-shadow-lg">
                            {minute < 10 ? `0${minute}` : minute}<span className="text-pitchLime animate-pulse">'</span>
                        </div>
                        <div className="mt-3">
                            {liveSim.halfTimePause ? (
                                <span className="text-xs font-bold text-neonGold tracking-widest bg-neonGold/10 border border-neonGold/30 px-6 py-1.5 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.2)]">HALF TIME</span>
                            ) : (
                                <span className="text-xs font-bold text-black tracking-widest bg-pitchLime px-6 py-1.5 rounded-full shadow-[0_0_15px_rgba(192,255,0,0.5)] animate-pulse">LIVE MATCH</span>
                            )}
                        </div>
                    </div>

                    {/* Middle: Big Scoreboard */}
                    <div className="w-2/4 flex items-center justify-center gap-10">
                        <div className="text-center flex flex-col items-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
                                <Flag code={playerMatch.homeTeam.code} size="w-24 h-24" className="mb-3 relative z-10 shadow-2xl border-4 border-white/10 rounded-xl" />
                            </div>
                            <div className="font-heading text-3xl font-bold tracking-widest uppercase drop-shadow-md">{playerMatch.homeTeam.abbr}</div>
                        </div>
                        
                        <div className="text-8xl font-heading font-bold px-10 py-2 bg-black/60 border-y-2 border-white/10 rounded-3xl shadow-inner flex items-center">
                            <motion.span key={`ph-${scores[`${playerMatch.fixture.home}-${playerMatch.fixture.away}`]?.home || 0}`} initial={{ scale: 1.5, color: '#C0FF00' }} animate={{ scale: 1, color: '#fff' }} className="drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                                {scores[`${playerMatch.fixture.home}-${playerMatch.fixture.away}`]?.home || 0}
                            </motion.span>
                            <span className="mx-6 text-gray-700 text-6xl pb-2">-</span>
                            <motion.span key={`pa-${scores[`${playerMatch.fixture.home}-${playerMatch.fixture.away}`]?.away || 0}`} initial={{ scale: 1.5, color: '#C0FF00' }} animate={{ scale: 1, color: '#fff' }} className="drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                                {scores[`${playerMatch.fixture.home}-${playerMatch.fixture.away}`]?.away || 0}
                            </motion.span>
                        </div>
                        
                        <div className="text-center flex flex-col items-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
                                <Flag code={playerMatch.awayTeam.code} size="w-24 h-24" className="mb-3 relative z-10 shadow-2xl border-4 border-white/10 rounded-xl" />
                            </div>
                            <div className="font-heading text-3xl font-bold tracking-widest uppercase drop-shadow-md">{playerMatch.awayTeam.abbr}</div>
                        </div>
                    </div>

                    {/* Right: Skip Button */}
                    <div className="w-1/4 flex justify-end">
                        <button 
                            onClick={() => dispatch({ type: 'SKIP_SIM' })}
                            className="px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105"
                        >
                            SKIP TO END &gt;&gt;
                        </button>
                    </div>
                </div>
            )}

            <div className="flex-1 flex gap-6 min-h-0">
                {/* BOTTOM LEFT: Global Scores (3-Column Grid) */}
                <div className="flex-[2] bg-stadiumBlue/60 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col shadow-2xl">
                    <div className="bg-black/40 px-6 py-4 border-b border-white/10 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-neonRed animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                            <h2 className="font-bold tracking-widest text-xs uppercase text-white">Global Scores <span className="text-gray-500 mx-2">•</span> Round {round - 1}</h2>
                        </div>
                    </div>
                    
                    <div className="flex-1 p-6 overflow-y-auto hide-scrollbar">
                        <div className="grid grid-cols-3 gap-x-10 gap-y-2">
                            {otherMatches.map(match => {
                                const { homeTeam, awayTeam, fixture } = match;
                                const matchId = `${fixture.home}-${fixture.away}`;
                                const score = scores[matchId] || { home: 0, away: 0 };
                                return (
                                    <LiveMatchRow 
                                        key={matchId}
                                        homeTeam={homeTeam}
                                        awayTeam={awayTeam}
                                        matchId={matchId}
                                        score={score}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* BOTTOM RIGHT: Commentary Feed */}
                <div className="flex-1 bg-stadiumBlue/60 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col shadow-2xl">
                    <div className="bg-black/40 px-6 py-4 border-b border-white/10 flex justify-between items-center">
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Match Commentary</span>
                        <span className="text-[10px] bg-neonBlue/20 text-neonBlue border border-neonBlue/30 px-2 py-0.5 rounded font-bold uppercase">LIVE FEED</span>
                    </div>
                    
                    <div className="flex-1 p-5 overflow-y-auto hide-scrollbar flex flex-col gap-3">
                        <AnimatePresence>
                            {playerMatchEvents.slice().reverse().map((evt) => (
                                <motion.div 
                                    key={evt.key}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`p-3 rounded-xl border flex gap-4 text-sm shadow-md transition-colors ${evt.type === 'goal' ? 'bg-pitchLime/10 border-pitchLime text-white shadow-[0_0_15px_rgba(192,255,0,0.15)]' : 'bg-black/40 border-white/5 text-gray-300'}`}
                                >
                                    <div className={`font-heading text-xl w-6 text-center ${evt.type === 'goal' ? 'text-pitchLime' : 'text-gray-500'}`}>{evt.minute}'</div>
                                    <div className="flex-1 leading-tight self-center">
                                        {evt.type === 'goal' && <span className="mr-2 text-lg">⚽</span>}
                                        {evt.type === 'yellow' && <span className="mr-2">🟨</span>}
                                        <span className="font-bold text-white mr-1 text-base">{evt.player}</span> 
                                        <span className={evt.type === 'goal' ? 'text-pitchLime font-bold uppercase tracking-wider text-xs ml-1' : 'opacity-80 text-xs ml-1'}>{evt.desc}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        <div ref={eventsEndRef} />
                        {playerMatchEvents.length === 0 && minute > 0 && (
                            <div className="text-center text-gray-500 italic mt-8 text-sm font-bold uppercase tracking-widest">Kickoff! The match is underway.</div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
