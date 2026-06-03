"use client";

import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialGameState } from '../engine/GameState';
import { generateTeams } from '../engine/Players';
import { generateFixtures, generateRoundTimeline } from '../engine/MatchSim';

const GameContext = createContext();

function generateMarkets(fixtures, playerTeamIndex, roundIndex, teams) {
    // Generate markets for the Top 6 "Banger" Matches based on combined team strength
    const nonPlayerFixtures = fixtures.filter(f => f.home !== playerTeamIndex && f.away !== playerTeamIndex);
    
    // Calculate combined strength for each fixture
    const fixturesWithStrength = nonPlayerFixtures.map(f => {
        const homeStr = teams[f.home].players.slice(0, 11).reduce((s, p) => s + p.strength, 0) / 11;
        const awayStr = teams[f.away].players.slice(0, 11).reduce((s, p) => s + p.strength, 0) / 11;
        return { fixture: f, homeStr, awayStr, combinedStr: homeStr + awayStr };
    });

    // Sort by highest combined strength to find the "bangers"
    fixturesWithStrength.sort((a, b) => b.combinedStr - a.combinedStr);
    
    // Pick the top 6
    const bangerFixtures = fixturesWithStrength.slice(0, 6);

    const selectedFixtures = [...bangerFixtures];
    
    // Always include the player's own team match
    const playerFixture = fixtures.find(f => f.home === playerTeamIndex || f.away === playerTeamIndex);
    if (playerFixture) {
        const homeStr = teams[playerFixture.home].players.slice(0, 11).reduce((s, p) => s + p.strength, 0) / 11;
        const awayStr = teams[playerFixture.away].players.slice(0, 11).reduce((s, p) => s + p.strength, 0) / 11;
        selectedFixtures.unshift({ fixture: playerFixture, homeStr, awayStr, combinedStr: homeStr + awayStr });
    }

    return selectedFixtures.map(({ fixture: f, homeStr, awayStr }) => {
        const total = homeStr + awayStr;
        const homeProb = homeStr / total;
        const awayProb = awayStr / total;
        const drawProb = 0.25;

        return {
            id: `${roundIndex}-${f.home}-${f.away}`,
            homeIdx: f.home,
            awayIdx: f.away,
            round: roundIndex,
            resolved: false,
            odds1: "2.00",
            oddsX: "2.00",
            odds2: "2.00",
        };
    });
}

