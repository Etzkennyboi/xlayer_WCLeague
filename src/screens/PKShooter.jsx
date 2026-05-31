import { useEffect, useRef, useState, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { PKShootoutEngine } from '../engine/PKShootoutEngine';
import { useWeb3 } from '../web3/useWeb3';

// Helper to map keys to text for AI
const mapKeyToDirection = (key) => {
    switch (key) {
        case 65: return "top-left";
        case 83: return "top-right";
        case 90: return "bottom-left";
        case 88: return "bottom-right";
        default: return "unknown";
    }
};

const mapDirectionToQuadrant = (dir) => {
    switch (dir) {
        case "top-left": return 1;
        case "top-right": return 2;
        case "bottom-left": return 3;
        case "bottom-right": return 4;
        default: return null;
    }
};

export default function PKShooter() {
    const canvasRef = useRef(null);
    const engineRef = useRef(null);
    const { dispatch } = useGame();
    const { wallet, connectWallet } = useWeb3();

    const [gameState, setGameState] = useState('pre'); // pre, playing, post
    const [result, setResult] = useState(null);
    const [scoreboard, setScoreboard] = useState([]);
    const [mode, setMode] = useState('practice'); // 'practice' | 'real'
    const [cooldownLeft, setCooldownLeft] = useState(null);
    
    const [payoutStatus, setPayoutStatus] = useState(null); // 'processing', 'done', 'error'
    const [txHash, setTxHash] = useState('');
    const [commentary, setCommentary] = useState('');
    const [isFetchingPrediction, setIsFetchingPrediction] = useState(false);

    // Track user's shot directions for the adaptive AI
    const shotHistoryRef = useRef([]);

    const fetchDivePrediction = useCallback(async (history) => {
        if (mode !== 'real') return;
        setIsFetchingPrediction(true);
        try {
            const res = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'predict_dive', data: { history } })
            });
            const data = await res.json();
            if (data.prediction && engineRef.current) {
                const quad = mapDirectionToQuadrant(data.prediction);
                if (quad) engineRef.current.setNextDivePrediction(quad);
            }
        } catch (err) {
            console.error("AI Prediction Error", err);
        }
        setIsFetchingPrediction(false);
    }, [mode]);

    const handleGameEnd = useCallback(async (gameResult) => {
        setResult(gameResult);
        dispatch({ type: 'PK_GAME_END', payload: gameResult });

        if (mode === 'real') {
            setGameState('payout');
            setPayoutStatus('processing');
            setCommentary('DeepSeek is analyzing the match...');

            // 1. Generate Commentary
            const commentaryPromise = fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'generate_commentary',
                    data: {
                        history: engineRef.current.scoresArr,
                        score: gameResult.score,
                        won: gameResult.won
                    }
                })
            }).then(r => r.json());

            // 2. Process Payout (only if won)
            let payoutPromise = Promise.resolve({ success: false, txHash: null });
            if (gameResult.won) {
                // Instantly record a local cooldown check
                if (wallet?.address) {
                    const localCooldownKey = `pk_cooldown_${wallet.address.toLowerCase()}`;
                    localStorage.setItem(localCooldownKey, Date.now().toString());
                }

                payoutPromise = fetch('/api/pk-payout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'payout', userAddress: wallet?.address })
                }).then(r => r.json());
            }

            try {
                const [aiRes, payoutRes] = await Promise.all([commentaryPromise, payoutPromise]);
                if (aiRes.commentary) setCommentary(aiRes.commentary);
                
                if (gameResult.won) {
                    if (payoutRes.success) {
                        setTxHash(payoutRes.txHash);
                        setPayoutStatus('done');
                    } else {
                        setPayoutStatus('error');
                    }
                } else {
                    setPayoutStatus('done'); // Done, no payout
                }
            } catch (err) {
                console.error(err);
                setPayoutStatus('error');
            }
            
            setGameState('post');
        } else {
            setGameState('post');
        }
    }, [dispatch, mode, wallet?.address]);

    const handleScoreboard = useCallback((scores) => {
        setScoreboard(scores);
    }, []);

    // Create engine once on mount
    useEffect(() => {
        if (!canvasRef.current) return;

        engineRef.current = new PKShootoutEngine(
            canvasRef.current,
            handleGameEnd,
            handleScoreboard
        );

        // Override shootBall to record history & fetch next prediction
        const originalShoot = engineRef.current.shootBall.bind(engineRef.current);
        engineRef.current.shootBall = (key) => {
            originalShoot(key);
            const dir = mapKeyToDirection(key);
            if (dir !== "unknown") {
                shotHistoryRef.current.push(dir);
                // Fetch prediction for the NEXT shot
                if (shotHistoryRef.current.length < 5) {
                    fetchDivePrediction(shotHistoryRef.current);
                }
            }
        };

        return () => {
            if (engineRef.current) {
                engineRef.current.stop();
                engineRef.current = null;
            }
        };
    }, [handleGameEnd, handleScoreboard, fetchDivePrediction]);

    const startGame = async () => {
        if (mode === 'real') {
            if (!wallet?.connected) {
                await connectWallet();
                if (!wallet?.connected) return; // Still not connected
            }
            
            // Check local storage cooldown first (secondary DB protection)
            const localCooldownKey = `pk_cooldown_${wallet.address.toLowerCase()}`;
            const localLastPlay = localStorage.getItem(localCooldownKey);
            const now = Date.now();
            const COOLDOWN_MS = 24 * 60 * 60 * 1000;
            
            if (localLastPlay) {
                const elapsed = now - parseInt(localLastPlay);
                if (elapsed < COOLDOWN_MS) {
                    const timeLeft = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
                    setCooldownLeft(timeLeft);
                    return;
                }
            }
            
            // Check cooldown on backend
            try {
                const res = await fetch('/api/pk-payout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'check', userAddress: wallet.address })
                });
                const data = await res.json();
                if (data.cooldownActive) {
                    setCooldownLeft(data.timeLeftSeconds);
                    // Sync localstorage with backend remaining cooldown
                    localStorage.setItem(localCooldownKey, (Date.now() - (COOLDOWN_MS - data.timeLeftSeconds * 1000)).toString());
                    return;
                }
            } catch (err) {
                console.error(err);
            }
        }

        shotHistoryRef.current = [];
        setGameState('playing');
        setResult(null);
        setScoreboard([]);
        setTxHash('');
        setCooldownLeft(null);

        if (engineRef.current) {
            engineRef.current.start();
            // Fetch prediction for the very first shot based on empty history
            if (mode === 'real') fetchDivePrediction([]);
        }
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    };

    return (
        <div className="w-full h-full relative overflow-hidden bg-black rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {/* Scoreboard */}
            {gameState === 'playing' && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex gap-4 p-4 bg-black/50 backdrop-blur-md rounded-full border border-white/20">
                    {[0,1,2,3,4].map(i => (
                        <div key={i} className={`w-10 h-10 rounded-full border-4 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-colors duration-300 ${
                            scoreboard[i] === 'goal'
                                ? 'bg-neonGreen border-white shadow-[0_0_15px_rgba(0,255,0,0.5)]'
                                : scoreboard[i] === 'save'
                                    ? 'bg-red-500 border-white shadow-[0_0_15px_rgba(255,0,0,0.5)]'
                                    : 'bg-transparent border-white/30'
                        }`} />
                    ))}
                </div>
            )}

            {/* Canvas */}
            <div className="w-full h-full flex items-center justify-center"
                 style={{ backgroundImage: 'url(/pk-shooter/images/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <canvas
                    ref={canvasRef}
                    width="1275"
                    height="735"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    tabIndex={0}
                />
            </div>

            {/* Pre-game overlay */}
            {gameState === 'pre' && (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center text-white p-8 z-50">
                    <h2 className="text-5xl font-heading font-black text-neonGold mb-6 drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                        PK SHOOTOUT
                    </h2>

                    {/* Mode Toggle */}
                    <div className="flex bg-white/10 p-1 rounded-full mb-6 border border-white/20 relative overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        <button 
                            onClick={() => setMode('practice')}
                            className={`px-8 py-3 rounded-full font-bold transition-colors z-10 ${mode === 'practice' ? 'text-black bg-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Practice
                        </button>
                        <button 
                            onClick={() => setMode('real')}
                            className={`px-8 py-3 rounded-full font-bold transition-colors z-10 flex items-center gap-2 ${mode === 'real' ? 'text-black bg-neonGreen shadow-[0_0_20px_rgba(0,255,0,0.4)]' : 'text-gray-400 hover:text-white'}`}
                        >
                            Real Stakes
                            <span className="bg-black/20 text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider">Win 1 USDT</span>
                        </button>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6 max-w-md text-center backdrop-blur-md">
                        {mode === 'real' ? (
                            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                                Face off against an <span className="text-neonGreen font-bold">Adaptive AI</span> that learns your shots.<br/>
                                Score <span className="text-neonGreen font-bold">3+ out of 5</span> to win 1 USDT.<br/>
                                <span className="text-xs text-gray-400 italic">One attempt per 24 hours.</span>
                            </p>
                        ) : (
                            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                                Practice your shots against a random keeper.<br/>
                                Score <span className="text-neonGreen font-bold">3+ out of 5</span> to win!
                            </p>
                        )}
                        <div className="grid grid-cols-2 gap-4 my-6">
                            <div className="bg-black/40 rounded-xl p-3 border border-white/10"><kbd className="text-neonGold font-mono font-bold text-2xl">A</kbd><p className="text-xs text-gray-400 mt-1">Top Left</p></div>
                            <div className="bg-black/40 rounded-xl p-3 border border-white/10"><kbd className="text-neonGold font-mono font-bold text-2xl">S</kbd><p className="text-xs text-gray-400 mt-1">Top Right</p></div>
                            <div className="bg-black/40 rounded-xl p-3 border border-white/10"><kbd className="text-neonGold font-mono font-bold text-2xl">Z</kbd><p className="text-xs text-gray-400 mt-1">Bottom Left</p></div>
                            <div className="bg-black/40 rounded-xl p-3 border border-white/10"><kbd className="text-neonGold font-mono font-bold text-2xl">X</kbd><p className="text-xs text-gray-400 mt-1">Bottom Right</p></div>
                        </div>
                    </div>

                    {cooldownLeft !== null ? (
                        <div className="text-center p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                            <p className="text-red-400 font-bold mb-1">Cooldown Active</p>
                            <p className="text-white font-mono text-xl">{formatTime(cooldownLeft)}</p>
                        </div>
                    ) : (
                        <button
                            onClick={startGame}
                            className="px-16 py-6 bg-neonGold text-black text-2xl font-black rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,215,0,0.5)] active:scale-95"
                        >
                            {mode === 'real' && !wallet?.connected ? 'CONNECT WALLET' : 'START SHOOTOUT'}
                        </button>
                    )}
                </div>
            )}

            {/* Payout Processing / AI Commentary Screen */}
            {gameState === 'payout' && (
                <div className="absolute inset-0 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center text-white p-12 z-50">
                    <h2 className="text-4xl font-black mb-8 text-neonBlue animate-pulse">
                        {payoutStatus === 'processing' ? 'PROCESSING MATCH...' : 'MATCH COMPLETE'}
                    </h2>
                    
                    <div className="bg-black/50 border border-white/10 rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative">
                        <div className="absolute -top-3 -left-3 bg-neonBlue text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                            DeepSeek Commentary
                        </div>
                        <p className="text-lg text-gray-300 italic leading-relaxed min-h-[100px]">
                            "{commentary}"
                        </p>
                    </div>
                </div>
            )}

            {/* Post-game overlay */}
            {gameState === 'post' && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center text-white p-8 z-50">
                    <h2 className="text-8xl font-black mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        {result?.won ? (
                            <span className="text-neonGreen drop-shadow-[0_0_30px_rgba(0,255,0,0.5)]">YOU WIN!</span>
                        ) : (
                            <span className="text-red-500 drop-shadow-[0_0_30px_rgba(255,0,0,0.5)]">YOU LOSE!</span>
                        )}
                    </h2>
                    <p className="text-4xl font-heading font-bold text-white mb-2">
                        {result?.score} / 5
                    </p>

                    {mode === 'real' && payoutStatus === 'done' && txHash && (
                        <div className="my-6 p-4 bg-neonGreen/10 border border-neonGreen/30 rounded-xl text-center max-w-md">
                            <p className="text-neonGreen font-bold mb-2">Payout Successful!</p>
                            <p className="text-xs text-gray-400 break-all">{txHash}</p>
                        </div>
                    )}

                    {mode === 'real' && commentary && (
                        <div className="my-6 p-6 bg-white/5 border border-white/10 rounded-xl max-w-2xl w-full text-center">
                             <p className="text-sm text-neonBlue font-bold mb-2 uppercase tracking-widest">DeepSeek Commentary</p>
                             <p className="text-gray-300 italic">"{commentary}"</p>
                        </div>
                    )}

                    <p className="text-xl text-gray-400 mb-8 mt-4 text-center max-w-lg">
                        {result?.won
                            ? 'Incredible performance under pressure.'
                            : 'The AI Goalkeeper read you like a book!'}
                    </p>

                    <button
                        onClick={() => setGameState('pre')}
                        className="px-16 py-6 bg-neonBlue text-black text-2xl font-black rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,255,255,0.5)] active:scale-95"
                    >
                        BACK TO MENU
                    </button>
                </div>
            )}
        </div>
    );
}
