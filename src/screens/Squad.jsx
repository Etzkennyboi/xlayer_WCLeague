import { useState } from 'react';
import { useGame } from '../context/GameContext';

export default function Squad() {
    const { state, dispatch } = useGame();
    const team = state.teams[state.playerTeamIndex];
    const [activeView, setActiveView] = useState('pitch'); // 'pitch' | 'roster'

    const togglePlayer = (id) => dispatch({ type: 'TOGGLE_LINEUP', payload: id });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12 lg:pb-0">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-heading font-black">SQUAD SELECTION</h1>
                    <p className="text-gray-400">Manage your starting XI and tactics.</p>
                </div>
                <button 
                    onClick={() => dispatch({ type: 'AUTO_LINEUP' })}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all border border-white/10"
                >
                    AUTO-PICK BEST XI
                </button>
            </header>
            
            {/* Mobile View Toggle Tabs */}
            <div className="flex lg:hidden bg-black/45 p-1 rounded-xl border border-white/10 shadow-inner w-full mb-2">
                <button 
                    onClick={() => setActiveView('pitch')}
                    className={`flex-1 py-3 rounded-lg font-bold text-xs transition-all text-center ${activeView === 'pitch' ? 'bg-neonGold text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'text-gray-400'}`}
                >
                    🏟️ PITCH VIEW
                </button>
                <button 
                    onClick={() => setActiveView('roster')}
                    className={`flex-1 py-3 rounded-lg font-bold text-xs transition-all text-center ${activeView === 'roster' ? 'bg-neonGreen text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'text-gray-400'}`}
                >
                    📋 ROSTER LIST
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visual Pitch */}
                <div className={`bg-white/5 border border-white/10 rounded-3xl p-4 md:p-8 backdrop-blur-md ${activeView === 'pitch' ? 'block' : 'hidden lg:block'}`}>
                    <div className="pitch-container h-[600px]">
                        <div className="formation-row">
                            {state.selectedLineup.map(id => {
                                const p = team.players.find(x => x.id === id);
                                if(p?.position !== 'FWD') return null;
                                return <div key={p.id} className="player-card" onClick={() => togglePlayer(p.id)}><div className="text-xl font-bold">{p.strength}</div><div className="text-xs truncate">{p.name}</div></div>
                            })}
                        </div>
                        <div className="formation-row">
                            {state.selectedLineup.map(id => {
                                const p = team.players.find(x => x.id === id);
                                if(p?.position !== 'MID') return null;
                                return <div key={p.id} className="player-card" onClick={() => togglePlayer(p.id)}><div className="text-xl font-bold">{p.strength}</div><div className="text-xs truncate">{p.name}</div></div>
                            })}
                        </div>
                        <div className="formation-row">
                            {state.selectedLineup.map(id => {
                                const p = team.players.find(x => x.id === id);
                                if(p?.position !== 'DEF') return null;
                                return <div key={p.id} className="player-card" onClick={() => togglePlayer(p.id)}><div className="text-xl font-bold">{p.strength}</div><div className="text-xs truncate">{p.name}</div></div>
                            })}
                        </div>
                        <div className="formation-row">
                            {state.selectedLineup.map(id => {
                                const p = team.players.find(x => x.id === id);
                                if(p?.position !== 'GK') return null;
                                return <div key={p.id} className="player-card" onClick={() => togglePlayer(p.id)}><div className="text-xl font-bold">{p.strength}</div><div className="text-xs truncate">{p.name}</div></div>
                            })}
                        </div>
                    </div>
                </div>

                {/* Roster List */}
                <div className={`bg-white/5 border border-white/10 rounded-3xl p-4 md:p-8 backdrop-blur-md flex flex-col ${activeView === 'roster' ? 'block' : 'hidden lg:block'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-400 uppercase tracking-widest text-sm">Full Roster</h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${state.selectedLineup.length === 11 ? 'bg-neonGreen/20 text-neonGreen' : 'bg-neonRed/20 text-neonRed'}`}>
                            {state.selectedLineup.length}/11 SELECTED
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 max-h-[550px]">
                        {['FWD', 'MID', 'DEF', 'GK'].map(pos => (
                            <div key={pos}>
                                <div className="text-xs text-neonGold font-bold mb-3 border-b border-white/10 pb-1">{pos}</div>
                                <div className="space-y-2">
                                    {team.players.filter(p => p.position === pos).sort((a,b)=>b.strength-a.strength).map(p => {
                                        const isSelected = state.selectedLineup.includes(p.id);
                                        return (
                                            <div 
                                                key={p.id} 
                                                onClick={() => togglePlayer(p.id)}
                                                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all ${isSelected ? 'bg-neonGreen/10 border-neonGreen shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 'bg-black/40 border-white/5 hover:bg-white/10'}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${isSelected ? 'bg-neonGreen text-black' : 'bg-gray-800 text-white'}`}>
                                                        {p.strength}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{p.name}</div>
                                                        <div className="text-xs text-gray-400 flex items-center gap-2">
                                                            Energy: {p.energy}%
                                                            <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                                                                <div className="h-full bg-neonGreen" style={{ width: `${p.energy}%` }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {isSelected && <div className="text-neonGreen text-xl bg-neonGreen/20 w-8 h-8 flex items-center justify-center rounded-full">✓</div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