function gameReducer(state, action) {
    switch (action.type) {
        case 'INIT_GAME': {
            const teams = generateTeams();
            const fixtures = generateFixtures(teams);
            return { ...state, teams, fixtures };
        }

        // ─── ONBOARDING ───
        case 'SET_CONTINENT':
            return { ...state, selectedContinent: action.payload, onboardingStep: 1 };
        case 'SET_USERNAME':
            return { ...state, username: action.payload };
        case 'SET_ONBOARDING_STEP':
            return { ...state, onboardingStep: action.payload };

        case 'SELECT_TEAM':
            return { ...state, playerTeamIndex: action.payload };

        case 'START_GAME': {
            const currentRoundFixtures = state.fixtures[0];
            return {
                ...state,
                gameStarted: true,
                markets: generateMarkets(currentRoundFixtures, state.playerTeamIndex, 0, state.teams)
            };
        }

        // ─── SQUAD ───
        case 'TOGGLE_LINEUP': {
            const playerId = action.payload;
            const currentLineup = [...state.selectedLineup];
            const index = currentLineup.indexOf(playerId);
            if (index > -1) {
                currentLineup.splice(index, 1);
            } else if (currentLineup.length < 11) {
                currentLineup.push(playerId);
            }
            return { ...state, selectedLineup: currentLineup };
        }
        case 'AUTO_LINEUP': {
            const team = state.teams[state.playerTeamIndex];
            const sorted = [...team.players].sort((a, b) => b.strength - a.strength);
            const needed = { GK: 1, DEF: 4, MID: 4, FWD: 2 };
            const newLineup = [];
            Object.entries(needed).forEach(([pos, count]) => {
                const posPlayers = sorted.filter(p => p.position === pos);
                for (let i = 0; i < count && i < posPlayers.length; i++) {
                    newLineup.push(posPlayers[i].id);
                }
            });
            return { ...state, selectedLineup: newLineup };
        }

        // ─── BET SLIP ───
        case 'ADD_TO_SLIP': {
            const exists = state.betSlip.find(b => b.matchId === action.payload.matchId);
            if (exists) {
                return { ...state, betSlip: state.betSlip.map(b =>
                    b.matchId === action.payload.matchId ? { ...action.payload, amount: b.amount || 0.01 } : b
                )};
            }
            return { ...state, betSlip: [...state.betSlip, { ...action.payload, amount: 0.01 }] };
        }
        case 'REMOVE_FROM_SLIP':
            return { ...state, betSlip: state.betSlip.filter(b => b.matchId !== action.payload) };
        case 'UPDATE_SLIP_AMOUNT':
            return { ...state, betSlip: state.betSlip.map(b =>
                b.matchId === action.payload.matchId ? { ...b, amount: action.payload.amount } : b
            )};
        case 'CLEAR_SLIP':
            return { ...state, betSlip: [] };
        case 'CONFIRM_WEB3_SLIP': {
            const { txHash, totalCost } = action.payload;
            const newBets = state.betSlip.map(b => ({
                id: `${b.matchId}-${b.selection}-${Date.now()}-${Math.random()}`,
                marketId: b.matchId,
                selection: b.selection,
                amount: b.amount || 0.01,
                odds: b.odds,
                round: state.round - 1,
                resolved: false,
                txHash
            }));
            return {
                ...state,
                activeBets: [...state.activeBets, ...newBets],
                betSlip: [],
                toasts: [...state.toasts, { id: Date.now(), message: `Bets placed! ${totalCost.toFixed(2)} OKB wagered.`, type: 'success' }]
            };
        }

        case 'PROCESS_PENDING_PAYOUT':
            return { ...state, pendingPayout: action.payload };
        case 'CLEAR_PENDING_PAYOUT':
            return { ...state, pendingPayout: null };

        // ─── MATCHDAY LIVE SIMULATION ───
        case 'START_LIVE_SIM': {
            if (state.selectedLineup.length < 11) return state;
            const currentRoundIdx = state.round - 1;
            const roundFixtures = state.fixtures[currentRoundIdx];
            const newTeams = JSON.parse(JSON.stringify(state.teams));
            
            // Pre-calculate the entire round
            const { allResults, playerMatchResult, globalTimeline, matchIncome } = generateRoundTimeline(
                roundFixtures, newTeams, state.playerTeamIndex, state.selectedLineup
            );

            // Init scores object (everyone starts at 0-0)
            const initialScores = {};
            roundFixtures.forEach(f => {
                initialScores[`${f.home}-${f.away}`] = { home: 0, away: 0 };
            });

            return {
                ...state,
                liveSim: {
                    active: true,
                    minute: 0,
                    scores: initialScores,
                    playerMatchEvents: [],
                    timeline: globalTimeline,
                    allResults,
                    playerMatchResult,
                    matchIncome,
                    halfTimePause: false
                }
            };
        }

        case 'TICK_SIM': {
            if (!state.liveSim.active) return state;
            const sim = { ...state.liveSim };
            
            if (sim.halfTimePause) {
                // We handle the unpause via another action or just rely on the component dispatching TICK without pause
                sim.halfTimePause = false;
                return { ...state, liveSim: sim };
            }

            sim.minute += 1;

            if (sim.minute === 45) {
                sim.halfTimePause = true;
            }

            // Process events for this minute
            const eventsThisMinute = sim.timeline.filter(e => e.minute === sim.minute);
            
            eventsThisMinute.forEach(event => {
                if (event.type === 'goal') {
                    if (event.side === 'home') sim.scores[event.matchId].home += 1;
                    if (event.side === 'away') sim.scores[event.matchId].away += 1;
                }
                
                // Add to player's live commentary if it's their match
                if (sim.playerMatchResult && event.matchId === `${sim.playerMatchResult.fixture.home}-${sim.playerMatchResult.fixture.away}`) {
                    sim.playerMatchEvents = [{ ...event, key: Date.now() + Math.random() }, ...sim.playerMatchEvents];
                }
            });

            return { ...state, liveSim: sim };
        }

        case 'SKIP_SIM': {
            if (!state.liveSim.active) return state;
            // Instantly process all remaining events
            const sim = { ...state.liveSim };
            const remainingEvents = sim.timeline.filter(e => e.minute > sim.minute);
            
            remainingEvents.forEach(event => {
                if (event.type === 'goal') {
                    if (event.side === 'home') sim.scores[event.matchId].home += 1;
                    if (event.side === 'away') sim.scores[event.matchId].away += 1;
                }
                if (sim.playerMatchResult && event.matchId === `${sim.playerMatchResult.fixture.home}-${sim.playerMatchResult.fixture.away}`) {
                    sim.playerMatchEvents = [{ ...event, key: Date.now() + Math.random() }, ...sim.playerMatchEvents];
                }
            });
            sim.minute = 90;
            return { ...state, liveSim: sim };
        }

        case 'END_SIM': {
            if (!state.liveSim.active) return state;
            
            const currentRoundIdx = state.round - 1;
            const newTeams = JSON.parse(JSON.stringify(state.teams));
            const { allResults, playerMatchResult, matchIncome } = state.liveSim;
            const roundFixtures = state.fixtures[currentRoundIdx];

            // 1. Apply results to teams
            allResults.forEach(({ homeTeam, awayTeam, result, fixture }) => {
                const h = newTeams.find(t => t.id === homeTeam.id);
                const a = newTeams.find(t => t.id === awayTeam.id);
                
                h.stats.played++; a.stats.played++;
                h.stats.goalsFor += result.homeGoals; h.stats.goalsAgainst += result.awayGoals;
                a.stats.goalsFor += result.awayGoals; a.stats.goalsAgainst += result.homeGoals;

                if (result.homeGoals > result.awayGoals) {
                    h.stats.won++; h.stats.points += 3; a.stats.lost++;
                } else if (result.homeGoals < result.awayGoals) {
                    a.stats.won++; a.stats.points += 3; h.stats.lost++;
                } else {
                    h.stats.drawn++; a.stats.drawn++;
                    h.stats.points++; a.stats.points++;
                }
                
                // Update fixture
                const fix = roundFixtures.find(f => f.home === fixture.home && f.away === fixture.away);
                fix.homeGoals = result.homeGoals;
                fix.awayGoals = result.awayGoals;
                fix.played = true;
            });

            // 2. Resolve bets
            let roundWinnings = 0;
            let newOracleStreak = state.oracleStreak;
            const newToasts = [];

            const newActiveBets = state.activeBets.map(bet => {
                if (bet.round === currentRoundIdx && !bet.resolved) {
                    const market = state.markets.find(m => m.id === bet.marketId);
                    if (market) {
                        const fix = roundFixtures.find(f => f.home === market.homeIdx && f.away === market.awayIdx);
                        if (fix) {
                            let won;
                            if (bet.selection) {
                                const actualResult = fix.homeGoals > fix.awayGoals ? '1' : fix.homeGoals < fix.awayGoals ? '2' : 'X';
                                won = bet.selection === actualResult;
                            } else {
                                const homeWin = fix.homeGoals > fix.awayGoals;
                                won = bet.isYes === homeWin;
                            }
                            if (won) {
                                const payout = bet.amount * 2;
                                roundWinnings += payout;
                                newOracleStreak++;
                                newToasts.push({ id: Date.now() + Math.floor(Math.random() * 1000), message: `🎯 Won ${payout.toFixed(2)} OKB!`, type: 'success' });
                            } else {
                                newOracleStreak = 0;
                                newToasts.push({ id: Date.now() + Math.floor(Math.random() * 1000), message: `❌ Lost ${bet.amount.toFixed(2)} OKB`, type: 'error' });
                            }
                            return { ...bet, resolved: true, won };
                        }
                    }
                }
                return bet;
            });

            const newBudget = state.budget; // Legacy budget no longer used for bets

            // 3. NFT Triggers
            let newWinStreak = state.winStreak;
            const newPendingMints = [...state.pendingMints];

            if (playerMatchResult) {
                const isWin = playerMatchResult.homeIsPlayer
                    ? playerMatchResult.result.homeGoals > playerMatchResult.result.awayGoals
                    : playerMatchResult.result.awayGoals > playerMatchResult.result.homeGoals;
                if (isWin) {
                    newWinStreak++;
                    if (!state.nftBadges.some(b => b.type === 0)) {
                        newPendingMints.push({ type: 0, info: `First Win vs ${playerMatchResult.homeIsPlayer ? playerMatchResult.awayTeam.name : playerMatchResult.homeTeam.name}` });
                    }
                    if (newWinStreak === 5 && !state.nftBadges.some(b => b.type === 1)) {
                        newPendingMints.push({ type: 1, info: "5 Match Win Streak" });
                    }
                    if (newWinStreak === 10 && !state.nftBadges.some(b => b.type === 4)) {
                        newPendingMints.push({ type: 4, info: "10 Matches Unbeaten" });
                    }
                } else {
                    const isDraw = playerMatchResult.result.homeGoals === playerMatchResult.result.awayGoals;
                    if (!isDraw) newWinStreak = 0;
                }
            }

            if (newOracleStreak >= 3 && !state.nftBadges.some(b => b.type === 2)) {
                newPendingMints.push({ type: 2, info: "3 Correct Predictions" });
                newOracleStreak = 0;
            }

            const sortedTeams = [...newTeams].sort((a, b) => b.stats.points - a.stats.points);
            if (sortedTeams[0].id === state.playerTeamIndex && state.round >= 5 && !state.nftBadges.some(b => b.type === 5)) {
                newPendingMints.push({ type: 5, info: "Reached #1 in the League" });
            }

            if (state.round >= 20 && !state.nftBadges.some(b => b.type === 6)) {
                newPendingMints.push({ type: 6, info: "Completed 20 Matchdays" });
            }

            // 4. Player energy
            const playerTeam = newTeams[state.playerTeamIndex];
            playerTeam.players.forEach(p => {
                if (state.selectedLineup.includes(p.id)) {
                    p.energy = Math.max(20, p.energy - (10 + Math.floor(Math.random() * 10)));
                } else {
                    p.energy = Math.min(100, p.energy + 25);
                }
            });

            return {
                ...state,
                teams: newTeams,
                budget: newBudget,
                activeBets: newActiveBets,
                winStreak: newWinStreak,
                oracleStreak: newOracleStreak,
                pendingMints: newPendingMints,
                pendingPayout: roundWinnings > 0 ? roundWinnings : null,
                showMatchModal: true, // Now used to show PostMatchStandings
                liveSim: { ...state.liveSim, active: false }, // Reset liveSim
                lastMatchResult: { playerMatch: playerMatchResult, allResults },
                toasts: [...state.toasts, ...newToasts]
            };
        }

        case 'CLOSE_MATCH_MODAL': {
            const nextRound = state.round + 1;
            const isSeasonOver = nextRound > state.fixtures.length;
            let newMarkets = [];
            if (!isSeasonOver) {
                newMarkets = generateMarkets(state.fixtures[nextRound - 1], state.playerTeamIndex, nextRound - 1, state.teams);
            }
            return {
                ...state,
                showMatchModal: false,
                round: nextRound,
                markets: isSeasonOver ? [] : newMarkets,
                showSeasonEnd: isSeasonOver
            };
        }

        case 'DISMISS_MINT':
            return {
                ...state,
                pendingMints: state.pendingMints.filter((_, i) => i !== 0),
                nftBadges: [...state.nftBadges, action.payload],
                toasts: [...state.toasts, { id: Date.now(), message: 'Badge Collected!', type: 'success' }]
            };

        case 'PK_GAME_END': {
            const { won, score } = action.payload;
            const stats = { ...state.pkShooterStats };
            stats.totalPlayed++;
            stats.totalGoals += score;
            if (score > stats.bestScore) stats.bestScore = score;
            
            const newPendingMints = [...state.pendingMints];
            if (won) {
                stats.totalWins++;
                stats.winStreak++;
                if (stats.totalWins === 1 && !state.nftBadges.some(b => b.type === 8)) {
                    newPendingMints.push({ type: 8, info: "First PK Shootout Win" });
                } else if (stats.totalWins === 5 && !state.nftBadges.some(b => b.type === 9)) {
                    newPendingMints.push({ type: 9, info: "5 PK Shootout Wins" });
                } else if (stats.totalWins === 10 && !state.nftBadges.some(b => b.type === 10)) {
                    newPendingMints.push({ type: 10, info: "10 PK Shootout Wins" });
                }
            } else {
                stats.winStreak = 0;
            }

            return {
                ...state,
                pkShooterStats: stats,
                pendingMints: newPendingMints,
                toasts: [...state.toasts, { id: Date.now(), message: won ? `Shootout Won! (${score}/5)` : `Shootout Lost. (${score}/5)`, type: won ? 'success' : 'error' }]
            };
        }

        // ─── TOASTS ───
        case 'DISMISS_TOAST':
            return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };
        case 'ADD_TOAST':
            return { ...state, toasts: [...state.toasts, { id: Date.now(), ...action.payload }] };

        // ─── FANTASY ───
        case 'FANTASY_ADD_PLAYER': {
            if (state.fantasy.squad.length >= 6) return state;
            const cost = action.payload.value;
            if (state.fantasy.budget < cost) return state;
            return {
                ...state,
                fantasy: {
                    ...state.fantasy,
                    squad: [...state.fantasy.squad, action.payload],
                    budget: state.fantasy.budget - cost
                }
            };
        }
        case 'FANTASY_REMOVE_PLAYER': {
            const player = state.fantasy.squad.find(p => p.id === action.payload);
            if (!player) return state;
            return {
                ...state,
                fantasy: {
                    ...state.fantasy,
                    squad: state.fantasy.squad.filter(p => p.id !== action.payload),
                    budget: state.fantasy.budget + player.value
                }
            };
        }
        case 'FANTASY_SET_SQUAD': {
            const cost = action.payload.reduce((sum, p) => sum + p.value, 0);
            return {
                ...state,
                fantasy: {
                    ...state.fantasy,
                    squad: action.payload,
                    budget: 100 - cost
                }
            };
        }
        case 'FANTASY_SET_POINTS':
            return {
                ...state,
                fantasy: { ...state.fantasy, totalPoints: action.payload }
            };

        default:
            return state;
    }
}

