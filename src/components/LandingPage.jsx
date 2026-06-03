import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../web3/useWeb3';

export default function LandingPage({ onEnter }) {
    const { connectWallet } = useWeb3();
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = async () => {
        setIsConnecting(true);
        const res = await connectWallet();
        setIsConnecting(false);
        if (res.success) {
            onEnter();
        } else {
            alert("Connection Failed: " + res.error);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-spaceBlack text-white">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neonBlue/20 via-spaceBlack/90 to-spaceBlack"></div>
                {/* Abstract grid lines for tech/web3 feel */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            {/* Live Stats Ticker */}
            <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-0 left-0 w-full bg-glassWhite border-b border-white/10 backdrop-blur-md py-3 px-6 flex justify-between items-center z-20 text-sm text-gray-400 font-body"
            >
                <div className="flex gap-8">
                    <span><span className="text-neonGreen">●</span> LIVE ON X LAYER</span>
                    <span>TVL: <strong className="text-white">$1.2M OKB</strong></span>
                    <span>MATCHES: <strong className="text-white">15,420</strong></span>
                </div>
                <div>X Cup Global League v2.0</div>
            </motion.div>

            {/* Hero Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                <motion.h1 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-heading font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
                >
                    OWN THE PITCH.<br/>
                    <span className="text-neonGold" style={{ textShadow: '0 0 20px #FFD700' }}>PREDICT THE FUTURE.</span>
                </motion.h1>

                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl md:text-2xl text-gray-400 font-body mb-12 max-w-2xl mx-auto"
                >
                    The world's first AAA Web3 Football Manager. Scout real players, build your ultimate squad, and bet on live fixtures.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <button 
                        onClick={handleConnect}
                        disabled={isConnecting}
                        className="group relative px-8 py-4 bg-neonGold text-black font-heading font-bold text-xl rounded-full overflow-hidden transition-transform hover:scale-105 disabled:opacity-75 disabled:scale-100 shadow-[0_0_20px_rgba(255,215,0,0.3)] disabled:shadow-none"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative flex items-center gap-2">
                            {isConnecting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                    CONNECTING...
                                </>
                            ) : (
                                <>
                                    CONNECT WALLET TO ENTER
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </>
                            )}
                        </span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
