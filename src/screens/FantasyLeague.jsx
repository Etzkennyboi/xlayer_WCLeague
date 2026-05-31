import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useWeb3 } from '../web3/useWeb3';
import Flag from '../components/Flag';
import { TOP_30_PLAYERS } from '../data/top30';

const COUNTRY_TO_FLAG_CODE = {
    'france': 'fr',
    'argentina': 'ar',
    'brazil': 'br',
    'england': 'gb',
    'poland': 'pl',
    'portugal': 'pt',
    'belgium': 'be',
    'spain': 'es',
    'germany': 'de',
    'croatia': 'hr',
    'netherlands': 'nl',
    'morocco': 'ma',
    'canada': 'ca',
    'italy': 'it'
};

export default function FantasyLeague() {
    const { state, dispatch } = useGame();
    const { wallet } = useWeb3();
    
    // Toggle between 'pitch' (My Squad) and 'market' (Draft Market)
    const [view, setView] = useState('pitch'); 
    const [draftFilter, setDraftFilter] = useState('ALL');
    const [leaderboard, setLeaderboard] = useState([]);
    
    const userTeam = state.teams[state.playerTeamIndex]?.name || 'Argentina';
    const { squad, budget, totalPoints } = state.fantasy;
    
    // Position requirement check
    const hasGk = squad.some(p => p.position === 'GK');
    const hasDef = squad.some(p => p.position === 'DEF');

    useEffect(() => {
        // Fetch leaderboard initially and poll every 30s
        const fetchLeaderboard = () => {
            fetch('/api/fantasy/leaderboard')
                .then(res => res.json())
                .then(data => setLeaderboard(data))
                .catch(console.error);
        };
        fetchLeaderboard();
        const interval = setInterval(fetchLeaderboard, 30000);
        return () => clearInterval(interval);
    }, []);

    const filteredDraftPool = TOP_30_PLAYERS.filter(p => draftFilter === 'ALL' || p.position === draftFilter);

    const handleAddPlayer = (player) => {
        if (squad.length >= 6) return dispatch({ type: 'ADD_TOAST', payload: { message: 'Squad full (Max 6)!', type: 'error' } });
        if (budget < player.value) return dispatch({ type: 'ADD_TOAST', payload: { message: 'Not enough budget!', type: 'error' } });
        if (squad.find(p => p.id === player.id)) return dispatch({ type: 'ADD_TOAST', payload: { message: 'Player already in squad!', type: 'error' } });
        
        const slotsLeft = 6 - squad.length;
        if (slotsLeft === 2 && !hasGk && !hasDef) {
            if (player.position !== 'GK' && player.position !== 'DEF') {
                 return dispatch({ type: 'ADD_TOAST', payload: { message: 'You must select a GK and DEF!', type: 'error' } });
            }
        }
        if (slotsLeft === 1) {
            if (!hasGk && player.position !== 'GK') return dispatch({ type: 'ADD_TOAST', payload: { message: 'You must select a GK!', type: 'error' } });
            if (!hasDef && player.position !== 'DEF') return dispatch({ type: 'ADD_TOAST', payload: { message: 'You must select a DEF!', type: 'error' } });
        }

        dispatch({ type: 'FANTASY_ADD_PLAYER', payload: player });
        dispatch({ type: 'ADD_TOAST', payload: { message: `${player.name} drafted!`, type: 'success' } });
    };

    const handleRemovePlayer = (id) => {
        dispatch({ type: 'FANTASY_REMOVE_PLAYER', payload: id });
    };

    const handleAutoFill = () => {
        let validSquad = [];
        let attempts = 0;
        
        while (attempts < 100) {
            attempts++;
            const gks = TOP_30_PLAYERS.filter(p => p.position === 'GK');
            const gk = gks[Math.floor(Math.random() * gks.length)];
            
            const defs = TOP_30_PLAYERS.filter(p => p.position === 'DEF');
            const def = defs[Math.floor(Math.random() * defs.length)];
            
            const remainingPool = TOP_30_PLAYERS.filter(p => p.id !== gk.id && p.id !== def.id);
            const shuffled = [...remainingPool].sort(() => 0.5 - Math.random());
            const others = shuffled.slice(0, 4);
            
            const potentialSquad = [gk, def, ...others];
            const cost = potentialSquad.reduce((sum, p) => sum + p.value, 0);
            
            if (cost <= 100) {
                validSquad = potentialSquad;
                break;
            }
        }
        
        if (validSquad.length === 6) {
            dispatch({ type: 'FANTASY_SET_SQUAD', payload: validSquad });
            dispatch({ type: 'ADD_TOAST', payload: { message: 'Squad Auto-Filled!', type: 'success' } });
        }
    };

    const calculatePoints = async () => {
        if (squad.length === 0) return;
        try {
            const res = await fetch(`/api/fantasy?action=calculate_points&players=${encodeURIComponent(JSON.stringify(squad))}`);
            const data = await res.json();
            
            let total = 0;
            data.forEach(pt => total += pt.totalPoints);
            
            dispatch({ type: 'FANTASY_SET_POINTS', payload: state.fantasy.totalPoints + total });
            dispatch({ type: 'ADD_TOAST', payload: { message: `Gained ${total} points!`, type: 'success' } });
            
            // Post to leaderboard
            await fetch('/api/fantasy/leaderboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    walletAddress: wallet.address || 'guest',
                    username: state.username || 'Guest Manager',
                    flagCode: userTeam,
                    totalPoints: state.fantasy.totalPoints + total,
                    squad: squad.map(s => s.name)
                })
            });
            
            // Refresh leaderboard
            fetch('/api/fantasy/leaderboard').then(r => r.json()).then(setLeaderboard);
        } catch(err) {
            dispatch({ type: 'ADD_TOAST', payload: { message: 'Failed to calc points', type: 'error' } });
        }
    };



    return (
        <div className="h-full flex flex-col lg:flex-row gap-6 p-6 max-w-[1600px] mx-auto text-white">
            
            {/* LEFT COLUMN: MAIN ARENA (Pitch / Draft) */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="mb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black mb-2 text-neonGold tracking-tight uppercase drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">Fantasy League</h1>
                        <p className="text-gray-400">Build your 6-man dream team and climb the leaderboard.</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs uppercase opacity-70 font-bold tracking-widest text-blue-300">Budget Remaining</div>
                        <div className="text-3xl font-black text-white">{budget}<span className="text-xl text-white/50">M</span></div>
                    </div>
                </header>

                {/* View Toggle */}
                <div className="flex gap-4 mb-6">
                    <button 
                        onClick={() => setView('pitch')}
                        className={`px-8 py-3 rounded-full font-black uppercase tracking-wider transition-all shadow-lg ${view === 'pitch' ? 'bg-neonGold text-black shadow-[0_0_20px_rgba(255,215,0,0.5)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'}`}
                    >
                        My Squad
                    </button>
                    <button 
                        onClick={() => setView('market')}
                        className={`px-8 py-3 rounded-full font-black uppercase tracking-wider transition-all shadow-lg ${view === 'market' ? 'bg-neonGold text-black shadow-[0_0_20px_rgba(255,215,0,0.5)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'}`}
                    >
                        Draft Market
                    </button>
                </div>

                {/* Main Arena Content */}
                <div className="flex-1 overflow-y-auto pb-10">
                    <AnimatePresence mode="wait">
                        
                        {/* PITCH VIEW */}
                        {view === 'pitch' && (
                            <motion.div 
                                key="pitch" 
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="space-y-6 h-full flex flex-col"
                            >
                                <div className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold border border-white/20">
                                            {squad.length}/6
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Total Points</div>
                                            <div className="text-4xl font-black text-neonGold">{totalPoints}</div>
                                        </div>
                                    </div>
                                    <button onClick={calculatePoints} className="px-6 py-4 bg-neonGreen text-black hover:bg-green-400 rounded-xl font-black uppercase tracking-widest transition-transform hover:scale-105 shadow-[0_0_20px_rgba(0,255,0,0.4)]">
                                        Refresh Points
                                    </button>
                                </div>

                                <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md relative flex flex-col min-h-[600px] justify-center shadow-2xl">
                                    {squad.length === 0 ? (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/40 backdrop-blur-sm rounded-3xl">
                                            <div className="text-6xl mb-4 opacity-50">⚽</div>
                                            <h3 className="text-2xl font-black uppercase text-white/80">Your Squad is Empty</h3>
                                            <p className="text-gray-400 mt-2">Switch to the Draft Market to sign players.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full py-4">
                                            {squad.map(p => {
                                                const flagCode = COUNTRY_TO_FLAG_CODE[p.teamName.toLowerCase()] || 'un';
                                                return (
                                                    <motion.div 
                                                        key={p.id}
                                                        whileHover={{ scale: 1.04 }}
                                                        onClick={() => handleRemovePlayer(p.id)}
                                                        className="relative bg-gradient-to-br from-yellow-950/20 via-stadiumBlue/90 to-black border-2 border-neonGold rounded-2xl p-6 flex flex-col justify-between h-64 shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:border-white/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all cursor-pointer group"
                                                    >
                                                        {/* Release Player Button */}
                                                        <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-neonRed text-white rounded-full flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg border-2 border-white text-xs">
                                                            ✕
                                                        </div>

                                                        {/* Card Header (Position & Value) */}
                                                        <div className="flex justify-between items-start">
                                                            <span className="bg-black/60 border border-white/10 px-2 py-1 rounded text-[10px] font-bold text-neonGold tracking-widest uppercase">
                                                                {p.position}
                                                            </span>
                                                            <span className="font-heading font-black text-2xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                                                                {p.value}<span className="text-xs text-white/50">M</span>
                                                            </span>
                                                        </div>

                                                        {/* Country Flag & Team Name */}
                                                        <div className="flex items-center gap-3 my-3">
                                                            <Flag code={flagCode} size="w-10 h-10 border border-white/10 shadow-lg" />
                                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest truncate max-w-[120px]">{p.teamName}</span>
                                                        </div>

                                                        {/* Player Name & Sign Strip */}
                                                        <div className="mt-auto border-t border-white/5 pt-3">
                                                            <h3 className="font-heading font-black text-2xl uppercase tracking-wider text-neonGold group-hover:text-white transition-colors truncate">
                                                                {p.name}
                                                            </h3>
                                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">Signed Franchise Player</div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* DRAFT MARKET VIEW */}
                        {view === 'market' && (
                            <motion.div 
                                key="market" 
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <div className="bg-gradient-to-r from-neonGold/20 to-transparent p-6 rounded-2xl border border-neonGold/30 shadow-[0_0_30px_rgba(255,215,0,0.15)] flex justify-between items-center">
                                    <div>
                                        <h2 className="text-3xl font-black text-neonGold tracking-widest uppercase">The Elite 30</h2>
                                        <p className="text-gray-300 font-medium">Draft from the world's best. No country restrictions.</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3 bg-black/40 p-3 rounded-2xl border border-white/5 backdrop-blur-md">
                                    <div className="flex flex-wrap gap-2">
                                        {['ALL', 'GK', 'DEF', 'MID', 'FWD'].map(f => (
                                            <button
                                                key={f}
                                                onClick={() => setDraftFilter(f)}
                                                className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${draftFilter === f ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                                            >
                                                {f === 'ALL' ? 'ALL' : f === 'GK' ? '🧤 GK (4)' : f === 'DEF' ? '🛡️ DEF (10)' : f === 'MID' ? '🎯 MID (10)' : '⚡ FWD (6)'}
                                            </button>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={handleAutoFill}
                                        className="px-6 py-2 bg-neonGold/20 text-neonGold border border-neonGold hover:bg-neonGold hover:text-black font-black uppercase rounded-full transition-all shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                                    >
                                        ⚡ Auto Fill
                                    </button>
                                </div>

                                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                    <AnimatePresence>
                                        {filteredDraftPool.map(p => {
                                            const isAdded = squad.some(s => s.id === p.id);
                                            const canAfford = budget >= p.value;
                                            
                                            let bgGradient = "from-zinc-800 to-zinc-900";
                                            let borderGlow = "border-zinc-700";
                                            if (p.value >= 20) {
                                                bgGradient = "from-yellow-900/80 to-black";
                                                borderGlow = "border-neonGold shadow-[0_0_15px_rgba(255,215,0,0.2)]";
                                            } else if (p.value >= 15) {
                                                bgGradient = "from-slate-700 to-slate-900";
                                                borderGlow = "border-slate-400";
                                            }

                                            return (
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                                    whileHover={{ y: -5 }}
                                                    key={p.id}
                                                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${bgGradient} border ${borderGlow} p-5 flex flex-col justify-between min-h-[220px] transition-all`}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none transform -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] duration-1000 ease-in-out" />
                                                    
                                                    <div className="flex justify-between items-start z-10">
                                                        <div className="text-3xl font-black tracking-tighter text-white/90 drop-shadow-md">
                                                            {p.value}<span className="text-sm text-white/50">M</span>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/10 mb-1">{p.position}</div>
                                                            <div className="text-xs text-gray-300 truncate max-w-[80px]">{p.teamName}</div>
                                                        </div>
                                                    </div>

                                                    <div className="z-10 mt-auto mb-4">
                                                        <h3 className="font-black text-xl uppercase leading-tight tracking-wide drop-shadow-lg">{p.name}</h3>
                                                    </div>

                                                    <button 
                                                        onClick={() => handleAddPlayer(p)} 
                                                        disabled={isAdded || !canAfford}
                                                        className={`z-10 w-full py-3 rounded-xl font-bold uppercase tracking-wider transition-all ${isAdded ? 'bg-white/10 text-white/50 border border-white/5' : canAfford ? 'bg-neonGold text-black hover:bg-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)]' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
                                                    >
                                                        {isAdded ? 'ADDED' : canAfford ? 'DRAFT' : 'TOO EXPENSIVE'}
                                                    </button>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* RIGHT COLUMN: LEADERBOARD PANEL */}
            <div className="w-full lg:w-[400px] flex flex-col bg-black/40 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl">
                <div className="bg-white/5 border-b border-white/10 p-6">
                    <h2 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-3">
                        <span className="text-2xl">🏆</span> Global Leaderboard
                    </h2>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-gray-400 font-bold uppercase text-xs sticky top-0 backdrop-blur-md">
                            <tr>
                                <th className="p-4 pl-6">Rank</th>
                                <th className="p-4">Manager</th>
                                <th className="p-4 pr-6 text-right">PTS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((entry, idx) => {
                                const isMe = entry.walletAddress === wallet.address;
                                return (
                                    <tr key={idx} className={`border-b border-white/5 transition-colors ${isMe ? 'bg-neonGold/10' : 'hover:bg-white/5'}`}>
                                        <td className="p-4 pl-6 font-mono font-bold text-gray-400">
                                            {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                                        </td>
                                        <td className="p-4">
                                            <div className={`font-bold truncate max-w-[150px] ${isMe ? 'text-neonGold' : 'text-white'}`}>{entry.username}</div>
                                            <div className="text-xs text-gray-500 uppercase">{entry.flagCode}</div>
                                        </td>
                                        <td className="p-4 pr-6 text-right font-black text-xl text-white drop-shadow-md">
                                            {entry.totalPoints}
                                        </td>
                                    </tr>
                                );
                            })}
                            {leaderboard.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="p-10 text-center text-gray-500 font-medium">
                                        No entries yet.<br/>Be the first to draft a team!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Me Summary Pin */}
                {wallet.connected && (
                    <div className="bg-neonGold/10 border-t border-neonGold/30 p-4 backdrop-blur-lg flex justify-between items-center">
                        <div>
                            <div className="text-xs uppercase tracking-widest text-neonGold font-bold mb-1">Your Standing</div>
                            <div className="font-bold">{state.username || 'Manager'}</div>
                        </div>
                        <div className="text-3xl font-black text-neonGold">{totalPoints}</div>
                    </div>
                )}
            </div>

        </div>
    );
}
