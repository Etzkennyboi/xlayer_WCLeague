// ==================== GLOBAL LEAGUE DATA (48 TEAMS) ====================

export const TEAMS = [
    { name: "Argentina", abbr: "ARG", code: "ar", continent: "South America" },
    { name: "France", abbr: "FRA", code: "fr", continent: "Europe" },
    { name: "England", abbr: "ENG", code: "gb-eng", continent: "Europe" },
    { name: "Brazil", abbr: "BRA", code: "br", continent: "South America" },
    { name: "Spain", abbr: "ESP", code: "es", continent: "Europe" },
    { name: "Portugal", abbr: "POR", code: "pt", continent: "Europe" },
    { name: "Germany", abbr: "GER", code: "de", continent: "Europe" },
    { name: "Italy", abbr: "ITA", code: "it", continent: "Europe" },
    { name: "Netherlands", abbr: "NED", code: "nl", continent: "Europe" },
    { name: "Croatia", abbr: "CRO", code: "hr", continent: "Europe" },
    { name: "Uruguay", abbr: "URU", code: "uy", continent: "South America" },
    { name: "USA", abbr: "USA", code: "us", continent: "North America" },
    { name: "Colombia", abbr: "COL", code: "co", continent: "South America" },
    { name: "Belgium", abbr: "BEL", code: "be", continent: "Europe" },
    { name: "Japan", abbr: "JPN", code: "jp", continent: "Asia" },
    { name: "Senegal", abbr: "SEN", code: "sn", continent: "Africa" },
    { name: "Morocco", abbr: "MAR", code: "ma", continent: "Africa" },
    { name: "South Korea", abbr: "KOR", code: "kr", continent: "Asia" },
    { name: "Mexico", abbr: "MEX", code: "mx", continent: "North America" },
    { name: "Canada", abbr: "CAN", code: "ca", continent: "North America" },
    { name: "Switzerland", abbr: "SUI", code: "ch", continent: "Europe" },
    { name: "Denmark", abbr: "DEN", code: "dk", continent: "Europe" },
    { name: "Sweden", abbr: "SWE", code: "se", continent: "Europe" },
    { name: "Serbia", abbr: "SRB", code: "rs", continent: "Europe" },
    { name: "Poland", abbr: "POL", code: "pl", continent: "Europe" },
    { name: "Iran", abbr: "IRN", code: "ir", continent: "Asia" },
    { name: "Australia", abbr: "AUS", code: "au", continent: "Oceania" },
    { name: "Egypt", abbr: "EGY", code: "eg", continent: "Africa" },
    { name: "Nigeria", abbr: "NGA", code: "ng", continent: "Africa" },
    { name: "Ghana", abbr: "GHA", code: "gh", continent: "Africa" },
    { name: "Cameroon", abbr: "CMR", code: "cm", continent: "Africa" },
    { name: "Ivory Coast", abbr: "CIV", code: "ci", continent: "Africa" },
    { name: "Tunisia", abbr: "TUN", code: "tn", continent: "Africa" },
    { name: "Saudi Arabia", abbr: "KSA", code: "sa", continent: "Asia" },
    { name: "Qatar", abbr: "QAT", code: "qa", continent: "Asia" },
    { name: "UAE", abbr: "UAE", code: "ae", continent: "Asia" },
    { name: "China", abbr: "CHN", code: "cn", continent: "Asia" },
    { name: "India", abbr: "IND", code: "in", continent: "Asia" },
    { name: "Peru", abbr: "PER", code: "pe", continent: "South America" },
    { name: "Chile", abbr: "CHI", code: "cl", continent: "South America" },
    { name: "Ecuador", abbr: "ECU", code: "ec", continent: "South America" },
    { name: "Venezuela", abbr: "VEN", code: "ve", continent: "South America" },
    { name: "Paraguay", abbr: "PAR", code: "py", continent: "South America" },
    { name: "Bolivia", abbr: "BOL", code: "bo", continent: "South America" },
    { name: "New Zealand", abbr: "NZL", code: "nz", continent: "Oceania" },
    { name: "Costa Rica", abbr: "CRC", code: "cr", continent: "North America" },
    { name: "Panama", abbr: "PAN", code: "pa", continent: "North America" },
    { name: "Jamaica", abbr: "JAM", code: "jm", continent: "North America" }
];

export const SPONSOR_TYPES = ['shirt', 'stadium', 'tv', 'digital'];

export function getSponsorTypeName(type) {
    const names = {
        'shirt': '👕 Shirt Sponsor',
        'stadium': '🏟️ Stadium Rights',
        'tv': '📺 Broadcasting Rights',
        'digital': '📱 Digital Partnership'
    };
    return names[type] || type;
}

export const RANDOM_EVENTS = [
    { title: "Training Ground Upgrade", message: "Local council funded new facilities. Morale up!", effect: { conditionAll: 15 }, type: "positive" },
    { title: "Viral Sensation", message: "Team video went viral. Merchandise sales spiked!", effect: { budget: 250000 }, type: "positive" },
    { title: "Food Poisoning", message: "Bad lasagna at the team hotel. Energy levels drop.", effect: { energyAll: -20 }, type: "negative" },
    { title: "Tax Audit", message: "Unexpected tax bill from the federation.", effect: { budget: -150000 }, type: "negative" }
];

export const TRAINING_CONFIG = {
    'physical': { cost: 50000, strengthGain: 1, energyCost: 20 },
    'tactical': { cost: 75000, strengthGain: 2, energyCost: 15 },
    'intensive': { cost: 120000, strengthGain: 3, energyCost: 35 }
};
