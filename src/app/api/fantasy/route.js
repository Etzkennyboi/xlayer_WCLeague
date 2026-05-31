import { NextResponse } from 'next/server';

const RAPID_API_KEY = process.env.RAPID_API_KEY || 'e9cc5043dfmsh497d559c44d5bd4p1f6f7ajsn090a62d49229';
const RAPID_API_HOST = 'free-api-live-football-data.p.rapidapi.com';

const headers = {
  'x-rapidapi-key': RAPID_API_KEY,
  'x-rapidapi-host': RAPID_API_HOST,
  'Content-Type': 'application/json'
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  try {
    if (action === 'search_players') {
      const search = searchParams.get('search');
      if (!search) return NextResponse.json({ error: 'Search term required' }, { status: 400 });

      const response = await fetch(`https://${RAPID_API_HOST}/football-players-search?search=${encodeURIComponent(search)}`, { headers });
      const data = await response.json();
      return NextResponse.json(data);
    }

    if (action === 'check_lock') {
      const now = new Date();
      const hours = now.getUTCHours();
      const minutes = now.getUTCMinutes();
      
      const currentTimeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      const isLocked = currentTimeStr >= '11:59' && currentTimeStr < '23:59';
      
      let nextChangeAt;
      if (isLocked) {
         nextChangeAt = '11:59 PM UTC';
      } else {
         nextChangeAt = '11:59 AM UTC';
      }
      
      return NextResponse.json({ locked: isLocked, nextChangeAt });
    }
    
    if (action === 'calculate_points') {
      const playersJson = searchParams.get('players');
      if (!playersJson) return NextResponse.json({ error: 'players required' }, { status: 400 });
      const players = JSON.parse(playersJson);
      
      const results = players.map(p => {
         const isGkOrDef = p.position === 'GK' || p.position === 'DEF';
         const goals = Math.floor(Math.random() * 2);
         const assists = Math.floor(Math.random() * 2);
         const yellows = Math.random() > 0.8 ? 1 : 0;
         const reds = Math.random() > 0.95 ? 1 : 0;
         
         let cleanSheetBonus = 0;
         if (isGkOrDef) {
           const conceded = Math.floor(Math.random() * 4);
           if (conceded === 0) cleanSheetBonus = 6;
           else if (conceded === 1) cleanSheetBonus = 3;
           else if (conceded === 2) cleanSheetBonus = 1;
           else cleanSheetBonus = 0;
         }
         
         const totalPoints = (goals * 6) + (assists * 4) - (yellows * 1) - (reds * 3) + cleanSheetBonus;
         
         return {
           playerId: p.id,
           goals,
           assists,
           yellows,
           reds,
           cleanSheetBonus,
           totalPoints: Math.max(0, totalPoints) // ensure positive points for demo
         };
      });
      
      return NextResponse.json(results);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('Fantasy API Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
