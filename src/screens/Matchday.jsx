import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import Flag from '../components/Flag';
import BetSlip from '../components/BetSlip';
import LiveSimulation from '../components/LiveSimulation';
import OracleDashboard from '../components/OracleDashboard';
import { calculateTeamStrength } from '../engine/MatchSim';

export default function Matchday() {
    const { state, dispatch } = useGame();
    const [mode, setMode] = useState('league');

    const currentRoundIdx = state.round - 1;
    const fixtures = state.fixtures[currentRoundIdx] || [];
    const [realFixtures, setRealFixtures] = useState([]);
    
    useEffect(() => {
        fetch('/api/fixtures').then(r => r.json()).then(setRealFixtures).catch(console.error);
    }, []);
    
    // Find player's match
    const playerMatch = fixtures.find(f => f.home === state.playerTeamIndex || f.away === state.playerTeamIndex);
    
    // Only show the 6 banger fixtures that have active markets, and always include the player's own team match
    const bangerFixtures = fixtures.filter(f => {
        const isPlayerMatch = f.home === state.playerTeamIndex || f.away === state.playerTeamIndex;
        if (isPlayerMatch) return true;
        const matchId = `${state.round - 1}-${f.home}-${f.away}`;
        return state.markets.some(m => m.id === matchId);
    });

    const handleSimulate = () => {
        if (state.selectedLineup.length < 11) {
            dispatch({ type: 'ADD_TOAST', payload: { message: 'Incomplete squad. Auto-filling lineup.', type: 'info' }});
            dispatch({ type: 'AUTO_LINEUP' });
        }
        dispatch({ type: 'START_LIVE_SIM' });
    };

    const handleOddsClick = (matchId, selection, odds, homeAbbr, awayAbbr) => {
        dispatch({
            type: 'ADD_TO_SLIP',
            payload: { matchId, selection, odds, homeAbbr, awayAbbr }
        });
    };

    const renderHeroMatch = () => {
        if (!playerMatch) return null;
        const homeTeam = state.teams[playerMatch.home];
        const awayTeam = state.teams[playerMatch.away];
        
        const homeIsPlayer = playerMatch.home === state.playerTeamIndex;
        
        const playerStrength = calculateTeamStrength(state.teams[state.playerTeamIndex], state.selectedLineup).toFixed(1);
        const opponentStrength = calculateTeamStrength(homeIsPlayer ? awayTeam : homeTeam, null).toFixed(1);
        
        const winProb = (parseFloat(playerStrength) / (parseFloat(playerStrength) + parseFloat(opponentStrength))) * 100;

        return (
            <div className="bg-gradient-to-br from-stadiumBlue/80 to-black/60 border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl mb-8 group backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neonGreen to-pitchLime"></div>
                
                <div className="flex justify-between items-center mb-6">
                    <div className="text-xs text-neonGreen font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-neonGreen animate-pulse"></span>
                        YOUR NEXT MATCH
                    </div>
                    <div className="text-xs font-heading font-bold tracking-widest text-white bg-black/50 px-4 py-1.5 rounded border border-white/5 shadow-inner">
                        OVR: {playerStrength} vs {opponentStrength}
                    </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                    <div className="text-center w-2/5 flex flex-col items-center">
                        <Flag code={homeTeam.code} size="w-24 h-24" className="mb-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] border-2 border-white/5 rounded-xl group-hover:scale-105 transition-transform duration-500" />
                        <div className="font-heading text-3xl font-bold tracking-widest uppercase drop-shadow-md">{homeTeam.abbr}</div>
                    </div>
                    <div className="text-xl font-heading font-bold text-gray-500 bg-black/40 px-6 py-2 rounded-xl border border-white/5 shadow-inner">VS</div>
                    <div className="text-center w-2/5 flex flex-col items-center">
                        <Flag code={awayTeam.code} size="w-24 h-24" className="mb-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] border-2 border-white/5 rounded-xl group-hover:scale-105 transition-transform duration-500" />
                        <div className="font-heading text-3xl font-bold tracking-widest uppercase drop-shadow-md">{awayTeam.abbr}</div>
                    </div>
                </div>

                <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between text-xs text-gray-400 font-bold uppercase tracking-widest">
                        <span>Win Probability</span>
                        <span className="text-white">{winProb.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-black/80 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-gradient-to-r from-neonGreen to-pitchLime transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${winProb}%` }}></div>
                    </div>
                </div>
            </div>
        );
    };

    const renderFixtureRow = (f, isReal = false) => {
        let homeTeam, awayTeam, matchId, market;
        if (isReal) {
            const hName = f.teams?.home?.name || 'HOM';
            const aName = f.teams?.away?.name || 'AWY';
            
            const findCode = (name) => {
                const found = state.teams.find(t => t.name.toLowerCase() === name.toLowerCase());
                // Fallback to 'AR' (Argentina) or 'BR' (Brazil) etc if not found for testing, but mostly 'UN'
                return found ? found.code : 'UN';
            };

            homeTeam = { abbr: hName.substring(0,3).toUpperCase(), code: findCode(hName) };
            awayTeam = { abbr: aName.substring(0,3).toUpperCase(), code: findCode(aName) };
            matchId = f.id.toString();
            // Mock market odds for real fixtures
            market = { odds1: 2.10, oddsX: 3.40, odds2: 3.10 }; 
        } else {
            homeTeam = state.teams[f.home];
            awayTeam = state.teams[f.away];
            matchId = `${state.round - 1}-${f.home}-${f.away}`;
            market = state.markets.find(m => m.id === matchId);
        }
        
        const slipItem = state.betSlip.find(b => b.matchId === matchId);
        const isPlayerMatch = !isReal && (f.home === state.playerTeamIndex || f.away === state.playerTeamIndex);

        return (
            <div key={matchId} className={`flex flex-col lg:flex-row items-center justify-between p-6 border-b border-white/5 hover:bg-white/10 transition-all gap-6 group relative ${isPlayerMatch ? 'bg-neonGold/5 border-l-4 border-l-neonGold shadow-[inset_0_0_20px_rgba(245,158,11,0.05)]' : ''}`}>
                {/* Horizontal Symmetrical Team Columns */}
                <div className="flex-1 flex items-center justify-between gap-6 w-full max-w-2xl">
                    {/* Home Team (Right aligned text + flag) */}
                    <div className="flex items-center gap-4 w-[42%] justify-end">
                        <span className={`font-heading text-2xl font-black tracking-wider uppercase transition-colors text-right truncate ${isPlayerMatch && f.home === state.playerTeamIndex ? 'text-neonGold' : 'text-white group-hover:text-neonGold'}`}>
                            {homeTeam.abbr}
                        </span>
                        <div className="relative group/flag flex-shrink-0">
                            <div className="absolute inset-0 bg-white/20 blur rounded-full scale-105 opacity-0 group-hover/flag:opacity-100 transition-opacity"></div>
                            <Flag code={homeTeam.code} size="w-14 h-14 rounded-full border-2 border-white/25 shadow-xl relative z-10 transition-transform group-hover/flag:scale-110" />
                        </div>
                    </div>

                    {/* VS Badge in Center */}
                    <div className="flex flex-col items-center justify-center px-4 py-2 bg-black/40 rounded-xl border border-white/10 min-w-[80px] shadow-inner flex-shrink-0">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">VS</span>
                        {isPlayerMatch && (
                            <span className="text-[9px] bg-neonGold text-black font-extrabold px-1.5 py-0.5 rounded shadow-sm animate-pulse tracking-wide whitespace-nowrap">
                                MY TEAM
                            </span>
                        )}
                    </div>

                    {/* Away Team (Flag + left aligned text) */}
                    <div className="flex items-center gap-4 w-[42%] justify-start">
                        <div className="relative group/flag flex-shrink-0">
                            <div className="absolute inset-0 bg-white/20 blur rounded-full scale-105 opacity-0 group-hover/flag:opacity-100 transition-opacity"></div>
                            <Flag code={awayTeam.code} size="w-14 h-14 rounded-full border-2 border-white/25 shadow-xl relative z-10 transition-transform group-hover/flag:scale-110" />
                        </div>
                        <span className={`font-heading text-2xl font-black tracking-wider uppercase transition-colors text-left truncate ${isPlayerMatch && f.away === state.playerTeamIndex ? 'text-neonGold' : 'text-white group-hover:text-neonGold'}`}>
                            {awayTeam.abbr}
                        </span>
                    </div>
                </div>

                {market ? (
                    <div className="flex gap-3 flex-shrink-0">
                        <button 
                            onClick={() => handleOddsClick(matchId, '1', market.odds1, homeTeam.abbr, awayTeam.abbr)}
                            className={`flex flex-col items-center justify-center w-20 py-3 rounded-xl border transition-all ${slipItem?.selection === '1' ? 'bg-neonGold text-black border-neonGold shadow-[0_0_15px_rgba(245,158,11,0.4)] font-bold' : 'bg-black/50 border-white/10 hover:border-neonGold/50 text-white shadow-inner'}`}
                        >
                            <span className="text-[10px] opacity-70 font-bold uppercase mb-1">HOME</span>
                            <span className="font-heading text-xl leading-none">{market.odds1}</span>
                        </button>
                        <button 
                            onClick={() => handleOddsClick(matchId, 'X', market.oddsX, homeTeam.abbr, awayTeam.abbr)}
                            className={`flex flex-col items-center justify-center w-20 py-3 rounded-xl border transition-all ${slipItem?.selection === 'X' ? 'bg-neonGold text-black border-neonGold shadow-[0_0_15px_rgba(245,158,11,0.4)] font-bold' : 'bg-black/50 border-white/10 hover:border-neonGold/50 text-white shadow-inner'}`}
                        >
                            <span className="text-[10px] opacity-70 font-bold uppercase mb-1">DRAW</span>
                            <span className="font-heading text-xl leading-none">{market.oddsX}</span>
                        </button>
                        <button 
                            onClick={() => handleOddsClick(matchId, '2', market.odds2, homeTeam.abbr, awayTeam.abbr)}
                            className={`flex flex-col items-center justify-center w-20 py-3 rounded-xl border transition-all ${slipItem?.selection === '2' ? 'bg-neonGold text-black border-neonGold shadow-[0_0_15px_rgba(245,158,11,0.4)] font-bold' : 'bg-black/50 border-white/10 hover:border-neonGold/50 text-white shadow-inner'}`}
                        >
                            <span className="text-[10px] opacity-70 font-bold uppercase mb-1">AWAY</span>
                            <span className="font-heading text-xl leading-none">{market.odds2}</span>
                        </button>
                    </div>
                ) : (
                    <div className="text-xs text-gray-600 font-bold uppercase tracking-widest px-4 py-3 bg-black/20 rounded-xl border border-white/5 flex-shrink-0">Odds Closed</div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 h-auto lg:h-[calc(100vh-140px)] relative font-body pb-12 lg:pb-0">
            <LiveSimulation />
            
            <div className="flex-1 flex flex-col min-w-0 w-full">
                <header className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-4xl font-heading font-bold uppercase tracking-wider drop-shadow-md">MATCHDAY {state.round}</h1>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">Review Odds & Place Predictions</p>
                    </div>
                    <div className="flex bg-black/50 border border-white/10 rounded-xl p-1.5 shadow-inner">
                        <button onClick={() => setMode('league')} className={`px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors ${mode === 'league' ? 'bg-white/20 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}>LEAGUE</button>
                        <button onClick={() => setMode('oracle')} className={`px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${mode === 'oracle' ? 'bg-neonBlue/20 text-neonBlue border border-neonBlue/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'text-gray-500 hover:text-gray-300'}`}>
                            ORACLE <span className="text-[10px] bg-neonBlue text-black px-1.5 rounded-sm shadow-md">WEB3</span>
                        </button>
                    </div>
                </header>

                {mode === 'league' ? (
                    <div className="flex-1 overflow-y-auto hide-scrollbar pr-4">
                        {renderHeroMatch()}
                        
                        <div className="bg-stadiumBlue/60 border border-white/10 rounded-2xl overflow-hidden shadow-2xl mb-8 backdrop-blur-xl">
                            <div className="bg-black/40 px-8 py-4 border-b border-white/10 flex justify-between items-center">
                                <span className="text-sm font-bold text-neonGold uppercase tracking-widest flex items-center gap-2">
                                    <span className="animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]">🔥</span> FEATURED BANGER MARKETS
                                </span>
                                <span className="text-xs text-white font-bold bg-black/60 px-3 py-1 rounded border border-white/5 shadow-inner">LIVE</span>
                            </div>
                            <div className="p-2">
                                {realFixtures.length > 0 ? (
                                    realFixtures.map(f => renderFixtureRow(f, true))
                                ) : (
                                    bangerFixtures.map(f => renderFixtureRow(f, false))
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <OracleDashboard />
                )}
            </div>

            <div className="w-full lg:w-80 flex flex-col gap-6">
                <button
                    onClick={handleSimulate}
                    className="w-full py-6 rounded-2xl font-heading text-2xl font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] relative overflow-hidden group bg-neonGreen text-black hover:scale-105 border border-pitchLime"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    SIMULATE MATCHDAY ▶
                </button>

                <BetSlip />
            </div>
        </div>
    );
}
