import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';

const BADGE_TYPES = [
    { id: 0, name: 'First Victory', icon: '⚽', desc: 'Win your first match', rarity: 'common' },
    { id: 1, name: 'Dominant Force', icon: '🔥', desc: '5-match win streak', rarity: 'rare' },
    { id: 2, name: 'Oracle Master', icon: '🔮', desc: '3 correct predictions in a row', rarity: 'rare' },
    { id: 3, name: 'Big Spender', icon: '💎', desc: 'Place a bet of €50,000+', rarity: 'rare' },
    { id: 4, name: 'Unbeaten Run', icon: '🛡️', desc: '10 matches without a loss', rarity: 'legendary' },
    { id: 5, name: 'Top of the Table', icon: '👑', desc: 'Reach #1 in the league', rarity: 'legendary' },
    { id: 6, name: 'Season Veteran', icon: '📅', desc: 'Complete 20 matchdays', rarity: 'common' },
    { id: 7, name: 'Collector', icon: '🎖️', desc: 'Mint 5 other badges', rarity: 'legendary' },
    { id: 8, name: 'PK Novice', icon: '🎯', desc: 'Win 1 Penalty Shootout', rarity: 'common' },
    { id: 9, name: 'PK Veteran', icon: '🏅', desc: 'Win 5 Penalty Shootouts', rarity: 'rare' },
    { id: 10, name: 'PK Legend', icon: '🏆', desc: 'Win 10 Penalty Shootouts', rarity: 'legendary' },
];

export default function Collection() {
    const { state } = useGame();

    const getBadgeStyle = (rarity) => {
        if (rarity === 'common') return 'from-gray-500/20 to-gray-900/40 border-gray-500/50 shadow-[0_0_15px_rgba(156,163,175,0.2)]';
        if (rarity === 'rare') return 'from-neonBlue/20 to-purple-900/40 border-neonBlue/50 shadow-[0_0_15px_rgba(0,255,255,0.2)]';
        return 'from-neonGold/20 to-orange-900/40 border-neonGold/80 shadow-[0_0_30px_rgba(255,215,0,0.4)]';
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header>
                <h1 className="text-3xl font-heading font-black flex items-center gap-3">
                    <span className="text-neonGold text-4xl">🏆</span> MY COLLECTION
                </h1>
                <p className="text-gray-400">You have earned {state.nftBadges.length} of {BADGE_TYPES.length} available badges.</p>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {BADGE_TYPES.map((badgeDef) => {
                    const earnedBadge = state.nftBadges.find(b => b.type === badgeDef.id);
                    const isLocked = !earnedBadge;

                    return (
                        <motion.div
                            key={badgeDef.id}
                            whileHover={!isLocked ? { scale: 1.05 } : {}}
                            className={`relative rounded-3xl p-6 border flex flex-col items-center text-center overflow-hidden transition-all duration-300 ${isLocked ? 'bg-black/60 border-white/5 opacity-50 grayscale' : `bg-gradient-to-br ${getBadgeStyle(badgeDef.rarity)} cursor-pointer`}`}
                        >
                            {!isLocked && badgeDef.rarity === 'legendary' && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                            )}

                            <div className="text-6xl mb-4 drop-shadow-2xl">{isLocked ? '🔒' : badgeDef.icon}</div>
                            
                            <h3 className="font-bold text-lg mb-1 font-heading">{badgeDef.name}</h3>
                            <p className="text-xs text-gray-400 mb-4 h-8">{badgeDef.desc}</p>
                            
                            <div className={`mt-auto text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isLocked ? 'bg-white/10 text-gray-500' : 'bg-black/50 text-white border border-white/20'}`}>
                                {isLocked ? 'LOCKED' : 'MINTED'}
                            </div>

                            {/* Tooltip detail area (simulated by hover expansion in a real app, simplified here) */}
                            {earnedBadge && (
                                <div className="absolute inset-0 bg-black/90 backdrop-blur opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                    <div className="text-3xl mb-2">{badgeDef.icon}</div>
                                    <div className="text-xs text-neonGold font-bold mb-2">Earned: {earnedBadge.date}</div>
                                    <div className="text-[10px] text-gray-400 text-center">{earnedBadge.info}</div>
                                    <div className="mt-3 text-[9px] text-neonBlue bg-neonBlue/10 px-2 py-1 rounded w-full truncate">
                                        TX: 0x{((earnedBadge.type + 1) * 123456789).toString(16).slice(0, 8)}... on X Layer
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
