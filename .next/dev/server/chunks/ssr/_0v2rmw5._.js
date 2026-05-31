module.exports = [
"[project]/src/engine/GameState.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ==================== COMPLETE GAME STATE ====================
__turbopack_context__.s([
    "initialGameState",
    ()=>initialGameState
]);
const initialGameState = {
    // Game flow
    gameStarted: false,
    season: 1,
    round: 1,
    // Onboarding
    onboardingStep: 0,
    selectedContinent: null,
    username: '',
    // Manager core
    budget: 5000000,
    playerTeamIndex: 0,
    teams: [],
    fixtures: [],
    // Squad management
    selectedLineup: [],
    liveSim: {
        active: false,
        minute: 0,
        scores: {},
        playerMatchEvents: [],
        timeline: [],
        allResults: null,
        playerMatchResult: null,
        matchIncome: 0,
        halfTimePause: false
    },
    trainingQueue: [],
    selectedTrainingType: null,
    // Match state
    showMatchModal: false,
    lastMatchResult: null,
    showSeasonEnd: false,
    seasonEndResult: null,
    // Betting — Bet Slip system
    markets: [],
    betSlip: [],
    activeBets: [],
    lastPredictionResult: null,
    // Web3 state
    wallet: {
        connected: false,
        address: null,
        chainId: null,
        balance: '0'
    },
    web3Bets: [],
    // NFT trophies
    nftBadges: [],
    pendingMints: [],
    // Streaks (for NFT triggers)
    winStreak: 0,
    oracleStreak: 0,
    // PK Shootout stats
    pkShooterStats: {
        totalPlayed: 0,
        totalWins: 0,
        totalGoals: 0,
        bestScore: 0,
        winStreak: 0
    },
    // Notifications / Toasts
    toasts: [],
    // Fantasy League
    fantasy: {
        squad: [],
        budget: 100,
        totalPoints: 0
    }
};
}),
"[project]/src/engine/Data.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ==================== GLOBAL LEAGUE DATA (48 TEAMS) ====================
__turbopack_context__.s([
    "RANDOM_EVENTS",
    ()=>RANDOM_EVENTS,
    "SPONSOR_TYPES",
    ()=>SPONSOR_TYPES,
    "TEAMS",
    ()=>TEAMS,
    "TRAINING_CONFIG",
    ()=>TRAINING_CONFIG,
    "getSponsorTypeName",
    ()=>getSponsorTypeName
]);
const TEAMS = [
    {
        name: "Argentina",
        abbr: "ARG",
        code: "ar",
        continent: "South America"
    },
    {
        name: "France",
        abbr: "FRA",
        code: "fr",
        continent: "Europe"
    },
    {
        name: "England",
        abbr: "ENG",
        code: "gb-eng",
        continent: "Europe"
    },
    {
        name: "Brazil",
        abbr: "BRA",
        code: "br",
        continent: "South America"
    },
    {
        name: "Spain",
        abbr: "ESP",
        code: "es",
        continent: "Europe"
    },
    {
        name: "Portugal",
        abbr: "POR",
        code: "pt",
        continent: "Europe"
    },
    {
        name: "Germany",
        abbr: "GER",
        code: "de",
        continent: "Europe"
    },
    {
        name: "Italy",
        abbr: "ITA",
        code: "it",
        continent: "Europe"
    },
    {
        name: "Netherlands",
        abbr: "NED",
        code: "nl",
        continent: "Europe"
    },
    {
        name: "Croatia",
        abbr: "CRO",
        code: "hr",
        continent: "Europe"
    },
    {
        name: "Uruguay",
        abbr: "URU",
        code: "uy",
        continent: "South America"
    },
    {
        name: "USA",
        abbr: "USA",
        code: "us",
        continent: "North America"
    },
    {
        name: "Colombia",
        abbr: "COL",
        code: "co",
        continent: "South America"
    },
    {
        name: "Belgium",
        abbr: "BEL",
        code: "be",
        continent: "Europe"
    },
    {
        name: "Japan",
        abbr: "JPN",
        code: "jp",
        continent: "Asia"
    },
    {
        name: "Senegal",
        abbr: "SEN",
        code: "sn",
        continent: "Africa"
    },
    {
        name: "Morocco",
        abbr: "MAR",
        code: "ma",
        continent: "Africa"
    },
    {
        name: "South Korea",
        abbr: "KOR",
        code: "kr",
        continent: "Asia"
    },
    {
        name: "Mexico",
        abbr: "MEX",
        code: "mx",
        continent: "North America"
    },
    {
        name: "Canada",
        abbr: "CAN",
        code: "ca",
        continent: "North America"
    },
    {
        name: "Switzerland",
        abbr: "SUI",
        code: "ch",
        continent: "Europe"
    },
    {
        name: "Denmark",
        abbr: "DEN",
        code: "dk",
        continent: "Europe"
    },
    {
        name: "Sweden",
        abbr: "SWE",
        code: "se",
        continent: "Europe"
    },
    {
        name: "Serbia",
        abbr: "SRB",
        code: "rs",
        continent: "Europe"
    },
    {
        name: "Poland",
        abbr: "POL",
        code: "pl",
        continent: "Europe"
    },
    {
        name: "Iran",
        abbr: "IRN",
        code: "ir",
        continent: "Asia"
    },
    {
        name: "Australia",
        abbr: "AUS",
        code: "au",
        continent: "Oceania"
    },
    {
        name: "Egypt",
        abbr: "EGY",
        code: "eg",
        continent: "Africa"
    },
    {
        name: "Nigeria",
        abbr: "NGA",
        code: "ng",
        continent: "Africa"
    },
    {
        name: "Ghana",
        abbr: "GHA",
        code: "gh",
        continent: "Africa"
    },
    {
        name: "Cameroon",
        abbr: "CMR",
        code: "cm",
        continent: "Africa"
    },
    {
        name: "Ivory Coast",
        abbr: "CIV",
        code: "ci",
        continent: "Africa"
    },
    {
        name: "Tunisia",
        abbr: "TUN",
        code: "tn",
        continent: "Africa"
    },
    {
        name: "Saudi Arabia",
        abbr: "KSA",
        code: "sa",
        continent: "Asia"
    },
    {
        name: "Qatar",
        abbr: "QAT",
        code: "qa",
        continent: "Asia"
    },
    {
        name: "UAE",
        abbr: "UAE",
        code: "ae",
        continent: "Asia"
    },
    {
        name: "China",
        abbr: "CHN",
        code: "cn",
        continent: "Asia"
    },
    {
        name: "India",
        abbr: "IND",
        code: "in",
        continent: "Asia"
    },
    {
        name: "Peru",
        abbr: "PER",
        code: "pe",
        continent: "South America"
    },
    {
        name: "Chile",
        abbr: "CHI",
        code: "cl",
        continent: "South America"
    },
    {
        name: "Ecuador",
        abbr: "ECU",
        code: "ec",
        continent: "South America"
    },
    {
        name: "Venezuela",
        abbr: "VEN",
        code: "ve",
        continent: "South America"
    },
    {
        name: "Paraguay",
        abbr: "PAR",
        code: "py",
        continent: "South America"
    },
    {
        name: "Bolivia",
        abbr: "BOL",
        code: "bo",
        continent: "South America"
    },
    {
        name: "New Zealand",
        abbr: "NZL",
        code: "nz",
        continent: "Oceania"
    },
    {
        name: "Costa Rica",
        abbr: "CRC",
        code: "cr",
        continent: "North America"
    },
    {
        name: "Panama",
        abbr: "PAN",
        code: "pa",
        continent: "North America"
    },
    {
        name: "Jamaica",
        abbr: "JAM",
        code: "jm",
        continent: "North America"
    }
];
const SPONSOR_TYPES = [
    'shirt',
    'stadium',
    'tv',
    'digital'
];
function getSponsorTypeName(type) {
    const names = {
        'shirt': '👕 Shirt Sponsor',
        'stadium': '🏟️ Stadium Rights',
        'tv': '📺 Broadcasting Rights',
        'digital': '📱 Digital Partnership'
    };
    return names[type] || type;
}
const RANDOM_EVENTS = [
    {
        title: "Training Ground Upgrade",
        message: "Local council funded new facilities. Morale up!",
        effect: {
            conditionAll: 15
        },
        type: "positive"
    },
    {
        title: "Viral Sensation",
        message: "Team video went viral. Merchandise sales spiked!",
        effect: {
            budget: 250000
        },
        type: "positive"
    },
    {
        title: "Food Poisoning",
        message: "Bad lasagna at the team hotel. Energy levels drop.",
        effect: {
            energyAll: -20
        },
        type: "negative"
    },
    {
        title: "Tax Audit",
        message: "Unexpected tax bill from the federation.",
        effect: {
            budget: -150000
        },
        type: "negative"
    }
];
const TRAINING_CONFIG = {
    'physical': {
        cost: 50000,
        strengthGain: 1,
        energyCost: 20
    },
    'tactical': {
        cost: 75000,
        strengthGain: 2,
        energyCost: 15
    },
    'intensive': {
        cost: 120000,
        strengthGain: 3,
        energyCost: 35
    }
};
}),
"[project]/src/engine/Players.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculatePlayerValue",
    ()=>calculatePlayerValue,
    "generatePlayer",
    ()=>generatePlayer,
    "generatePlayerId",
    ()=>generatePlayerId,
    "generateSquad",
    ()=>generateSquad,
    "generateTeams",
    ()=>generateTeams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$engine$2f$Data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/engine/Data.js [app-ssr] (ecmascript)");
