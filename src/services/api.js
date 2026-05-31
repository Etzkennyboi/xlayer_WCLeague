import axios from 'axios';

const RAPID_API_KEY = 'e9cc5043dfmsh497d559c44d5bd4p1f6f7ajsn090a62d49229';
const RAPID_API_HOST = 'free-api-live-football-data.p.rapidapi.com';

export async function getRealWorldFixtures() {
    try {
        // Try fetching matches for today/tomorrow
        const today = new Date().toISOString().split('T')[0];
        const response = await axios.get(`https://${RAPID_API_HOST}/football-get-matches-by-date`, {
            params: { date: today },
            headers: {
                'x-rapidapi-host': RAPID_API_HOST,
                'x-rapidapi-key': RAPID_API_KEY
            }
        });
        
        if (response.data && response.data.response && response.data.response.length > 0) {
            return response.data.response.slice(0, 5).map(m => ({
                id: m.fixture.id,
                league: m.league.name,
                home: m.teams.home.name,
                away: m.teams.away.name,
                homeOdds: 1.8, // Mocked odds for now as free api might not provide them
                awayOdds: 2.1
            }));
        }
    } catch (e) {
        console.log("RapidAPI Fixtures Error, falling back to realistic mock data...", e.message);
    }

    // Fallback if the API fails or doesn't have matches today
    return [
        { id: 901, league: 'UEFA Champions League', home: 'Real Madrid', away: 'Bayern Munich', homeOdds: 1.8, awayOdds: 2.1 },
        { id: 902, league: 'English Premier League', home: 'Arsenal', away: 'Man City', homeOdds: 2.5, awayOdds: 1.5 },
        { id: 903, league: 'La Liga', home: 'Barcelona', away: 'Atletico Madrid', homeOdds: 1.9, awayOdds: 2.0 }
    ];
}

export async function scoutPlayer(searchQuery) {
    if (!searchQuery) return [];
    
    try {
        const response = await axios.get(`https://${RAPID_API_HOST}/football-players-search`, {
            params: { search: searchQuery },
            headers: {
                'x-rapidapi-host': RAPID_API_HOST,
                'x-rapidapi-key': RAPID_API_KEY
            }
        });
        
        // Return array of player objects. 
        // The API returns an object with a 'response' array of players.
        if (response.data && response.data.response) {
            return response.data.response.map(p => ({
                id: p.player.id.toString(),
                name: p.player.name,
                firstname: p.player.firstname,
                lastname: p.player.lastname,
                age: p.player.age || 25, // Fallback if missing
                nationality: p.player.nationality,
                photo: p.player.photo,
                teamId: p.statistics && p.statistics[0] ? p.statistics[0].team.id : null,
                teamName: p.statistics && p.statistics[0] ? p.statistics[0].team.name : 'Unknown Team',
                position: mapPosition(p.statistics && p.statistics[0] ? p.statistics[0].games.position : 'Midfielder'),
                strength: Math.floor(75 + Math.random() * 20), // Placeholder overall rating since API doesn't provide FIFA OVR
                energy: 100,
                condition: 100,
                value: Math.floor(Math.random() * 50000000) + 10000000
            }));
        }
        return [];
    } catch (error) {
        console.error("Scouting Error:", error);
        return [];
    }
}

// Maps API positions (Attacker, Midfielder, Defender, Goalkeeper) to our engine (FWD, MID, DEF, GK)
function mapPosition(apiPos) {
    if (!apiPos) return 'MID';
    const pos = apiPos.toLowerCase();
    if (pos.includes('attack')) return 'FWD';
    if (pos.includes('midfield')) return 'MID';
    if (pos.includes('defend')) return 'DEF';
    if (pos.includes('goal')) return 'GK';
    return 'MID';
}
