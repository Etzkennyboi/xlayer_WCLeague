export function generateFixtures(teams) {
    const numTeams = teams.length;
    const rounds = numTeams - 1;
    const halfSize = numTeams / 2;
    
    let fixtures = [];
    let indices = teams.map(t => t.id);
    
    for (let round = 0; round < rounds; round++) {
        const roundFixtures = [];
        for (let i = 0; i < halfSize; i++) {
            const home = indices[i];
            const away = indices[numTeams - 1 - i];
            if (round % 2 === 0) {
                roundFixtures.push({ home, away, homeGoals: null, awayGoals: null, played: false });
            } else {
                roundFixtures.push({ home: away, away: home, homeGoals: null, awayGoals: null, played: false });
            }
        }
        fixtures.push(roundFixtures);
        indices.splice(1, 0, indices.pop());
    }
    
    return fixtures;
}

export function calculateTeamStrength(team, selectedLineup = null) {
    let players;
    if (selectedLineup && selectedLineup.length > 0) {
        players = team.players.filter(p => selectedLineup.includes(p.id));
    } else {
        players = [...team.players].sort((a, b) => b.strength - a.strength).slice(0, 11);
    }
    
    // Check tactical balance
    const posCounts = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
    players.forEach(p => {
        if (p.position) posCounts[p.position]++;
    });

    // Valid formation requires 1 GK, at least 3 DEFs, 3 MIDs, 1 FWD
    const isBalanced = posCounts.GK === 1 && posCounts.DEF >= 3 && posCounts.MID >= 3 && posCounts.FWD >= 1;
    const tacticalMultiplier = isBalanced ? 1.05 : 0.75; // 25% penalty for unbalanced/invalid formations
    
    while (players.length < 11) {
        const avgStrength = players.reduce((sum, p) => sum + p.strength, 0) / players.length || 30;
        players.push({ strength: avgStrength * 0.5, energy: 50, condition: 50 });
    }
    
    const totalStrength = players.reduce((sum, p) => {
        let energyFactor = 0.5 + (p.energy / 100) * 0.5;
        if (p.energy < 40) energyFactor *= 0.5; // Severe penalty for exhausted players
        const conditionFactor = 0.8 + (p.condition / 100) * 0.2;
        return sum + (p.strength * energyFactor * conditionFactor);
    }, 0);
    
    return (totalStrength / 11) * tacticalMultiplier;
}

const GOAL_DESCRIPTIONS = [
    'brilliant strike', 'tap-in from close range', 'header from corner',
    'counter attack', 'penalty kick', 'long-range screamer', 'free kick',
    'solo run', 'clinical finish', 'volley from the edge of the box'
];

const FLUFF_EVENTS = [
    { type: 'chance', desc: 'shots wide from a good position' },
    { type: 'chance', desc: 'forces a great save from the keeper' },
    { type: 'chance', desc: 'hits the woodwork!' },
    { type: 'foul', desc: 'commits a clumsy foul' },
    { type: 'corner', desc: 'wins a corner kick' },
    { type: 'var', desc: 'VAR check for a penalty... no penalty given' }
];

// Poisson distribution random number generator
function poissonRandom(lambda) {
    let L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
        k++;
        p *= Math.random();
    } while (p > L);
    return k - 1;
}

