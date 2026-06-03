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
    const { wallet, connectWallet, sendBetToTreasury } = useWeb3();

    const [gameState, setGameState] = useState('pre'); // pre, playing, post
    const [result, setResult] = useState(null);
    const [scoreboard, setScoreboard] = useState([]);
    const [mode, setMode] = useState('practice'); // 'practice' | 'real'
    const [cooldownLeft, setCooldownLeft] = useState(null);
    
    const [payoutStatus, setPayoutStatus] = useState(null); // 'processing', 'done', 'error'
    const [txHash, setTxHash] = useState('');
    const [commentary, setCommentary] = useState('');
    const [isFetchingPrediction, setIsFetchingPrediction] = useState(false);
    const [betAmountOkb, setBetAmountOkb] = useState('0'); // Minimum bet in OKB
    const [betTxHash, setBetTxHash] = useState(null);

    // Custom Staking Modal states
    const [showStakeModal, setShowStakeModal] = useState(false);
    const [inputBetAmount, setInputBetAmount] = useState('0');
    const [minBetAmount, setMinBetAmount] = useState('0');
    const [isConfirmingBet, setIsConfirmingBet] = useState(false);
    const [currentOkbPrice, setCurrentOkbPrice] = useState(84.0);

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

                payoutPromise = fetch('/api/pk-play', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        action: 'payout', 
                        userAddress: wallet?.address,
                        betAmount: betAmountOkb,
                        txHash: betTxHash,
                        score: gameResult.score,
                        won: gameResult.won
                    })
                }).then(r => r.json());
            }

            try {
                const [aiRes, payoutRes] = await Promise.all([commentaryPromise, payoutPromise]);
                if (aiRes.commentary) setCommentary(aiRes.commentary);
                
                if (gameResult.won) {
                    if (payoutRes.success && payoutRes.payoutTxHash) {
                        setTxHash(payoutRes.payoutTxHash);
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
    }, [dispatch, mode, wallet?.address, betAmountOkb, betTxHash]);

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

    const handlePlaceBetAndPlay = async () => {
        if (parseFloat(inputBetAmount) < parseFloat(minBetAmount)) {
            alert(`Minimum bet is ${minBetAmount} OKB ($1 equivalent)`);
            return;
        }
        if (parseFloat(inputBetAmount) > parseFloat(wallet.balance)) {
            alert("Insufficient wallet balance");
            return;
        }
        
        setIsConfirmingBet(true);
        try {
            const txResult = await sendBetToTreasury(inputBetAmount);
            if (txResult.success) {
                setBetTxHash(txResult.txHash);
                setBetAmountOkb(inputBetAmount);
                setShowStakeModal(false);
                
                // Start shootout
                shotHistoryRef.current = [];
                setGameState('playing');
                setResult(null);
                setScoreboard([]);
                setTxHash('');
                setCooldownLeft(null);
                if (engineRef.current) {
                    engineRef.current.start();
                    // Fetch prediction for the very first shot based on empty history
                    fetchDivePrediction([]);
                }
            } else {
                alert("Transaction failed or was rejected. Cannot start shootout.");
            }
        } catch (e) {
            console.error("Failed to send transaction", e);
            alert("Transaction failed: " + (e.message || String(e)));
        } finally {
            setIsConfirmingBet(false);
        }
    };

    const startGame = async () => {
        if (mode === 'real') {
            let activeAddress = wallet?.address;

            if (!wallet?.connected) {
                const res = await connectWallet();
                if (!res.success || !res.address) return; // Connection failed or rejected
                activeAddress = res.address;
            }
            
            // Check local storage cooldown first (secondary DB protection)
            const localCooldownKey = `pk_cooldown_${activeAddress.toLowerCase()}`;
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
            
            // Fetch OKB price to calculate min bet ($1)
            let price = 84.0;
            try {
                const res = await fetch('/api/okb-price');
                const data = await res.json();
                if (data.success) {
                    price = data.price;
                }
            } catch (err) {
                console.error("Failed to fetch OKB price", err);
            }

            setCurrentOkbPrice(price);
            const minBet = (1 / price).toFixed(4);
            setMinBetAmount(minBet);
            setInputBetAmount(minBet);
            setShowStakeModal(true);
            return; // Modal is now open, wait for user input
        }

        shotHistoryRef.current = [];
        setGameState('playing');
        setResult(null);
        setScoreboard([]);
        setTxHash('');
        setCooldownLeft(null);

        if (engineRef.current) {
            engineRef.current.start();
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
                            <span className="bg-black/20 text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider">Win 2x OKB</span>
                        </button>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6 max-w-md text-center backdrop-blur-md">
                        {mode === 'real' ? (
                            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                                Face off against an <span className="text-neonGreen font-bold">Adaptive AI</span> that learns your shots.<br/>
                                Score <span className="text-neonGreen font-bold">3+ out of 5</span> to win 2x your OKB bet!<br/>
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

            {/* Custom Staking Modal Overlay */}
            {showStakeModal && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 z-[60]">
                    <div className="bg-white/5 border-2 border-neonGreen/30 rounded-3xl p-8 max-w-md w-full relative overflow-hidden shadow-[0_0_30px_rgba(0,255,0,0.15)] animate-in fade-in zoom-in duration-300">
                        <div className="absolute top-0 left-0 w-full h-1 bg-neonGreen"></div>
                        <h3 className="text-3xl font-heading font-black text-neonGreen mb-2 uppercase tracking-widest text-center" style={{ textShadow: '0 0 15px rgba(0,255,0,0.3)' }}>PLACE STAKE</h3>
                        <p className="text-sm text-gray-400 text-center uppercase tracking-widest font-bold mb-6">Real Stakes Shootout</p>
                        
                        <div className="space-y-6">
                            {/* Bet Input */}
                            <div className="bg-black/55 p-5 rounded-2xl border border-white/5">
                                <div className="flex justify-between items-center mb-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    <span>Bet Amount</span>
                                    <span>Balance: {parseFloat(wallet.balance).toFixed(4)} OKB</span>
                                </div>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        min={minBetAmount} 
                                        step="0.01"
                                        value={inputBetAmount}
                                        onChange={(e) => setInputBetAmount(e.target.value)}
                                        disabled={isConfirmingBet}
                                        className="bg-spaceBlack border border-white/10 rounded-xl px-4 py-3 text-2xl text-white font-black outline-none focus:border-neonGreen transition-colors w-full pr-16"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-500 text-lg">OKB</span>
                                </div>
                                <div className="mt-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider flex justify-between">
                                    <span>Min Bet: {minBetAmount} OKB ($1.00)</span>
                                    <span>1 OKB = ${currentOkbPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Potential Winnings */}
                            <div className="bg-neonGreen/10 border border-neonGreen/30 rounded-2xl p-5 text-center">
                                <div className="text-xs text-neonGreen font-bold uppercase tracking-widest mb-1">Potential Winnings</div>
                                <div className="text-3xl font-black text-white" style={{ textShadow: '0 0 15px rgba(255,255,255,0.2)' }}>
                                    {(!isNaN(parseFloat(inputBetAmount)) ? (parseFloat(inputBetAmount) * 2).toFixed(4) : '0.0000')} OKB
                                </div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">2.00x Payout Multiplier</div>
                            </div>

                            {/* Insufficient Funds Warning */}
                            {parseFloat(inputBetAmount) > parseFloat(wallet.balance) && (
                                <div className="text-center text-red-500 font-bold text-xs uppercase tracking-widest animate-pulse">
                                    ⚠️ Insufficient OKB Balance
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-4">
                                <button 
                                    onClick={handlePlaceBetAndPlay}
                                    disabled={isConfirmingBet || parseFloat(inputBetAmount) > parseFloat(wallet.balance) || isNaN(parseFloat(inputBetAmount)) || parseFloat(inputBetAmount) <= 0}
                                    className="flex-1 py-4 bg-neonGreen text-black font-black text-base rounded-xl hover:scale-102 transition-all active:scale-98 disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_20px_rgba(0,255,0,0.2)] flex items-center justify-center gap-2"
                                >
                                    {isConfirmingBet ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                            STAKING...
                                        </>
                                    ) : (
                                        'STAKE & PLAY'
                                    )}
                                </button>
                                <button 
                                    onClick={() => setShowStakeModal(false)}
                                    disabled={isConfirmingBet}
                                    className="px-6 py-4 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white rounded-xl transition-all disabled:opacity-50 disabled:pointer-events-none uppercase tracking-widest text-xs font-bold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
