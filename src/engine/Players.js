import { TEAMS } from './Data.js';

// Hardcoded real squads for the top teams
const REAL_SQUADS = {
    "Argentina": [
        { name: "E. Martinez", pos: "GK", str: 88, age: 31 },
        { name: "G. Rulli", pos: "GK", str: 82, age: 31 },
        { name: "C. Romero", pos: "DEF", str: 87, age: 26 },
        { name: "L. Martinez", pos: "DEF", str: 86, age: 26 },
        { name: "N. Otamendi", pos: "DEF", str: 83, age: 36 },
        { name: "N. Molina", pos: "DEF", str: 84, age: 26 },
        { name: "M. Acuna", pos: "DEF", str: 83, age: 32 },
        { name: "N. Tagliafico", pos: "DEF", str: 82, age: 31 },
        { name: "E. Fernandez", pos: "MID", str: 87, age: 23 },
        { name: "A. Mac Allister", pos: "MID", str: 86, age: 25 },
        { name: "R. De Paul", pos: "MID", str: 85, age: 29 },
        { name: "G. Lo Celso", pos: "MID", str: 83, age: 28 },
        { name: "L. Paredes", pos: "MID", str: 82, age: 29 },
        { name: "L. Messi", pos: "FWD", str: 94, age: 36 },
        { name: "L. Martinez", pos: "FWD", str: 88, age: 26 },
        { name: "J. Alvarez", pos: "FWD", str: 87, age: 24 },
        { name: "A. Di Maria", pos: "FWD", str: 84, age: 36 },
        { name: "A. Garnacho", pos: "FWD", str: 83, age: 19 }
    ],
    "France": [
        { name: "M. Maignan", pos: "GK", str: 88, age: 28 },
        { name: "B. Pavard", pos: "DEF", str: 85, age: 28 },
        { name: "D. Upamecano", pos: "DEF", str: 86, age: 25 },
        { name: "W. Saliba", pos: "DEF", str: 87, age: 23 },
        { name: "T. Hernandez", pos: "DEF", str: 86, age: 26 },
        { name: "J. Kounde", pos: "DEF", str: 85, age: 25 },
        { name: "A. Tchouameni", pos: "MID", str: 87, age: 24 },
        { name: "E. Camavinga", pos: "MID", str: 86, age: 21 },
        { name: "A. Rabiot", pos: "MID", str: 84, age: 29 },
        { name: "A. Griezmann", pos: "MID", str: 88, age: 33 },
        { name: "K. Mbappe", pos: "FWD", str: 95, age: 25 },
        { name: "O. Dembele", pos: "FWD", str: 86, age: 27 },
        { name: "O. Giroud", pos: "FWD", str: 83, age: 37 },
        { name: "M. Thuram", pos: "FWD", str: 84, age: 26 }
    ],
    "England": [
        { name: "J. Pickford", pos: "GK", str: 84, age: 30 },
        { name: "K. Walker", pos: "DEF", str: 86, age: 34 },
        { name: "J. Stones", pos: "DEF", str: 87, age: 30 },
        { name: "H. Maguire", pos: "DEF", str: 83, age: 31 },
        { name: "L. Shaw", pos: "DEF", str: 84, age: 28 },
        { name: "D. Rice", pos: "MID", str: 88, age: 25 },
        { name: "J. Bellingham", pos: "MID", str: 92, age: 20 },
        { name: "P. Foden", pos: "MID", str: 89, age: 24 },
        { name: "T. Alexander-Arnold", pos: "MID", str: 86, age: 25 },
        { name: "B. Saka", pos: "FWD", str: 89, age: 22 },
        { name: "H. Kane", pos: "FWD", str: 91, age: 30 },
        { name: "O. Watkins", pos: "FWD", str: 85, age: 28 }
    ],
    "Brazil": [
        { name: "Alisson", pos: "GK", str: 89, age: 31 },
        { name: "Ederson", pos: "GK", str: 88, age: 30 },
        { name: "Marquinhos", pos: "DEF", str: 87, age: 30 },
        { name: "Eder Militao", pos: "DEF", str: 86, age: 26 },
        { name: "Gabriel", pos: "DEF", str: 85, age: 26 },
        { name: "Danilo", pos: "DEF", str: 83, age: 32 },
        { name: "Casemiro", pos: "MID", str: 86, age: 32 },
        { name: "B. Guimaraes", pos: "MID", str: 87, age: 26 },
        { name: "L. Paqueta", pos: "MID", str: 85, age: 26 },
        { name: "Vinicius Jr", pos: "FWD", str: 92, age: 23 },
        { name: "Rodrygo", pos: "FWD", str: 88, age: 23 },
        { name: "Raphinha", pos: "FWD", str: 85, age: 27 },
        { name: "Endrick", pos: "FWD", str: 82, age: 17 }
    ]
};

const FIRST_NAMES = ["Alex", "Ben", "Carlos", "David", "Enzo", "Felix", "Gabriel", "Hugo", "Ivan", "Jack", "Kevin", "Leo", "Max", "Nico", "Oscar", "Pablo", "Quinn", "Ryan", "Sam", "Tom", "Victor", "Will", "Xavi", "Yuri", "Zack"];
const LAST_NAMES = ["Smith", "Jones", "Williams", "Brown", "Taylor", "Silva", "Garcia", "Martinez", "Rossi", "Muller", "Dubois", "Santos", "Kim", "Lee", "Chen", "Wang", "Singh", "Ali", "Ivanov", "Novak", "Costa", "Gomez", "Kowalski", "Okafor", "Mensah"];

export function generatePlayerId() {
    return Math.random().toString(36).substr(2, 9);
}

export function calculatePlayerValue(player) {
    let baseValue = Math.pow(player.strength, 3) * 10;
    if (player.age < 23) baseValue *= 1.5;
    else if (player.age > 30) baseValue *= 0.6;
    return Math.floor(baseValue);
}

export function generatePlayer(pos, tier) {
    const fn = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const ln = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    
    const minStr = tier === 1 ? 80 : (tier === 2 ? 75 : 70);
    const maxStr = tier === 1 ? 92 : (tier === 2 ? 85 : 80);
    
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

export function generateSquad(teamName, tier) {
    const squad = [];
    
    if (REAL_SQUADS[teamName]) {
        const realPlayers = REAL_SQUADS[teamName];
        realPlayers.forEach(rp => {
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
    
    const currentCounts = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
    squad.forEach(p => currentCounts[p.position]++);
    
    const needed = { GK: 2, DEF: 6, MID: 6, FWD: 6 };
    Object.keys(needed).forEach(pos => {
        while (currentCounts[pos] < needed[pos]) {
            squad.push(generatePlayer(pos, tier));
            currentCounts[pos]++;
        }
    });
    
    return squad;
}

export function generateTeams() {
    return TEAMS.map((team, index) => {
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
                played: 0, won: 0, drawn: 0, lost: 0,
                goalsFor: 0, goalsAgainst: 0, points: 0
            }
        };
    });
}