;
// Hardcoded real squads for the top teams
const REAL_SQUADS = {
    "Argentina": [
        {
            name: "E. Martinez",
            pos: "GK",
            str: 88,
            age: 31
        },
        {
            name: "G. Rulli",
            pos: "GK",
            str: 82,
            age: 31
        },
        {
            name: "C. Romero",
            pos: "DEF",
            str: 87,
            age: 26
        },
        {
            name: "L. Martinez",
            pos: "DEF",
            str: 86,
            age: 26
        },
        {
            name: "N. Otamendi",
            pos: "DEF",
            str: 83,
            age: 36
        },
        {
            name: "N. Molina",
            pos: "DEF",
            str: 84,
            age: 26
        },
        {
            name: "M. Acuna",
            pos: "DEF",
            str: 83,
            age: 32
        },
        {
            name: "N. Tagliafico",
            pos: "DEF",
            str: 82,
            age: 31
        },
        {
            name: "E. Fernandez",
            pos: "MID",
            str: 87,
            age: 23
        },
        {
            name: "A. Mac Allister",
            pos: "MID",
            str: 86,
            age: 25
        },
        {
            name: "R. De Paul",
            pos: "MID",
            str: 85,
            age: 29
        },
        {
            name: "G. Lo Celso",
            pos: "MID",
            str: 83,
            age: 28
        },
        {
            name: "L. Paredes",
            pos: "MID",
            str: 82,
            age: 29
        },
        {
            name: "L. Messi",
            pos: "FWD",
            str: 94,
            age: 36
        },
        {
            name: "L. Martinez",
            pos: "FWD",
            str: 88,
            age: 26
        },
        {
            name: "J. Alvarez",
            pos: "FWD",
            str: 87,
            age: 24
        },
        {
            name: "A. Di Maria",
            pos: "FWD",
            str: 84,
            age: 36
        },
        {
            name: "A. Garnacho",
            pos: "FWD",
            str: 83,
            age: 19
        }
    ],
    "France": [
        {
            name: "M. Maignan",
            pos: "GK",
            str: 88,
            age: 28
        },
        {
            name: "B. Pavard",
            pos: "DEF",
            str: 85,
            age: 28
        },
        {
            name: "D. Upamecano",
            pos: "DEF",
            str: 86,
            age: 25
        },
        {
            name: "W. Saliba",
            pos: "DEF",
            str: 87,
            age: 23
        },
        {
            name: "T. Hernandez",
            pos: "DEF",
            str: 86,
            age: 26
        },
        {
            name: "J. Kounde",
            pos: "DEF",
            str: 85,
            age: 25
        },
        {
            name: "A. Tchouameni",
            pos: "MID",
            str: 87,
            age: 24
        },
        {
            name: "E. Camavinga",
            pos: "MID",
            str: 86,
            age: 21
        },
        {
            name: "A. Rabiot",
            pos: "MID",
            str: 84,
            age: 29
        },
        {
            name: "A. Griezmann",
            pos: "MID",
            str: 88,
            age: 33
        },
        {
            name: "K. Mbappe",
            pos: "FWD",
            str: 95,
            age: 25
        },
        {
            name: "O. Dembele",
            pos: "FWD",
            str: 86,
            age: 27
        },
        {
            name: "O. Giroud",
            pos: "FWD",
            str: 83,
            age: 37
        },
        {
            name: "M. Thuram",
            pos: "FWD",
            str: 84,
            age: 26
        }
    ],
    "England": [
        {
            name: "J. Pickford",
            pos: "GK",
            str: 84,
            age: 30
        },
        {
            name: "K. Walker",
            pos: "DEF",
            str: 86,
            age: 34
        },
        {
            name: "J. Stones",
            pos: "DEF",
            str: 87,
            age: 30
        },
        {
            name: "H. Maguire",
            pos: "DEF",
            str: 83,
            age: 31
        },
        {
            name: "L. Shaw",
            pos: "DEF",
            str: 84,
            age: 28
        },
        {
            name: "D. Rice",
            pos: "MID",
            str: 88,
            age: 25
        },
        {
            name: "J. Bellingham",
            pos: "MID",
            str: 92,
            age: 20
        },
        {
            name: "P. Foden",
            pos: "MID",
            str: 89,
            age: 24
        },
        {
            name: "T. Alexander-Arnold",
            pos: "MID",
            str: 86,
            age: 25
        },
        {
            name: "B. Saka",
            pos: "FWD",
            str: 89,
            age: 22
        },
        {
            name: "H. Kane",
            pos: "FWD",
            str: 91,
            age: 30
        },
        {
            name: "O. Watkins",
            pos: "FWD",
            str: 85,
            age: 28
        }
    ],
    "Brazil": [
        {
            name: "Alisson",
            pos: "GK",
            str: 89,
            age: 31
        },
        {
            name: "Ederson",
            pos: "GK",
            str: 88,
            age: 30
        },
        {
            name: "Marquinhos",
            pos: "DEF",
            str: 87,
            age: 30
        },
        {
            name: "Eder Militao",
            pos: "DEF",
            str: 86,
            age: 26
        },
        {
            name: "Gabriel",
            pos: "DEF",
            str: 85,
            age: 26
        },
        {
            name: "Danilo",
            pos: "DEF",
            str: 83,
            age: 32
        },
        {
            name: "Casemiro",
            pos: "MID",
            str: 86,
            age: 32
        },
        {
            name: "B. Guimaraes",
            pos: "MID",
            str: 87,
            age: 26
        },
        {
            name: "L. Paqueta",
            pos: "MID",
            str: 85,
            age: 26
        },
        {
            name: "Vinicius Jr",
            pos: "FWD",
            str: 92,
            age: 23
        },
        {
            name: "Rodrygo",
            pos: "FWD",
            str: 88,
            age: 23
        },
        {
            name: "Raphinha",
            pos: "FWD",
            str: 85,
            age: 27
        },
        {
            name: "Endrick",
            pos: "FWD",
            str: 82,
            age: 17
        }
    ]
};
const FIRST_NAMES = [
    "Alex",
    "Ben",
    "Carlos",
    "David",
    "Enzo",
    "Felix",
    "Gabriel",
    "Hugo",
    "Ivan",
    "Jack",
    "Kevin",
    "Leo",
    "Max",
    "Nico",
    "Oscar",
    "Pablo",
    "Quinn",
    "Ryan",
    "Sam",
    "Tom",
    "Victor",
    "Will",
    "Xavi",
    "Yuri",
    "Zack"
];
const LAST_NAMES = [
    "Smith",
    "Jones",
    "Williams",
    "Brown",
    "Taylor",
    "Silva",
    "Garcia",
    "Martinez",
    "Rossi",
    "Muller",
    "Dubois",
    "Santos",
    "Kim",
    "Lee",
    "Chen",
    "Wang",
    "Singh",
    "Ali",
    "Ivanov",
    "Novak",
    "Costa",
    "Gomez",
    "Kowalski",
    "Okafor",
    "Mensah"
];
function generatePlayerId() {
    return Math.random().toString(36).substr(2, 9);
}
function calculatePlayerValue(player) {
    let baseValue = Math.pow(player.strength, 3) * 10;
    if (player.age < 23) baseValue *= 1.5;
    else if (player.age > 30) baseValue *= 0.6;
    return Math.floor(baseValue);
}
function generatePlayer(pos, tier) {
    const fn = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const ln = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const minStr = tier === 1 ? 80 : tier === 2 ? 75 : 70;
    const maxStr = tier === 1 ? 92 : tier === 2 ? 85 : 80;
    const strength = Math.floor(Math.random() * (maxStr - minStr + 1)) + minStr;
    const age = 17 + Math.floor(Math.random() * 18);
    const player = {
        id: generatePlayerId(),
        name: `${fn[0]}. ${ln}`,
        position: pos,
        age: age,
        strength: strength,
        energy: 100,
        condition: 100,
        inTraining: false
    };
    player.value = calculatePlayerValue(player);
    return player;
}
function generateSquad(teamName, tier) {
    const squad = [];
    if (REAL_SQUADS[teamName]) {
        const realPlayers = REAL_SQUADS[teamName];
        realPlayers.forEach((rp)=>{
            const player = {
                id: generatePlayerId(),
                name: rp.name,
                position: rp.pos,
                age: rp.age,
                strength: rp.str,
                energy: 100,
                condition: 100,
                inTraining: false
            };
            player.value = calculatePlayerValue(player);
            squad.push(player);
        });
    }
    const currentCounts = {
        GK: 0,
        DEF: 0,
        MID: 0,
        FWD: 0
    };
    squad.forEach((p)=>currentCounts[p.position]++);
    const needed = {
        GK: 2,
        DEF: 6,
        MID: 6,
        FWD: 6
    };
    Object.keys(needed).forEach((pos)=>{
        while(currentCounts[pos] < needed[pos]){
            squad.push(generatePlayer(pos, tier));
            currentCounts[pos]++;
        }
    });
    return squad;
}
function generateTeams() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$engine$2f$Data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TEAMS"].map((team, index)=>{
        let tier = 3;
        if (index < 5) tier = 1;
        else if (index < 15) tier = 2;
        return {
            id: index,
            name: team.name,
            abbr: team.abbr,
            code: team.code,
            continent: team.continent,
            players: generateSquad(team.name, tier),
            stats: {
                played: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                points: 0
            }
        };
    });
}
}),
"[project]/src/engine/MatchSim.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateTeamStrength",
    ()=>calculateTeamStrength,
    "generateFixtures",
    ()=>generateFixtures,
    "generateRoundTimeline",
    ()=>generateRoundTimeline,
    "simulateMatch",
    ()=>simulateMatch
]);
function generateFixtures(teams) {
    const numTeams = teams.length;
    const rounds = numTeams - 1;
    const halfSize = numTeams / 2;
    let fixtures = [];
    let indices = teams.map((t)=>t.id);
    for(let round = 0; round < rounds; round++){
        const roundFixtures = [];
        for(let i = 0; i < halfSize; i++){
            const home = indices[i];
            const away = indices[numTeams - 1 - i];
            if (round % 2 === 0) {
                roundFixtures.push({
                    home,
                    away,
                    homeGoals: null,
                    awayGoals: null,
                    played: false
                });
            } else {
                roundFixtures.push({
                    home: away,
                    away: home,
                    homeGoals: null,
                    awayGoals: null,
                    played: false
                });
            }
        }
        fixtures.push(roundFixtures);
        indices.splice(1, 0, indices.pop());
    }
    return fixtures;
}
function calculateTeamStrength(team, selectedLineup = null) {
    let players;
    if (selectedLineup && selectedLineup.length > 0) {
        players = team.players.filter((p)=>selectedLineup.includes(p.id));
    } else {
        players = [
            ...team.players
        ].sort((a, b)=>b.strength - a.strength).slice(0, 11);
    }
    // Check tactical balance
    const posCounts = {
        GK: 0,
        DEF: 0,
        MID: 0,
        FWD: 0
    };
    players.forEach((p)=>{
        if (p.position) posCounts[p.position]++;
    });
    // Valid formation requires 1 GK, at least 3 DEFs, 3 MIDs, 1 FWD
    const isBalanced = posCounts.GK === 1 && posCounts.DEF >= 3 && posCounts.MID >= 3 && posCounts.FWD >= 1;
    const tacticalMultiplier = isBalanced ? 1.05 : 0.75; // 25% penalty for unbalanced/invalid formations
    while(players.length < 11){
        const avgStrength = players.reduce((sum, p)=>sum + p.strength, 0) / players.length || 30;
        players.push({
            strength: avgStrength * 0.5,
            energy: 50,
            condition: 50
        });
    }
    const totalStrength = players.reduce((sum, p)=>{
        let energyFactor = 0.5 + p.energy / 100 * 0.5;
        if (p.energy < 40) energyFactor *= 0.5; // Severe penalty for exhausted players
        const conditionFactor = 0.8 + p.condition / 100 * 0.2;
        return sum + p.strength * energyFactor * conditionFactor;
    }, 0);
    return totalStrength / 11 * tacticalMultiplier;
}
const GOAL_DESCRIPTIONS = [
    'brilliant strike',
    'tap-in from close range',
    'header from corner',
    'counter attack',
    'penalty kick',
    'long-range screamer',
    'free kick',
    'solo run',
    'clinical finish',
    'volley from the edge of the box'
];
const FLUFF_EVENTS = [
    {
        type: 'chance',
        desc: 'shots wide from a good position'
    },
    {
        type: 'chance',
        desc: 'forces a great save from the keeper'
    },
    {
        type: 'chance',
        desc: 'hits the woodwork!'
    },
    {
        type: 'foul',
        desc: 'commits a clumsy foul'
    },
    {
        type: 'corner',
        desc: 'wins a corner kick'
    },
    {
        type: 'var',
        desc: 'VAR check for a penalty... no penalty given'
    }
];
// Poisson distribution random number generator
function poissonRandom(lambda) {
    let L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
        k++;
        p *= Math.random();
    }while (p > L)
    return k - 1;
}
function simulateMatch(homeTeam, awayTeam, homeIsPlayer, awayIsPlayer, selectedLineup) {
    const homeStrength = calculateTeamStrength(homeTeam, homeIsPlayer ? selectedLineup : null);
    const awayStrength = calculateTeamStrength(awayTeam, awayIsPlayer ? selectedLineup : null);
    // Calculate Strength Differential
    // 1.0 means teams are perfectly equal. 1.2 means Home is 20% stronger.
    const homeAdvantage = 1.05; // Base home field advantage
    const strengthRatio = homeStrength * homeAdvantage / awayStrength;
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
    const getPlayer = (team, isGoal = false)=>{
        const candidates = isGoal ? team.players.filter((p)=>p.position === 'FWD' || p.position === 'MID') : team.players;
        return candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)].name : 'Unknown';
    };
    // Helper to generate unique minute (avoid overlapping too many events in same minute)
    const usedMinutes = new Set();
    const getMinute = ()=>{
        let m;
        do {
            m = Math.floor(Math.random() * 90) + 1;
        }while (usedMinutes.has(m) && usedMinutes.size < 90)
        usedMinutes.add(m);
        return m;
    };
    // Goals
    for(let i = 0; i < homeGoals; i++){
        events.push({
            minute: getMinute(),
            type: 'goal',
            side: 'home',
            player: getPlayer(homeTeam, true),
            desc: GOAL_DESCRIPTIONS[Math.floor(Math.random() * GOAL_DESCRIPTIONS.length)]
        });
    }
    for(let i = 0; i < awayGoals; i++){
        events.push({
            minute: getMinute(),
            type: 'goal',
            side: 'away',
            player: getPlayer(awayTeam, true),
            desc: GOAL_DESCRIPTIONS[Math.floor(Math.random() * GOAL_DESCRIPTIONS.length)]
        });
    }
    // Cards
    const numCards = Math.floor(Math.random() * 4);
    for(let i = 0; i < numCards; i++){
        const side = Math.random() > 0.5 ? 'home' : 'away';
        events.push({
            minute: getMinute(),
            type: 'yellow',
            side,
            player: getPlayer(side === 'home' ? homeTeam : awayTeam),
            desc: 'tactical foul'
        });
    }
    // Fluff Events (to make commentary lively)
    const numFluff = Math.floor(Math.random() * 6) + 3; // 3-8 fluff events
    for(let i = 0; i < numFluff; i++){
        const side = Math.random() > 0.5 ? 'home' : 'away';
        const f = FLUFF_EVENTS[Math.floor(Math.random() * FLUFF_EVENTS.length)];
        events.push({
            minute: getMinute(),
            type: f.type,
            side,
            player: getPlayer(side === 'home' ? homeTeam : awayTeam),
            desc: f.desc
        });
    }
    // Sort events chronologically
    events.sort((a, b)=>a.minute - b.minute);
    return {
        homeGoals,
        awayGoals,
        events
    };
}
function generateRoundTimeline(fixtures, newTeams, playerTeamIndex, selectedLineup) {
    let globalTimeline = [];
    let playerMatchResult = null;
    let matchIncome = 0;
    const allResults = fixtures.map((fixture)=>{
        const homeTeam = newTeams[fixture.home];
        const awayTeam = newTeams[fixture.away];
        const homeIsPlayer = fixture.home === playerTeamIndex;
        const awayIsPlayer = fixture.away === playerTeamIndex;
        const result = simulateMatch(homeTeam, awayTeam, homeIsPlayer, awayIsPlayer, selectedLineup);
        // Map events to include match identifier
        const matchId = `${fixture.home}-${fixture.away}`;
        const matchEvents = result.events.map((e)=>({
                ...e,
                matchId,
                homeId: fixture.home,
                awayId: fixture.away
            }));
        globalTimeline = globalTimeline.concat(matchEvents);
        fixture.homeGoals = result.homeGoals;
        fixture.awayGoals = result.awayGoals;
        fixture.events = result.events;
        fixture.played = true;
        if (homeIsPlayer || awayIsPlayer) {
            playerMatchResult = {
                fixture,
                homeTeam,
                awayTeam,
                result,
                homeIsPlayer
            };
            matchIncome = homeIsPlayer ? 1200000 : 400000;
        }
        return {
            homeTeam,
            awayTeam,
            result,
            fixture,
            matchId
        };
    });
    globalTimeline.sort((a, b)=>a.minute - b.minute);
    return {
        allResults,
        playerMatchResult,
        globalTimeline,
        matchIncome
    };
}
}),
"[project]/src/context/GameContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameProvider",
    ()=>GameProvider,
    "useGame",
    ()=>useGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$engine$2f$GameState$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/engine/GameState.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$engine$2f$Players$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/engine/Players.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$engine$2f$MatchSim$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/engine/MatchSim.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const GameContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function generateMarkets(fixtures, playerTeamIndex, roundIndex, teams) {
    // Generate markets for the Top 6 "Banger" Matches based on combined team strength
    const nonPlayerFixtures = fixtures.filter((f)=>f.home !== playerTeamIndex && f.away !== playerTeamIndex);
    // Calculate combined strength for each fixture
    const fixturesWithStrength = nonPlayerFixtures.map((f)=>{
        const homeStr = teams[f.home].players.slice(0, 11).reduce((s, p)=>s + p.strength, 0) / 11;
        const awayStr = teams[f.away].players.slice(0, 11).reduce((s, p)=>s + p.strength, 0) / 11;
        return {
            fixture: f,
            homeStr,
            awayStr,
            combinedStr: homeStr + awayStr
        };
    });
    // Sort by highest combined strength to find the "bangers"
    fixturesWithStrength.sort((a, b)=>b.combinedStr - a.combinedStr);
    // Pick the top 6
    const bangerFixtures = fixturesWithStrength.slice(0, 6);
    const selectedFixtures = [
        ...bangerFixtures
    ];
    // Always include the player's own team match
    const playerFixture = fixtures.find((f)=>f.home === playerTeamIndex || f.away === playerTeamIndex);
    if (playerFixture) {
        const homeStr = teams[playerFixture.home].players.slice(0, 11).reduce((s, p)=>s + p.strength, 0) / 11;
        const awayStr = teams[playerFixture.away].players.slice(0, 11).reduce((s, p)=>s + p.strength, 0) / 11;
        selectedFixtures.unshift({
            fixture: playerFixture,
            homeStr,
            awayStr,
            combinedStr: homeStr + awayStr
        });
    }
    return selectedFixtures.map(({ fixture: f, homeStr, awayStr })=>{
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
            odds1: Math.max(1.1, 1 / (homeProb * 0.85 + 0.05) + (Math.random() * 0.3 - 0.15)).toFixed(2),
            oddsX: Math.max(2.5, 1 / drawProb + (Math.random() * 0.5 - 0.25)).toFixed(2),
            odds2: Math.max(1.1, 1 / (awayProb * 0.85 + 0.05) + (Math.random() * 0.3 - 0.15)).toFixed(2)
        };
    });
}
function gameReducer(state, action) {
    switch(action.type){
        case 'INIT_GAME':
            {
                const teams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$engine$2f$Players$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateTeams"])();
                const fixtures = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$engine$2f$MatchSim$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateFixtures"])(teams);
                return {
                    ...state,
                    teams,
                    fixtures
                };
            }
        // ─── ONBOARDING ───
        case 'SET_CONTINENT':
            return {
                ...state,
                selectedContinent: action.payload,
                onboardingStep: 1
            };
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.payload
            };
        case 'SET_ONBOARDING_STEP':
            return {
                ...state,
                onboardingStep: action.payload
            };
        case 'SELECT_TEAM':
            return {
                ...state,
                playerTeamIndex: action.payload
            };
        case 'START_GAME':
            {
                const currentRoundFixtures = state.fixtures[0];
                return {
                    ...state,
                    gameStarted: true,
                    markets: generateMarkets(currentRoundFixtures, state.playerTeamIndex, 0, state.teams)
                };
            }
        // ─── SQUAD ───
        case 'TOGGLE_LINEUP':
            {
                const playerId = action.payload;
                const currentLineup = [
                    ...state.selectedLineup
                ];
                const index = currentLineup.indexOf(playerId);
                if (index > -1) {
                    currentLineup.splice(index, 1);
                } else if (currentLineup.length < 11) {
                    currentLineup.push(playerId);
                }
                return {
                    ...state,
                    selectedLineup: currentLineup
                };
            }
        case 'AUTO_LINEUP':
            {
                const team = state.teams[state.playerTeamIndex];
                const sorted = [
                    ...team.players
                ].sort((a, b)=>b.strength - a.strength);
                const needed = {
                    GK: 1,
                    DEF: 4,
                    MID: 4,
                    FWD: 2
                };
                const newLineup = [];
                Object.entries(needed).forEach(([pos, count])=>{
                    const posPlayers = sorted.filter((p)=>p.position === pos);
                    for(let i = 0; i < count && i < posPlayers.length; i++){
                        newLineup.push(posPlayers[i].id);
                    }
                });
                return {
                    ...state,
                    selectedLineup: newLineup
                };
            }
        // ─── BET SLIP ───
        case 'ADD_TO_SLIP':
            {
                const exists = state.betSlip.find((b)=>b.matchId === action.payload.matchId);
                if (exists) {
                    return {
                        ...state,
                        betSlip: state.betSlip.map((b)=>b.matchId === action.payload.matchId ? action.payload : b)
                    };
                }
                return {
                    ...state,
                    betSlip: [
                        ...state.betSlip,
                        {
                            ...action.payload,
                            amount: 1000
                        }
                    ]
                };
            }
        case 'REMOVE_FROM_SLIP':
            return {
                ...state,
                betSlip: state.betSlip.filter((b)=>b.matchId !== action.payload)
            };
        case 'UPDATE_SLIP_AMOUNT':
            return {
                ...state,
                betSlip: state.betSlip.map((b)=>b.matchId === action.payload.matchId ? {
                        ...b,
                        amount: action.payload.amount
                    } : b)
            };
        case 'CLEAR_SLIP':
            return {
                ...state,
                betSlip: []
            };
        case 'CONFIRM_SLIP':
            {
                const totalCost = state.betSlip.reduce((sum, b)=>sum + b.amount, 0);
                if (totalCost > state.budget || state.betSlip.length === 0) return state;
                const newBets = state.betSlip.map((b)=>({
                        id: `${b.matchId}-${b.selection}-${Date.now()}-${Math.random()}`,
                        marketId: b.matchId,
                        selection: b.selection,
                        amount: b.amount,
                        odds: b.odds,
                        round: state.round - 1,
                        resolved: false
                    }));
                return {
                    ...state,
                    budget: state.budget - totalCost,
                    activeBets: [
                        ...state.activeBets,
                        ...newBets
                    ],
                    betSlip: [],
                    toasts: [
                        ...state.toasts,
                        {
                            id: Date.now(),
                            message: `Bets placed! €${totalCost.toLocaleString()} wagered on ${newBets.length} match(es).`,
                            type: 'success'
                        }
                    ]
                };
            }
        // ─── MATCHDAY LIVE SIMULATION ───
        case 'START_LIVE_SIM':
            {
                if (state.selectedLineup.length < 11) return state;
                const currentRoundIdx = state.round - 1;
                const roundFixtures = state.fixtures[currentRoundIdx];
                const newTeams = JSON.parse(JSON.stringify(state.teams));
                // Pre-calculate the entire round
                const { allResults, playerMatchResult, globalTimeline, matchIncome } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$engine$2f$MatchSim$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateRoundTimeline"])(roundFixtures, newTeams, state.playerTeamIndex, state.selectedLineup);
                // Init scores object (everyone starts at 0-0)
                const initialScores = {};
                roundFixtures.forEach((f)=>{
                    initialScores[`${f.home}-${f.away}`] = {
                        home: 0,
                        away: 0
                    };
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
        case 'TICK_SIM':
            {
                if (!state.liveSim.active) return state;
                const sim = {
                    ...state.liveSim
                };
                if (sim.halfTimePause) {
                    // We handle the unpause via another action or just rely on the component dispatching TICK without pause
                    sim.halfTimePause = false;
                    return {
                        ...state,
                        liveSim: sim
                    };
                }
                sim.minute += 1;
                if (sim.minute === 45) {
                    sim.halfTimePause = true;
                }
                // Process events for this minute
                const eventsThisMinute = sim.timeline.filter((e)=>e.minute === sim.minute);
                eventsThisMinute.forEach((event)=>{
                    if (event.type === 'goal') {
                        if (event.side === 'home') sim.scores[event.matchId].home += 1;
                        if (event.side === 'away') sim.scores[event.matchId].away += 1;
                    }
                    // Add to player's live commentary if it's their match
                    if (sim.playerMatchResult && event.matchId === `${sim.playerMatchResult.fixture.home}-${sim.playerMatchResult.fixture.away}`) {
                        sim.playerMatchEvents = [
                            {
                                ...event,
                                key: Date.now() + Math.random()
                            },
                            ...sim.playerMatchEvents
                        ];
                    }
                });
                return {
                    ...state,
                    liveSim: sim
                };
            }
        case 'SKIP_SIM':
            {
                if (!state.liveSim.active) return state;
                // Instantly process all remaining events
                const sim = {
                    ...state.liveSim
                };
                const remainingEvents = sim.timeline.filter((e)=>e.minute > sim.minute);
                remainingEvents.forEach((event)=>{
                    if (event.type === 'goal') {
                        if (event.side === 'home') sim.scores[event.matchId].home += 1;
                        if (event.side === 'away') sim.scores[event.matchId].away += 1;
                    }
                    if (sim.playerMatchResult && event.matchId === `${sim.playerMatchResult.fixture.home}-${sim.playerMatchResult.fixture.away}`) {
                        sim.playerMatchEvents = [
                            {
                                ...event,
                                key: Date.now() + Math.random()
                            },
                            ...sim.playerMatchEvents
                        ];
                    }
                });
                sim.minute = 90;
                return {
                    ...state,
                    liveSim: sim
                };
            }
        case 'END_SIM':
            {
                if (!state.liveSim.active) return state;
                const currentRoundIdx = state.round - 1;
                const newTeams = JSON.parse(JSON.stringify(state.teams));
                const { allResults, playerMatchResult, matchIncome } = state.liveSim;
                const roundFixtures = state.fixtures[currentRoundIdx];
                // 1. Apply results to teams
                allResults.forEach(({ homeTeam, awayTeam, result, fixture })=>{
                    const h = newTeams.find((t)=>t.id === homeTeam.id);
                    const a = newTeams.find((t)=>t.id === awayTeam.id);
                    h.stats.played++;
                    a.stats.played++;
                    h.stats.goalsFor += result.homeGoals;
                    h.stats.goalsAgainst += result.awayGoals;
                    a.stats.goalsFor += result.awayGoals;
                    a.stats.goalsAgainst += result.homeGoals;
                    if (result.homeGoals > result.awayGoals) {
                        h.stats.won++;
                        h.stats.points += 3;
                        a.stats.lost++;
                    } else if (result.homeGoals < result.awayGoals) {
                        a.stats.won++;
                        a.stats.points += 3;
                        h.stats.lost++;
                    } else {
                        h.stats.drawn++;
                        a.stats.drawn++;
                        h.stats.points++;
                        a.stats.points++;
                    }
                    // Update fixture
                    const fix = roundFixtures.find((f)=>f.home === fixture.home && f.away === fixture.away);
                    fix.homeGoals = result.homeGoals;
                    fix.awayGoals = result.awayGoals;
                    fix.played = true;
                });
                // 2. Resolve bets
                let roundWinnings = 0;
                let newOracleStreak = state.oracleStreak;
                const newToasts = [];
                const newActiveBets = state.activeBets.map((bet)=>{
                    if (bet.round === currentRoundIdx && !bet.resolved) {
                        const market = state.markets.find((m)=>m.id === bet.marketId);
                        if (market) {
                            const fix = roundFixtures.find((f)=>f.home === market.homeIdx && f.away === market.awayIdx);
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
                                    const payout = bet.amount * parseFloat(bet.odds || bet.multiplier);
                                    roundWinnings += payout;
                                    newOracleStreak++;
                                    newToasts.push({
                                        id: Date.now() + Math.floor(Math.random() * 1000),
                                        message: `🎯 Won €${Math.floor(payout).toLocaleString()}!`,
                                        type: 'success'
                                    });
                                } else {
                                    newOracleStreak = 0;
                                    newToasts.push({
                                        id: Date.now() + Math.floor(Math.random() * 1000),
                                        message: `❌ Lost €${bet.amount.toLocaleString()}`,
                                        type: 'error'
                                    });
                                }
                                return {
                                    ...bet,
                                    resolved: true,
                                    won
                                };
                            }
                        }
                    }
                    return bet;
                });
                const newBudget = state.budget + matchIncome + roundWinnings;
                // 3. NFT Triggers
                let newWinStreak = state.winStreak;
                const newPendingMints = [
                    ...state.pendingMints
                ];
                if (playerMatchResult) {
                    const isWin = playerMatchResult.homeIsPlayer ? playerMatchResult.result.homeGoals > playerMatchResult.result.awayGoals : playerMatchResult.result.awayGoals > playerMatchResult.result.homeGoals;
                    if (isWin) {
                        newWinStreak++;
                        if (!state.nftBadges.some((b)=>b.type === 0)) {
                            newPendingMints.push({
                                type: 0,
                                info: `First Win vs ${playerMatchResult.homeIsPlayer ? playerMatchResult.awayTeam.name : playerMatchResult.homeTeam.name}`
                            });
                        }
                        if (newWinStreak === 5 && !state.nftBadges.some((b)=>b.type === 1)) {
                            newPendingMints.push({
                                type: 1,
                                info: "5 Match Win Streak"
                            });
                        }
                        if (newWinStreak === 10 && !state.nftBadges.some((b)=>b.type === 4)) {
                            newPendingMints.push({
                                type: 4,
                                info: "10 Matches Unbeaten"
                            });
                        }
                    } else {
                        const isDraw = playerMatchResult.result.homeGoals === playerMatchResult.result.awayGoals;
                        if (!isDraw) newWinStreak = 0;
                    }
                }
                if (newOracleStreak >= 3 && !state.nftBadges.some((b)=>b.type === 2)) {
                    newPendingMints.push({
                        type: 2,
                        info: "3 Correct Predictions"
                    });
                    newOracleStreak = 0;
                }
                const sortedTeams = [
                    ...newTeams
                ].sort((a, b)=>b.stats.points - a.stats.points);
                if (sortedTeams[0].id === state.playerTeamIndex && state.round >= 5 && !state.nftBadges.some((b)=>b.type === 5)) {
                    newPendingMints.push({
                        type: 5,
                        info: "Reached #1 in the League"
                    });
                }
                if (state.round >= 20 && !state.nftBadges.some((b)=>b.type === 6)) {
                    newPendingMints.push({
                        type: 6,
                        info: "Completed 20 Matchdays"
                    });
                }
                // 4. Player energy
                const playerTeam = newTeams[state.playerTeamIndex];
                playerTeam.players.forEach((p)=>{
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
                    showMatchModal: true,
                    liveSim: {
                        ...state.liveSim,
                        active: false
                    },
                    lastMatchResult: {
                        playerMatch: playerMatchResult,
                        allResults
                    },
                    toasts: [
                        ...state.toasts,
                        ...newToasts
                    ]
                };
            }
        case 'CLOSE_MATCH_MODAL':
            {
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
                budget: state.budget + 500000,
                pendingMints: state.pendingMints.filter((_, i)=>i !== 0),
                nftBadges: [
                    ...state.nftBadges,
                    action.payload
                ],
                toasts: [
                    ...state.toasts,
                    {
                        id: Date.now(),
                        message: 'Badge Collected! €500,000 demo funds added.',
                        type: 'success'
                    }
                ]
            };
        case 'PK_GAME_END':
            {
                const { won, score } = action.payload;
                const stats = {
                    ...state.pkShooterStats
                };
                stats.totalPlayed++;
                stats.totalGoals += score;
                if (score > stats.bestScore) stats.bestScore = score;
                const newPendingMints = [
                    ...state.pendingMints
                ];
                if (won) {
                    stats.totalWins++;
                    stats.winStreak++;
                    if (stats.totalWins === 1 && !state.nftBadges.some((b)=>b.type === 8)) {
                        newPendingMints.push({
                            type: 8,
                            info: "First PK Shootout Win"
                        });
                    } else if (stats.totalWins === 5 && !state.nftBadges.some((b)=>b.type === 9)) {
                        newPendingMints.push({
                            type: 9,
                            info: "5 PK Shootout Wins"
                        });
                    } else if (stats.totalWins === 10 && !state.nftBadges.some((b)=>b.type === 10)) {
                        newPendingMints.push({
                            type: 10,
                            info: "10 PK Shootout Wins"
                        });
                    }
                } else {
                    stats.winStreak = 0;
                }
                return {
                    ...state,
                    pkShooterStats: stats,
                    pendingMints: newPendingMints,
                    toasts: [
                        ...state.toasts,
                        {
                            id: Date.now(),
                            message: won ? `Shootout Won! (${score}/5)` : `Shootout Lost. (${score}/5)`,
                            type: won ? 'success' : 'error'
                        }
                    ]
                };
            }
        // ─── TOASTS ───
        case 'DISMISS_TOAST':
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.payload)
            };
        case 'ADD_TOAST':
            return {
                ...state,
                toasts: [
                    ...state.toasts,
                    {
                        id: Date.now(),
                        ...action.payload
                    }
                ]
            };
        // ─── FANTASY ───
        case 'FANTASY_ADD_PLAYER':
            {
                if (state.fantasy.squad.length >= 6) return state;
                const cost = action.payload.value;
                if (state.fantasy.budget < cost) return state;
                return {
                    ...state,
                    fantasy: {
                        ...state.fantasy,
                        squad: [
                            ...state.fantasy.squad,
                            action.payload
                        ],
                        budget: state.fantasy.budget - cost
                    }
                };
            }
        case 'FANTASY_REMOVE_PLAYER':
            {
                const player = state.fantasy.squad.find((p)=>p.id === action.payload);
                if (!player) return state;
                return {
                    ...state,
                    fantasy: {
                        ...state.fantasy,
                        squad: state.fantasy.squad.filter((p)=>p.id !== action.payload),
                        budget: state.fantasy.budget + player.value
                    }
                };
            }
        case 'FANTASY_SET_SQUAD':
            {
                const cost = action.payload.reduce((sum, p)=>sum + p.value, 0);
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
                fantasy: {
                    ...state.fantasy,
                    totalPoints: action.payload
                }
            };
        default:
            return state;
    }
}
function GameProvider({ children }) {
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(gameReducer, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$engine$2f$GameState$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialGameState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        dispatch({
            type: 'INIT_GAME'
        });
    }, []);
    // The Tick Loop for Live Simulation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!state.liveSim.active) return;
        // If we reached minute 90, end the sim after a short pause
        if (state.liveSim.minute >= 90) {
            const timer = setTimeout(()=>{
                dispatch({
                    type: 'END_SIM'
                });
            }, 1500);
            return ()=>clearTimeout(timer);
        }
        // If half time, pause for 3 seconds
        if (state.liveSim.halfTimePause) {
            const timer = setTimeout(()=>{
                dispatch({
                    type: 'TICK_SIM'
                }); // This tick will unpause
            }, 3000);
            return ()=>clearTimeout(timer);
        }
        // Tick every 666ms (90 minutes in ~60 seconds)
        const timer = setTimeout(()=>{
            dispatch({
                type: 'TICK_SIM'
            });
        }, 666);
        return ()=>clearTimeout(timer);
    }, [
        state.liveSim.active,
        state.liveSim.minute,
        state.liveSim.halfTimePause
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GameContext.Provider, {
        value: {
            state,
            dispatch
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/GameContext.jsx",
        lineNumber: 513,
        columnNumber: 9
    }, this);
}
function useGame() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(GameContext);
}
}),
"[project]/src/app/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GameContext.jsx [app-ssr] (ecmascript)");
;
"use client";
;
;
;
;
// Dynamically import the App to disable Server-Side Rendering (SSR)
// This prevents hydration errors from browser extensions or window.ethereum
const App = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/App.jsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(App, {}, void 0, false, {
            fileName: "[project]/src/app/page.jsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.jsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
"[project]/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This has to be a shared module which is shared between client component error boundary and dynamic component
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    BailoutToCSRError: null,
    isBailoutToCSRError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BailoutToCSRError: function() {
        return BailoutToCSRError;
    },
    isBailoutToCSRError: function() {
        return isBailoutToCSRError;
    }
});
const BAILOUT_TO_CSR = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
class BailoutToCSRError extends Error {
    constructor(reason){
        super(`Bail out to client-side rendering: ${reason}`), this.reason = reason, this.digest = BAILOUT_TO_CSR;
    }
}
function isBailoutToCSRError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === BAILOUT_TO_CSR;
}
}),
"[project]/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-bailout-to-csr.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BailoutToCSR", {
    enumerable: true,
    get: function() {
        return BailoutToCSR;
    }
});
const _bailouttocsr = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)");
function BailoutToCSR({ reason, children }) {
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(reason), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    return children;
}
}),
"[project]/node_modules/next/dist/shared/lib/encode-uri-path.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "encodeURIPath", {
    enumerable: true,
    get: function() {
        return encodeURIPath;
    }
});
function encodeURIPath(file) {
    return file.split('/').map((p)=>encodeURIComponent(p)).join('/');
}
}),
"[project]/node_modules/next/dist/shared/lib/deployment-id.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getAssetToken: null,
    getAssetTokenQuery: null,
    getDeploymentId: null,
    getDeploymentIdQuery: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getAssetToken: function() {
        return getAssetToken;
    },
    getAssetTokenQuery: function() {
        return getAssetTokenQuery;
    },
    getDeploymentId: function() {
        return getDeploymentId;
    },
    getDeploymentIdQuery: function() {
        return getDeploymentIdQuery;
    }
});
let deploymentId;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    // Client side: replaced with globalThis.NEXT_DEPLOYMENT_ID
    // Server side: left as is or replaced with a string or replaced with false
    deploymentId = ("TURBOPACK compile-time value", false) || undefined;
}
function getDeploymentId() {
    return deploymentId;
}
function getDeploymentIdQuery(ampersand = false) {
    let id = getDeploymentId();
    if (id) {
        return `${ampersand ? '&' : '?'}dpl=${id}`;
    }
    return '';
}
function getAssetToken() {
    return ("TURBOPACK compile-time value", "") || ("TURBOPACK compile-time value", false);
}
function getAssetTokenQuery(ampersand = false) {
    let id = getAssetToken();
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return '';
}
}),
"[project]/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PreloadChunks", {
    enumerable: true,
    get: function() {
        return PreloadChunks;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
const _reactdom = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _encodeuripath = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/encode-uri-path.js [app-ssr] (ecmascript)");
const _deploymentid = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/deployment-id.js [app-ssr] (ecmascript)");
function PreloadChunks({ moduleIds }) {
    // Early return in client compilation and only load requestStore on server side
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (workStore === undefined) {
        return null;
    }
    const allFiles = [];
    // Search the current dynamic call unique key id in react loadable manifest,
    // and find the corresponding CSS files to preload
    if (workStore.reactLoadableManifest && moduleIds) {
        const manifest = workStore.reactLoadableManifest;
        for (const key of moduleIds){
            if (!manifest[key]) continue;
            const chunks = manifest[key].files;
            allFiles.push(...chunks);
        }
    }
    if (allFiles.length === 0) {
        return null;
    }
    const query = (0, _deploymentid.getAssetTokenQuery)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: allFiles.map((chunk)=>{
            const href = `${workStore.assetPrefix}/_next/${(0, _encodeuripath.encodeURIPath)(chunk)}${query}`;
            const isCss = chunk.endsWith('.css');
            // If it's stylesheet we use `precedence` o help hoist with React Float.
            // For stylesheets we actually need to render the CSS because nothing else is going to do it so it needs to be part of the component tree.
            // The `preload` for stylesheet is not optional.
            if (isCss) {
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    // @ts-ignore
                    precedence: "dynamic",
                    href: href,
                    rel: "stylesheet",
                    as: "style",
                    nonce: workStore.nonce
                }, chunk);
            } else {
                // If it's script we use ReactDOM.preload to preload the resources
                (0, _reactdom.preload)(href, {
                    as: 'script',
                    fetchPriority: 'low',
                    nonce: workStore.nonce
                });
                return null;
            }
        })
    });
}
}),
"[project]/node_modules/next/dist/shared/lib/lazy-dynamic/loadable.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
const _dynamicbailouttocsr = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-bailout-to-csr.js [app-ssr] (ecmascript)");
const _preloadchunks = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js [app-ssr] (ecmascript)");
// Normalize loader to return the module as form { default: Component } for `React.lazy`.
// Also for backward compatible since next/dynamic allows to resolve a component directly with loader
// Client component reference proxy need to be converted to a module.
function convertModule(mod) {
    // Check "default" prop before accessing it, as it could be client reference proxy that could break it reference.
    // Cases:
    // mod: { default: Component }
    // mod: Component
    // mod: { default: proxy(Component) }
    // mod: proxy(Component)
    const hasDefault = mod && 'default' in mod;
    return {
        default: hasDefault ? mod.default : mod
    };
}
const defaultOptions = {
    loader: ()=>Promise.resolve(convertModule(()=>null)),
    loading: null,
    ssr: true
};
function Loadable(options) {
    const opts = {
        ...defaultOptions,
        ...options
    };
    const Lazy = /*#__PURE__*/ (0, _react.lazy)(()=>opts.loader().then(convertModule));
    const Loading = opts.loading;
    function LoadableComponent(props) {
        const fallbackElement = Loading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(Loading, {
            isLoading: true,
            pastDelay: true,
            error: null
        }) : null;
        // If it's non-SSR or provided a loading component, wrap it in a suspense boundary
        const hasSuspenseBoundary = !opts.ssr || !!opts.loading;
        const Wrap = hasSuspenseBoundary ? _react.Suspense : _react.Fragment;
        const wrapProps = hasSuspenseBoundary ? {
            fallback: fallbackElement
        } : {};
        const children = opts.ssr ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
            children: [
                ("TURBOPACK compile-time truthy", 1) ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_preloadchunks.PreloadChunks, {
                    moduleIds: opts.modules
                }) : "TURBOPACK unreachable",
                /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                    ...props
                })
            ]
        }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_dynamicbailouttocsr.BailoutToCSR, {
            reason: "next/dynamic",
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                ...props
            })
        });
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Wrap, {
            ...wrapProps,
            children: children
        });
    }
    LoadableComponent.displayName = 'LoadableComponent';
    return LoadableComponent;
}
const _default = Loadable;
}),
"[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return dynamic;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-ssr] (ecmascript)");
const _loadable = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/lazy-dynamic/loadable.js [app-ssr] (ecmascript)"));
function dynamic(dynamicOptions, options) {
    const loadableOptions = {};
    if (typeof dynamicOptions === 'function') {
        loadableOptions.loader = dynamicOptions;
    }
    const mergedOptions = {
        ...loadableOptions,
        ...options
    };
    return (0, _loadable.default)({
        ...mergedOptions,
        modules: mergedOptions.loadableGenerated?.modules
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
];

//# sourceMappingURL=_0v2rmw5._.js.map