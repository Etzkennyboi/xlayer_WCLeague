import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'fantasy_leaderboard.json');

export async function GET() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return NextResponse.json([]);
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    const leaderboard = JSON.parse(data);
    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
    return NextResponse.json(leaderboard);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { walletAddress, username, flagCode, totalPoints, squad } = body;

    let leaderboard = [];
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf8');
      leaderboard = JSON.parse(data);
    }

    const existingIndex = leaderboard.findIndex(entry => entry.walletAddress === walletAddress);
    
    if (existingIndex >= 0) {
      leaderboard[existingIndex] = { ...leaderboard[existingIndex], username, flagCode, totalPoints, squad };
    } else {
      leaderboard.push({ walletAddress, username, flagCode, totalPoints, squad });
    }

    fs.writeFileSync(DB_PATH, JSON.stringify(leaderboard, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
