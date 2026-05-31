// ==================== COMPLETE GAME STATE ====================

export const initialGameState = {
    // Game flow
    gameStarted: false,
    season: 1,
    round: 1,
    
    // Onboarding
    onboardingStep: 0,       // 0=continent, 1=nation, 2=username, 3=confirm
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
        scores: {}, // e.g. "0-1": { home: 1, away: 0 }
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
    lastMatchResult: null,   // { playerMatch, allResults }
    showSeasonEnd: false,
    seasonEndResult: null,
    
    // Betting — Bet Slip system
    markets: [],       // Generated per round: [{ id, homeIdx, awayIdx, round, odds1, oddsX, odds2 }]
    betSlip: [],       // [{ matchId, selection: '1'|'X'|'2', odds, homeAbbr, awayAbbr, amount }]
    activeBets: [],    // [{ marketId, selection, amount, odds, round, resolved }]
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
    nftBadges: [],     // [{ type, name, info, date }]
    pendingMints: [],  // [{ type, info }]
    
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
    toasts: [], // [{ id, message, type: 'success'|'error'|'info' }]
    
    // Fantasy League
    fantasy: {
        squad: [],
        budget: 100,
        totalPoints: 0
    }
};
