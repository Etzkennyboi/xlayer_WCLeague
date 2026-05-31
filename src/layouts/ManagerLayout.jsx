import { useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { useWeb3 } from '../web3/useWeb3';
import Flag from '../components/Flag';

const NAV_ITEMS = [
    { id: 'dashboard', label: 'DASHBOARD', icon: '⚽' },
    { id: 'matchday', label: 'MATCHDAY', icon: '🏟️' },
    { id: 'collection', label: 'COLLECTION', icon: '🏆' },
    { id: 'pk-shooter', label: 'PK SHOOTOUT', icon: '🎯' },
    { id: 'fantasy', label: 'FANTASY', icon: '⭐' }
];

export default function ManagerLayout({ children, activeTab, setActiveTab }) {
    const { state } = useGame();
    const { wallet, connectWallet } = useWeb3();

    const team = state.teams[state.playerTeamIndex];
    
    const playerRank = useMemo(() => {
        if (!state.teams || state.teams.length === 0 || !team) return 0;
        return [...state.teams].sort((a, b) => b.stats.points - a.stats.points).findIndex(t => t.id === team.id) + 1;
    }, [state.teams, team]);

    if (!team) return null;

    return (
        <div className="flex h-screen bg-spaceBlack text-white overflow-hidden relative font-body">
            {/* Stadium Pitch Background Grid */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
            {/* Floodlight Glow */}
            <div className="absolute top-0 inset-x-0 h-96 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neonGreen/15 via-spaceBlack/50 to-transparent pointer-events-none"></div>
            
            {/* Sidebar */}
            <aside className="hidden md:flex w-64 glass-panel-heavy flex-col relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.5)] border-r border-white/5">
                {/* Brand / Top */}
                <div className="p-6 border-b border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 bg-neonGold rounded-xl flex items-center justify-center font-black text-black text-xl shadow-[0_0_15px_rgba(255,215,0,0.5)]">X</div>
                    <div>
                        <div className="font-heading font-black tracking-widest text-sm text-neonGold">X-CUP</div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Manager</div>
                    </div>
                </div>

                {/* Team Info */}
                <div className="p-6 border-b border-white/5 flex flex-col items-center">
                    <Flag code={team.code} size="w-16 h-16" className="mb-3" />
                    <div className="font-bold text-lg">{team.name}</div>
                    <div className="text-xs text-gray-400">Rank: #{playerRank}</div>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 py-6 px-4 space-y-2">
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                                activeTab === item.id 
                                ? 'glass-panel text-white border border-white/10 glass-border-glow' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <span className={activeTab === item.id ? 'text-neonGold' : 'grayscale opacity-70'}>{item.icon}</span>
                            <span className="text-sm tracking-wider drop-shadow-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Footer Status */}
                <div className="p-6 border-t border-white/10 space-y-4">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Season {state.season}</span>
                        <span>Round {state.round}</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative z-10 overflow-hidden pb-16 md:pb-0">
                {/* Global Top Bar */}
                <header className="h-20 border-b border-white/5 glass-panel-heavy flex items-center justify-between px-4 md:px-8 z-20">
                    <div className="flex items-center gap-6">
                        {/* Demo Budget */}
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest drop-shadow">Demo Budget</span>
                            <span className="font-black text-neonGreen text-xl drop-shadow-md">€{(state.budget / 1000000).toFixed(2)}M</span>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        {/* Real USDT0 Balance */}
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 drop-shadow">
                                USDT0 Balance <span className="w-1.5 h-1.5 rounded-full bg-neonBlue animate-pulse drop-shadow-[0_0_5px_cyan]"></span>
                            </span>
                            <span className="font-black text-white text-xl drop-shadow-md">{wallet.connected ? parseFloat(wallet.balance).toFixed(2) : '0.00'}</span>
                        </div>
                    </div>
                    
                    <div>
                        {wallet.connected ? (
                            <div className="flex items-center gap-3 bg-neonBlue/10 border border-neonBlue/30 px-4 py-2 rounded-full glass-panel">
                                <div className="w-2 h-2 rounded-full bg-neonBlue shadow-[0_0_8px_cyan]"></div>
                                <span className="font-mono text-sm text-neonBlue drop-shadow-md">{wallet.address.slice(0,6)}...{wallet.address.slice(-4)}</span>
                            </div>
                        ) : (
                            <button 
                                onClick={connectWallet}
                                className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-4 md:px-6 py-2 rounded-full hover:bg-white/20 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] text-xs md:text-sm"
                            >
                                CONNECT WALLET
                            </button>
                        )}
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-4 md:p-8 overflow-y-auto hide-scrollbar">
                    {children}
                </div>
            </main>

            {/* Bottom Mobile Navigation Bar */}
            <div className="md:hidden fixed bottom-0 inset-x-0 h-16 glass-panel-heavy border-t border-white/10 flex items-center justify-around z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.5)]">
                {NAV_ITEMS.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex-1 flex flex-col items-center justify-center h-full transition-all ${
                            activeTab === item.id 
                            ? 'text-neonGold bg-white/5 border-t-2 border-neonGold' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-[9px] font-bold tracking-wider mt-0.5">{item.label.split(' ')[0]}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
