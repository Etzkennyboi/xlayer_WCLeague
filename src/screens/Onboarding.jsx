import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import Flag from '../components/Flag';
import { TOP_30_PLAYERS } from '../data/top30';

const CONTINENTS = [
    { name: 'Europe', icon: '🏰', color: 'from-blue-500/20 to-blue-900/40 border-blue-500/30' },
    { name: 'South America', icon: '🌎', color: 'from-green-500/20 to-green-900/40 border-green-500/30' },
    { name: 'Africa', icon: '🌍', color: 'from-orange-500/20 to-orange-900/40 border-orange-500/30' },
    { name: 'Asia', icon: '🏯', color: 'from-red-500/20 to-red-900/40 border-red-500/30' },
    { name: 'North America', icon: '🗽', color: 'from-indigo-500/20 to-indigo-900/40 border-indigo-500/30' },
    { name: 'Oceania', icon: '🏝️', color: 'from-cyan-500/20 to-cyan-900/40 border-cyan-500/30' },
];

export default function Onboarding() {
    const { state, dispatch } = useGame();
    const [step, setStep] = useState(0);
    const [selectedTeamIdx, setSelectedTeamIdx] = useState(-1);
    const [selectedContinent, setSelectedContinent] = useState(null);
    const [username, setUsername] = useState('');

    const { squad, budget } = state.fantasy;
    const [draftFilter, setDraftFilter] = useState('ALL');

    const hasGk = squad.some(p => p.position === 'GK');
    const hasDef = squad.some(p => p.position === 'DEF');

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
    };

    const filteredTeams = selectedContinent
        ? state.teams.filter(t => t.continent === selectedContinent)
        : [];

    const selectedTeam = selectedTeamIdx >= 0 ? state.teams[selectedTeamIdx] : null;

    const handleFinish = () => {
        dispatch({ type: 'SET_USERNAME', payload: username || 'Manager' });
        dispatch({ type: 'SELECT_TEAM', payload: selectedTeamIdx });
        dispatch({ type: 'AUTO_LINEUP' });
        dispatch({ type: 'START_GAME' });
    };

    const getTeamStars = (index) => {
        if (index < 5) return '★★★★★';
        if (index < 15) return '★★★★☆';
        if (index < 30) return '★★★☆☆';
        return '★★☆☆☆';
    };

    // Auto Fill logic for Onboarding Fantasy Draft
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

    return (
        <div className="min-h-screen bg-spaceBlack text-white flex flex-col items-center justify-center relative overflow-hidden">
            {/* Immersive Hero Background (Crisp full screen on Welcome step, heavily blurred on subsequent steps) */}
            <div 
                className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 ${
                    step === 0 
                        ? 'opacity-40 blur-none scale-100' 
                        : 'opacity-25 blur-3xl scale-110'
                }`} 
                style={{ backgroundImage: 'url(/hero.jpg)' }}
            ></div>
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neonBlue/10 via-spaceBlack/95 to-spaceBlack"></div>
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] opacity-25"></div>

            {/* Progress Bar (Hidden on Step 0 Welcome Screen) */}
            {step > 0 && (
                <div className="relative z-10 w-full max-w-3xl px-8 mb-12 animate-in fade-in duration-500">
                    <div className="flex justify-between text-xs text-gray-500 mb-2 font-bold tracking-widest uppercase">
                        <span className={step >= 1 ? 'text-neonGold' : ''}>Continent</span>
                        <span className={step >= 2 ? 'text-neonGold' : ''}>Nation</span>
                        <span className={step >= 3 ? 'text-neonGold' : ''}>Draft</span>
                        <span className={step >= 4 ? 'text-neonGold' : ''}>Identity</span>
                        <span className={step >= 5 ? 'text-neonGold' : ''}>Confirm</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-neonGold" animate={{ width: `${(step / 5) * 100}%` }} />
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                {/* STEP 0: Welcome Hero Landing */}
                {step === 0 && (
                    <motion.div 
                        key="s-welcome" 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.95 }} 
                        className="relative z-10 text-center max-w-3xl px-6 flex flex-col items-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-heading font-black text-neonGold mb-6 tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] text-center uppercase leading-none animate-in fade-in slide-in-from-top-6 duration-700">
                            WEB3 MANAGER<br/>
                            <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] font-extrabold text-3xl md:text-5xl tracking-widest mt-2 block">
                                WORLD CUP LEAGUE
                            </span>
                        </h1>
                        
                        <p className="text-gray-250 text-base md:text-lg leading-relaxed mb-12 max-w-2xl bg-black/60 px-8 py-6 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl drop-shadow-lg text-center font-bold animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                            Step into the dugout of a decentralized football franchise. Scout international players, draft global superstars, deploy tactics, and bet on real-world fixture outcomes verified by Oracles on the X Layer blockchain.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setStep(1)}
                            className="px-16 py-5 rounded-full font-black text-xl bg-neonGold text-black shadow-[0_0_35px_rgba(255,215,0,0.5)] hover:shadow-[0_0_55px_rgba(255,215,0,0.7)] transition-all uppercase tracking-widest border border-yellow-400 animate-in fade-in duration-1000"
                        >
                            GET STARTED ⚡
                        </motion.button>
                    </motion.div>
                )}

                {/* STEP 1: Choose Continent */}
                {step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="relative z-10 text-center max-w-4xl px-8">
                        <h1 className="text-4xl md:text-5xl font-heading font-black text-neonGold mb-3">CHOOSE YOUR CONTINENT</h1>
                        <p className="text-gray-400 mb-10">Where does your footballing journey begin?</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                            {CONTINENTS.map(c => (
                                <motion.div
                                    key={c.name}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => { setSelectedContinent(c.name); setStep(2); setSelectedTeamIdx(-1); }}
                                    className={`cursor-pointer rounded-2xl p-8 border bg-gradient-to-br ${c.color} flex flex-col items-center gap-3 hover:shadow-xl transition-shadow`}
                                >
                                    <span className="text-5xl">{c.icon}</span>
                                    <span className="font-bold text-lg">{c.name}</span>
                                    <span className="text-xs text-gray-400">{state.teams.filter(t => t.continent === c.name).length} Nations</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: Pick Nation */}
                {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="relative z-10 text-center max-w-3xl w-full px-8">
                        <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-2 mx-auto">← Back to Continents</button>
                        <h1 className="text-4xl font-heading font-black text-neonGold mb-3">SELECT YOUR NATION</h1>
                        <p className="text-gray-400 mb-10">{selectedContinent} — {filteredTeams.length} nations available</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-h-[400px] overflow-y-auto hide-scrollbar pr-2">
                            {filteredTeams.map(t => (
                                <motion.div
                                    key={t.id}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setSelectedTeamIdx(t.id)}
                                    className={`cursor-pointer rounded-xl p-5 flex items-center gap-5 border transition-all ${selectedTeamIdx === t.id ? 'border-neonGold bg-neonGold/10 shadow-[0_0_20px_rgba(255,215,0,0.15)]' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                                >
                                    <Flag code={t.code} size="w-14 h-14" />
                                    <div className="text-left flex-1">
                                        <div className="font-bold text-lg">{t.name}</div>
                                        <div className="text-neonGold text-sm">{getTeamStars(t.id)}</div>
                                    </div>
                                    <div className="text-gray-500 font-bold text-sm">{t.abbr}</div>
                                </motion.div>
                            ))}
                        </div>
                        <button
                            disabled={selectedTeamIdx === -1}
                            onClick={() => setStep(3)}
                            className={`px-12 py-4 rounded-full font-bold text-lg transition-all ${selectedTeamIdx !== -1 ? 'bg-neonGreen text-black hover:scale-105 shadow-[0_0_15px_rgba(0,255,0,0.4)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                        >NEXT →</button>
                    </motion.div>
                )}

                {/* STEP 3: Fantasy Draft */}
                {step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="relative z-10 text-center max-w-4xl w-full px-8">
                        <button onClick={() => setStep(2)} className="text-gray-400 hover:text-white text-sm mb-4 flex items-center gap-2 mx-auto">← Back</button>
                        <h1 className="text-4xl font-heading font-black text-neonGold mb-2">DRAFT YOUR ELITE 6</h1>
                        <p className="text-gray-400 mb-6">Build your Fantasy League squad to compete globally.</p>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 backdrop-blur-md flex flex-col max-h-[600px]">
                            {/* Selected Players Area */}
                            <div className="flex flex-wrap justify-center gap-2 mb-4 shrink-0">
                                {squad.map((p, i) => (
                                    <div key={i} className="bg-black/50 border border-white/20 rounded-xl p-2 w-28 relative group">
                                        <button onClick={() => dispatch({ type: 'FANTASY_REMOVE_PLAYER', payload: p.id })} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">✕</button>
                                        <div className="text-[10px] font-bold text-neonGold mb-1">{p.position}</div>
                                        <div className="text-xs font-bold truncate">{p.name}</div>
                                    </div>
                                ))}
                                {Array.from({ length: Math.max(0, 6 - squad.length) }).map((_, i) => (
                                    <div key={`empty-${i}`} className="bg-white/5 border border-dashed border-white/20 rounded-xl p-2 w-28 flex flex-col items-center justify-center opacity-50 min-h-[50px]">
                                        <div className="text-sm">+</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 shrink-0 border-b border-white/10 pb-6">
                                <div className="text-left">
                                    <div className="text-xs uppercase text-gray-500 font-bold tracking-widest">Budget</div>
                                    <div className="text-2xl font-black text-white">{budget}M</div>
                                </div>
                                
                                <div className="flex gap-2">
                                    {['ALL', 'GK', 'DEF', 'MID', 'FWD'].map(f => (
                                        <button
                                            key={f}
                                            onClick={() => setDraftFilter(f)}
                                            className={`px-3 py-1.5 rounded-full font-bold text-xs transition-all ${draftFilter === f ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'}`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    onClick={handleAutoFill}
                                    className="px-6 py-2 bg-neonGold/20 text-neonGold border border-neonGold hover:bg-neonGold hover:text-black rounded-full font-black text-sm uppercase tracking-widest transition-all"
                                >
                                    ⚡ AUTO FILL
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <AnimatePresence>
                                        {filteredDraftPool.map(p => {
                                            const isAdded = squad.some(s => s.id === p.id);
                                            const canAfford = budget >= p.value;
                                            
                                            let bgGradient = "from-zinc-800 to-zinc-900";
                                            if (p.value >= 20) bgGradient = "from-yellow-900/80 to-black";
                                            else if (p.value >= 15) bgGradient = "from-slate-700 to-slate-900";

                                            return (
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                                    key={p.id}
                                                    className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${bgGradient} border border-white/10 p-4 flex flex-col justify-between min-h-[140px] text-left`}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="text-xl font-black text-white/90">{p.value}M</div>
                                                        <div className="text-[10px] font-bold text-white bg-black/50 px-2 py-1 rounded">{p.position}</div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <h3 className="font-black text-sm uppercase leading-tight">{p.name}</h3>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleAddPlayer(p)} 
                                                        disabled={isAdded || !canAfford}
                                                        className={`w-full py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${isAdded ? 'bg-white/10 text-white/50' : canAfford ? 'bg-neonGold text-black hover:bg-yellow-400' : 'bg-red-500/20 text-red-400'}`}
                                                    >
                                                        {isAdded ? 'ADDED' : canAfford ? 'DRAFT' : 'EXPENSIVE'}
                                                    </button>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={squad.length !== 6}
                            onClick={() => setStep(4)}
                            className={`px-12 py-4 rounded-full font-bold text-lg transition-all ${squad.length === 6 ? 'bg-neonGreen text-black hover:scale-105 shadow-[0_0_15px_rgba(0,255,0,0.4)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                        >NEXT →</button>
                    </motion.div>
                )}

                {/* STEP 4: Username */}
                {step === 4 && (
                    <motion.div key="s4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="relative z-10 text-center max-w-lg w-full px-8">
                        <button onClick={() => setStep(3)} className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-2 mx-auto">← Back</button>
                        <h1 className="text-4xl font-heading font-black text-neonGold mb-3">MANAGER IDENTITY</h1>
                        <p className="text-gray-400 mb-10">Choose a name for the global leaderboard.</p>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10">
                            <input
                                type="text"
                                placeholder="Enter your manager name..."
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                maxLength={20}
                                className="w-full bg-black/60 border border-white/20 rounded-xl px-6 py-4 text-xl text-white font-bold outline-none focus:border-neonGold transition-colors text-center placeholder-gray-600"
                            />
                            <div className="text-xs text-gray-500 mt-3">{username.length}/20 characters</div>
                        </div>
                        <button
                            disabled={!username.trim()}
                            onClick={() => setStep(5)}
                            className={`px-12 py-4 rounded-full font-bold text-lg transition-all ${username.trim() ? 'bg-neonGreen text-black hover:scale-105 shadow-[0_0_15px_rgba(0,255,0,0.4)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                        >NEXT →</button>
                    </motion.div>
                )}

                {/* STEP 5: Confirm All */}
                {step === 5 && selectedTeam && (
                    <motion.div key="s5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="relative z-10 text-center max-w-2xl w-full px-8">
                        <button onClick={() => setStep(4)} className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-2 mx-auto">← Back</button>
                        <h1 className="text-4xl font-heading font-black text-neonGold mb-3">READY FOR GLORY</h1>
                        <p className="text-gray-400 mb-8">Review your franchise before starting.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">Nation</div>
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <Flag code={selectedTeam.code} size="w-16 h-16" />
                                    <div className="text-xl font-black">{selectedTeam.name}</div>
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">Manager</div>
                                <div className="flex flex-col items-center justify-center gap-3 h-full">
                                    <div className="text-4xl">👔</div>
                                    <div className="text-xl font-black text-neonGold">{username}</div>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleFinish}
                            className="px-16 py-5 rounded-full font-black text-xl bg-neonGold text-black shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-shadow"
                        >
                            BEGIN YOUR CAREER →
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