export function simulateMatch(homeTeam, awayTeam, homeIsPlayer, awayIsPlayer, selectedLineup) {
    const homeStrength = calculateTeamStrength(homeTeam, homeIsPlayer ? selectedLineup : null);
    const awayStrength = calculateTeamStrength(awayTeam, awayIsPlayer ? selectedLineup : null);
    
    // Calculate Strength Differential
    // 1.0 means teams are perfectly equal. 1.2 means Home is 20% stronger.
    const homeAdvantage = 1.05; // Base home field advantage
    const strengthRatio = (homeStrength * homeAdvantage) / awayStrength;
    
    // Base Expected Goals (xG) for an average match is around 1.4 for Home, 1.1 for Away
    let homeXG = 1.4 * strengthRatio;
    let awayXG = 1.1 / strengthRatio;

    // Small chance for a "Blowout/Crazy Match" modifier (as requested by user)
    if (Math.random() < 0.05) {
        // 5% chance the stronger team just goes absolutely wild
        if (homeXG > awayXG) homeXG += 1.5 + Math.random() * 2;
        else awayXG += 1.5 + Math.random() * 2;
    }

    // Cap extreme outliers
    homeXG = Math.max(0.1, Math.min(homeXG, 5.0));
    awayXG = Math.max(0.1, Math.min(awayXG, 5.0));

    // Generate actual goals using Poisson Distribution
    let homeGoals = poissonRandom(homeXG);
    let awayGoals = poissonRandom(awayXG);

    // Generate match events timeline
    const events = [];
    const getPlayer = (team, isGoal = false) => {
        const candidates = isGoal 
            ? team.players.filter(p => p.position === 'FWD' || p.position === 'MID')
            : team.players;
        return candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)].name : 'Unknown';
    };

    // Helper to generate unique minute (avoid overlapping too many events in same minute)
    const usedMinutes = new Set();
    const getMinute = () => {
        let m;
        do { m = Math.floor(Math.random() * 90) + 1; } while (usedMinutes.has(m) && usedMinutes.size < 90);
        usedMinutes.add(m);
        return m;
    };

    // Goals
    for (let i = 0; i < homeGoals; i++) {
        events.push({ minute: getMinute(), type: 'goal', side: 'home', player: getPlayer(homeTeam, true), desc: GOAL_DESCRIPTIONS[Math.floor(Math.random() * GOAL_DESCRIPTIONS.length)] });
    }
    for (let i = 0; i < awayGoals; i++) {
        events.push({ minute: getMinute(), type: 'goal', side: 'away', player: getPlayer(awayTeam, true), desc: GOAL_DESCRIPTIONS[Math.floor(Math.random() * GOAL_DESCRIPTIONS.length)] });
    }

    // Cards
    const numCards = Math.floor(Math.random() * 4);
    for (let i = 0; i < numCards; i++) {
        const side = Math.random() > 0.5 ? 'home' : 'away';
        events.push({ minute: getMinute(), type: 'yellow', side, player: getPlayer(side === 'home' ? homeTeam : awayTeam), desc: 'tactical foul' });
    }

    // Fluff Events (to make commentary lively)
    const numFluff = Math.floor(Math.random() * 6) + 3; // 3-8 fluff events
    for (let i = 0; i < numFluff; i++) {
        const side = Math.random() > 0.5 ? 'home' : 'away';
        const f = FLUFF_EVENTS[Math.floor(Math.random() * FLUFF_EVENTS.length)];
        events.push({ minute: getMinute(), type: f.type, side, player: getPlayer(side === 'home' ? homeTeam : awayTeam), desc: f.desc });
    }

    // Sort events chronologically
    events.sort((a, b) => a.minute - b.minute);
    
    return { homeGoals, awayGoals, events };
}

// Generates a combined timeline for the entire round
export function generateRoundTimeline(fixtures, newTeams, playerTeamIndex, selectedLineup) {
    let globalTimeline = [];
    let playerMatchResult = null;
    let matchIncome = 0;

    const allResults = fixtures.map(fixture => {
        const homeTeam = newTeams[fixture.home];
        const awayTeam = newTeams[fixture.away];
        const homeIsPlayer = fixture.home === playerTeamIndex;
        const awayIsPlayer = fixture.away === playerTeamIndex;
        const result = simulateMatch(homeTeam, awayTeam, homeIsPlayer, awayIsPlayer, selectedLineup);

        // Map events to include match identifier
        const matchId = `${fixture.home}-${fixture.away}`;
        const matchEvents = result.events.map(e => ({ ...e, matchId, homeId: fixture.home, awayId: fixture.away }));
        globalTimeline = globalTimeline.concat(matchEvents);

        fixture.homeGoals = result.homeGoals;
        fixture.awayGoals = result.awayGoals;
        fixture.events = result.events;
        fixture.played = true;

        if (homeIsPlayer || awayIsPlayer) {
            playerMatchResult = { fixture, homeTeam, awayTeam, result, homeIsPlayer };
            matchIncome = homeIsPlayer ? 1200000 : 400000;
        }
        return { homeTeam, awayTeam, result, fixture, matchId };
    });

    globalTimeline.sort((a, b) => a.minute - b.minute);

    return { allResults, playerMatchResult, globalTimeline, matchIncome };
}
