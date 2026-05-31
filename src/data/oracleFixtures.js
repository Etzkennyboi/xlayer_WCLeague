// Mock API response simulating real-world international fixtures fetched from RapidAPI
export const fetchRealWorldFixtures = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
        {
            id: 'wc-qual-001',
            homeTeam: 'Brazil',
            homeCode: 'BR',
            awayTeam: 'Argentina',
            awayCode: 'AR',
            odds: { home: '2.10', draw: '3.40', away: '3.10' },
            status: 'upcoming'
        },
        {
            id: 'wc-qual-002',
            homeTeam: 'England',
            homeCode: 'GB-ENG',
            awayTeam: 'France',
            awayCode: 'FR',
            odds: { home: '2.80', draw: '3.20', away: '2.50' },
            status: 'upcoming'
        },
        {
            id: 'wc-qual-003',
            homeTeam: 'Portugal',
            homeCode: 'PT',
            awayTeam: 'Spain',
            awayCode: 'ES',
            odds: { home: '2.90', draw: '3.10', away: '2.60' },
            status: 'upcoming'
        },
        {
            id: 'wc-qual-004',
            homeTeam: 'Germany',
            homeCode: 'DE',
            awayTeam: 'Italy',
            awayCode: 'IT',
            odds: { home: '2.30', draw: '3.30', away: '3.00' },
            status: 'upcoming'
        }
    ];
};