export function GameProvider({ children }) {
    const [state, dispatch] = useReducer(gameReducer, initialGameState);
    
    useEffect(() => { dispatch({ type: 'INIT_GAME' }); }, []);

    // The Tick Loop for Live Simulation
    useEffect(() => {
        if (!state.liveSim.active) return;

        // If we reached minute 90, end the sim after a short pause
        if (state.liveSim.minute >= 90) {
            const timer = setTimeout(() => {
                dispatch({ type: 'END_SIM' });
            }, 1500);
            return () => clearTimeout(timer);
        }

        // If half time, pause for 3 seconds
        if (state.liveSim.halfTimePause) {
            const timer = setTimeout(() => {
                dispatch({ type: 'TICK_SIM' }); // This tick will unpause
            }, 3000);
            return () => clearTimeout(timer);
        }

        // Tick every 666ms (90 minutes in ~60 seconds)
        const timer = setTimeout(() => {
            dispatch({ type: 'TICK_SIM' });
        }, 666);

        return () => clearTimeout(timer);
    }, [state.liveSim.active, state.liveSim.minute, state.liveSim.halfTimePause]);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
            <PayoutProcessor state={state} dispatch={dispatch} />
        </GameContext.Provider>
    );
}

// A hidden component to process backend payouts natively without breaking the pure reducer logic
function PayoutProcessor({ state, dispatch }) {
    const { pendingPayout } = state;
    
    useEffect(() => {
        if (pendingPayout > 0) {
            const processPayout = async () => {
                try {
                    // Assuming wallet context is somewhat available or we grab it globally
                    // To avoid hook issues, we can just fetch the userAddress if we have it in state
                    // Wait, GameContext doesn't track userAddress. Let's get it from window.ethereum
                    let userAddress = null;
                    if (window.ethereum) {
                        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                        userAddress = accounts[0];
                    }
                    
                    if (userAddress) {
                        const res = await fetch('/api/local-payout', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ userAddress, payoutAmount: pendingPayout })
                        });
                        const data = await res.json();
                        if (data.success) {
                            dispatch({ type: 'ADD_TOAST', payload: { message: `Payout of ${pendingPayout.toFixed(2)} OKB sent!`, type: 'success' } });
                        }
                    }
                } catch (e) {
                    console.error("Payout error", e);
                } finally {
                    dispatch({ type: 'CLEAR_PENDING_PAYOUT' });
                }
            };
            processPayout();
        }
    }, [pendingPayout, dispatch]);

    return null;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
    return useContext(GameContext);
}
