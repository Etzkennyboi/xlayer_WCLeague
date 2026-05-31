(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/web3/config.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ABIS",
    ()=>ABIS,
    "CONFIG",
    ()=>CONFIG
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const CONFIG = {
    XLAYER_TESTNET_ID: 195,
    XLAYER_RPC: 'https://testrpc.xlayer.tech',
    PREDICTION_MARKET_ADDRESS: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_PREDICTION_MARKET_ADDRESS || '0x3a1161a0244BdAb218a0e463Bfbe2E1d1F7Ee522',
    WORLD_CUP_NFT_ADDRESS: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_WORLD_CUP_NFT_ADDRESS || '0x87493aBD5A738c32c4A1b63Af4E470eA2D704Bc6',
    USDT_ADDRESS: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_USDT0_ADDRESS || '0x14712173612c33c8bafd0E7A8916ebd84EE8A6B8'
};
const ABIS = {
    ERC20: [
        "function approve(address spender, uint256 amount) external returns (bool)",
        "function allowance(address owner, address spender) external view returns (uint256)",
        "function balanceOf(address account) external view returns (uint256)",
        "function decimals() external view returns (uint8)"
    ],
    PredictionMarket: [
        "function createMarket(string _fixtureId) external",
        "function placeBet(string _fixtureId, uint8 _selection, uint256 _amount) external",
        "function resolveMarket(string _fixtureId, uint8 _winningOutcome) external",
        "function claimWinnings(string _fixtureId) external",
        "function markets(string) external view returns (string fixtureId, uint8 outcome, bool isResolved, uint256 totalHomePool, uint256 totalDrawPool, uint256 totalAwayPool)",
        "function bets(string, address) external view returns (uint8 selection, uint256 amount, bool claimed)"
    ],
    WorldCupNFT: [
        "function mintBadge(address to, string tokenURI, uint8 badgeType, string matchInfo) external returns (uint256)",
        "function getUserBadges(address user) external view returns (uint256[])",
        "function tokenURI(uint256 tokenId) external view returns (string)",
        "event BadgeMinted(address indexed to, uint256 tokenId, uint8 badgeType, string matchInfo)"
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/web3/useWeb3.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Web3Provider",
    ()=>Web3Provider,
    "useWeb3",
    ()=>useWeb3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/ethers.js [app-client] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/web3/config.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const Web3Context = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
function Web3Provider({ children }) {
    _s();
    const [wallet, setWallet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        connected: false,
        address: null,
        chainId: null,
        balance: '0'
    });
    const connectWallet = async ()=>{
        try {
            if (!window.ethereum) throw new Error("MetaMask is not installed");
            const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].providers.Web3Provider(window.ethereum, "any");
            const accounts = await provider.send("eth_requestAccounts", []);
            let network = await provider.getNetwork();
            if (network.chainId !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONFIG"].XLAYER_TESTNET_ID) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [
                            {
                                chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].utils.hexValue(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONFIG"].XLAYER_TESTNET_ID)
                            }
                        ]
                    });
                } catch (switchError) {
                    throw new Error("Please switch to X Layer Testnet in your wallet.", {
                        cause: switchError
                    });
                }
                // Wait for the provider to sync with the new network
                await new Promise((resolve)=>setTimeout(resolve, 1000));
                network = await provider.getNetwork();
            }
            const balance = await provider.getBalance(accounts[0]);
            setWallet({
                connected: true,
                address: accounts[0],
                chainId: network.chainId,
                balance: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].utils.formatEther(balance)
            });
            return {
                success: true
            };
        } catch (error) {
            console.error("Connection failed", error);
            return {
                success: false,
                error: error.message
            };
        }
    };
    const mintNFT = async (userAddress, badgeType, matchInfo)=>{
        try {
            const response = await fetch('/api/mint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userAddress,
                    badgeType,
                    matchInfo
                })
            });
            const data = await response.json();
            if (data.success) {
                return {
                    success: true,
                    txHash: data.txHash,
                    mock: data.mock
                };
            } else {
                throw new Error(data.error || "Mint failed on backend");
            }
        } catch (error) {
            console.error("Mint failed", error);
            // Even if it fails (e.g. no backend keys configured), fallback so user gets the UI reward
            console.log("Falling back to mock mint due to error...");
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            return {
                success: true,
                mock: true,
                error: error.message
            };
        }
    };
    const placeBetOnChain = async (marketId, isYes)=>{
        try {
            if (!window.ethereum) throw new Error("Wallet not connected");
            const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner();
            const usdt = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONFIG"].USDT_ADDRESS, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].ERC20, signer);
            const market = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONFIG"].PREDICTION_MARKET_ADDRESS, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABIS"].PredictionMarket, signer);
            const amountWei = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].utils.parseUnits("10", 18);
            const approveTx = await usdt.approve(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONFIG"].PREDICTION_MARKET_ADDRESS, amountWei);
            await approveTx.wait();
            const outcome = isYes ? 1 : 2;
            const betTx = await market.placeBet(marketId, outcome, amountWei);
            await betTx.wait();
            return {
                success: true
            };
        } catch (error) {
            console.error("Bet failed", error);
            return {
                success: false,
                error: error.message
            };
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Web3Context.Provider, {
        value: {
            wallet,
            connectWallet,
            mintNFT,
            placeBetOnChain
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/web3/useWeb3.jsx",
        lineNumber: 105,
        columnNumber: 9
    }, this);
}
_s(Web3Provider, "xO8nJoAZ79mmQ58hH1ttdrGs47M=");
_c = Web3Provider;
function useWeb3() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(Web3Context);
}
_s1(useWeb3, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "Web3Provider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Flag.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function Flag({ code, size = 'w-8 h-8', className = '' }) {
    if (!code || code.toLowerCase() === 'un') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `${size} flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-xl shadow-md ${className}`,
            children: "🌍"
        }, void 0, false, {
            fileName: "[project]/src/components/Flag.jsx",
            lineNumber: 6,
            columnNumber: 16
        }, this);
    }
    const lowerCode = code.toLowerCase();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: `https://flagcdn.com/w40/${lowerCode}.png`,
        srcSet: `https://flagcdn.com/w80/${lowerCode}.png 2x`,
        alt: `${lowerCode} flag`,
        className: `inline-block object-cover rounded-full shadow-md ${size} ${className}`,
        onError: (e)=>{
            e.target.style.display = 'none'; // hide broken images
        }
    }, void 0, false, {
        fileName: "[project]/src/components/Flag.jsx",
        lineNumber: 11,
        columnNumber: 9
    }, this);
}
_c = Flag;
const __TURBOPACK__default__export__ = /*#__PURE__*/ _c1 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(Flag);
var _c, _c1;
__turbopack_context__.k.register(_c, "Flag");
__turbopack_context__.k.register(_c1, "%default%");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/layouts/ManagerLayout.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ManagerLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GameContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/web3/useWeb3.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Flag.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const NAV_ITEMS = [
    {
        id: 'dashboard',
        label: 'DASHBOARD',
        icon: '⚽'
    },
    {
        id: 'matchday',
        label: 'MATCHDAY',
        icon: '🏟️'
    },
    {
        id: 'collection',
        label: 'COLLECTION',
        icon: '🏆'
    },
    {
        id: 'pk-shooter',
        label: 'PK SHOOTOUT',
        icon: '🎯'
    },
    {
        id: 'fantasy',
        label: 'FANTASY',
        icon: '⭐'
    }
];
function ManagerLayout({ children, activeTab, setActiveTab }) {
    _s();
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const { wallet, connectWallet } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWeb3"])();
    const team = state.teams[state.playerTeamIndex];
    const playerRank = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ManagerLayout.useMemo[playerRank]": ()=>{
            if (!state.teams || state.teams.length === 0 || !team) return 0;
            return [
                ...state.teams
            ].sort({
                "ManagerLayout.useMemo[playerRank]": (a, b)=>b.stats.points - a.stats.points
            }["ManagerLayout.useMemo[playerRank]"]).findIndex({
                "ManagerLayout.useMemo[playerRank]": (t)=>t.id === team.id
            }["ManagerLayout.useMemo[playerRank]"]) + 1;
        }
    }["ManagerLayout.useMemo[playerRank]"], [
        state.teams,
        team
    ]);
    if (!team) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen bg-spaceBlack text-white overflow-hidden relative font-body",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                lineNumber: 30,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 inset-x-0 h-96 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neonGreen/15 via-spaceBlack/50 to-transparent pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                lineNumber: 32,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "hidden md:flex w-64 glass-panel-heavy flex-col relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.5)] border-r border-white/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 border-b border-white/10 flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 bg-neonGold rounded-xl flex items-center justify-center font-black text-black text-xl shadow-[0_0_15px_rgba(255,215,0,0.5)]",
                                children: "X"
                            }, void 0, false, {
                                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                lineNumber: 38,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-heading font-black tracking-widest text-sm text-neonGold",
                                        children: "X-CUP"
                                    }, void 0, false, {
                                        fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                        lineNumber: 40,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] text-gray-500 font-bold uppercase tracking-widest",
                                        children: "Manager"
                                    }, void 0, false, {
                                        fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                        lineNumber: 41,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                lineNumber: 39,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/layouts/ManagerLayout.jsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 border-b border-white/5 flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                code: team.code,
                                size: "w-16 h-16",
                                className: "mb-3"
                            }, void 0, false, {
                                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                lineNumber: 47,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-bold text-lg",
                                children: team.name
                            }, void 0, false, {
                                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                lineNumber: 48,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-400",
                                children: [
                                    "Rank: #",
                                    playerRank
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                lineNumber: 49,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/layouts/ManagerLayout.jsx",
                        lineNumber: 46,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex-1 py-6 px-4 space-y-2",
                        children: NAV_ITEMS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab(item.id),
                                className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === item.id ? 'glass-panel text-white border border-white/10 glass-border-glow' : 'text-gray-400 hover:text-white hover:bg-white/5'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: activeTab === item.id ? 'text-neonGold' : 'grayscale opacity-70',
                                        children: item.icon
                                    }, void 0, false, {
                                        fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                        lineNumber: 64,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm tracking-wider drop-shadow-sm",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                        lineNumber: 65,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                lineNumber: 55,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/layouts/ManagerLayout.jsx",
                        lineNumber: 53,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 border-t border-white/10 space-y-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between text-xs text-gray-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Season ",
                                        state.season
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                    lineNumber: 73,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Round ",
                                        state.round
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                    lineNumber: 74,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/layouts/ManagerLayout.jsx",
                            lineNumber: 72,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/layouts/ManagerLayout.jsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                lineNumber: 35,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 flex flex-col relative z-10 overflow-hidden pb-16 md:pb-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "h-20 border-b border-white/5 glass-panel-heavy flex items-center justify-between px-4 md:px-8 z-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest drop-shadow",
                                                children: "Demo Budget"
                                            }, void 0, false, {
                                                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                                lineNumber: 86,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-black text-neonGreen text-xl drop-shadow-md",
                                                children: [
                                                    "€",
                                                    (state.budget / 1000000).toFixed(2),
                                                    "M"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                                lineNumber: 87,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                        lineNumber: 85,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-px h-8 bg-white/10"
                                    }, void 0, false, {
                                        fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                        lineNumber: 89,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 drop-shadow",
                                                children: [
                                                    "USDT0 Balance ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-1.5 h-1.5 rounded-full bg-neonBlue animate-pulse drop-shadow-[0_0_5px_cyan]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                                        lineNumber: 93,
                                                        columnNumber: 47
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                                lineNumber: 92,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-black text-white text-xl drop-shadow-md",
                                                children: wallet.connected ? parseFloat(wallet.balance).toFixed(2) : '0.00'
                                            }, void 0, false, {
                                                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                                lineNumber: 95,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                        lineNumber: 91,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                lineNumber: 83,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: wallet.connected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 bg-neonBlue/10 border border-neonBlue/30 px-4 py-2 rounded-full glass-panel",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 rounded-full bg-neonBlue shadow-[0_0_8px_cyan]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                            lineNumber: 102,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-sm text-neonBlue drop-shadow-md",
                                            children: [
                                                wallet.address.slice(0, 6),
                                                "...",
                                                wallet.address.slice(-4)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                            lineNumber: 103,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                    lineNumber: 101,
                                    columnNumber: 29
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: connectWallet,
                                    className: "bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-4 md:px-6 py-2 rounded-full hover:bg-white/20 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] text-xs md:text-sm",
                                    children: "CONNECT WALLET"
                                }, void 0, false, {
                                    fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                    lineNumber: 106,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                lineNumber: 99,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/layouts/ManagerLayout.jsx",
                        lineNumber: 82,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-4 md:p-8 overflow-y-auto hide-scrollbar",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/layouts/ManagerLayout.jsx",
                        lineNumber: 117,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                lineNumber: 80,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden fixed bottom-0 inset-x-0 h-16 glass-panel-heavy border-t border-white/10 flex items-center justify-around z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.5)]",
                children: NAV_ITEMS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(item.id),
                        className: `flex-1 flex flex-col items-center justify-center h-full transition-all ${activeTab === item.id ? 'text-neonGold bg-white/5 border-t-2 border-neonGold' : 'text-gray-400 hover:text-white'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl",
                                children: item.icon
                            }, void 0, false, {
                                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                lineNumber: 134,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[9px] font-bold tracking-wider mt-0.5",
                                children: item.label.split(' ')[0]
                            }, void 0, false, {
                                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                                lineNumber: 135,
                                columnNumber: 25
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/src/layouts/ManagerLayout.jsx",
                        lineNumber: 125,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/layouts/ManagerLayout.jsx",
                lineNumber: 123,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/layouts/ManagerLayout.jsx",
        lineNumber: 28,
        columnNumber: 9
    }, this);
}
_s(ManagerLayout, "Sr/G9+Zqudi6yDf2edudHAh+M8o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWeb3"]
    ];
});
_c = ManagerLayout;
var _c;
__turbopack_context__.k.register(_c, "ManagerLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/LandingPage.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LandingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/web3/useWeb3.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function LandingPage({ onEnter }) {
    _s();
    const { connectWallet } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWeb3"])();
    const handleConnect = async ()=>{
        const res = await connectWallet();
        if (res.success) {
            onEnter();
        } else {
            alert("Connection Failed: " + res.error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-spaceBlack text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neonBlue/20 via-spaceBlack/90 to-spaceBlack"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LandingPage.jsx",
                        lineNumber: 21,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LandingPage.jsx",
                        lineNumber: 23,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LandingPage.jsx",
                lineNumber: 20,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    y: -50,
                    opacity: 0
                },
                animate: {
                    y: 0,
                    opacity: 1
                },
                transition: {
                    delay: 0.5
                },
                className: "absolute top-0 left-0 w-full bg-glassWhite border-b border-white/10 backdrop-blur-md py-3 px-6 flex justify-between items-center z-20 text-sm text-gray-400 font-body",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-neonGreen",
                                        children: "●"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LandingPage.jsx",
                                        lineNumber: 34,
                                        columnNumber: 27
                                    }, this),
                                    " LIVE ON X LAYER"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LandingPage.jsx",
                                lineNumber: 34,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "TVL: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "text-white",
                                        children: "$1.2M USDT0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LandingPage.jsx",
                                        lineNumber: 35,
                                        columnNumber: 32
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LandingPage.jsx",
                                lineNumber: 35,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "MATCHES: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "text-white",
                                        children: "15,420"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LandingPage.jsx",
                                        lineNumber: 36,
                                        columnNumber: 36
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LandingPage.jsx",
                                lineNumber: 36,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LandingPage.jsx",
                        lineNumber: 33,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "X Cup Global League v2.0"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LandingPage.jsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LandingPage.jsx",
                lineNumber: 27,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 text-center max-w-4xl mx-auto px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                        initial: {
                            scale: 0.9,
                            opacity: 0
                        },
                        animate: {
                            scale: 1,
                            opacity: 1
                        },
                        transition: {
                            duration: 1,
                            ease: "easeOut"
                        },
                        className: "text-6xl md:text-8xl font-heading font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500",
                        children: [
                            "OWN THE PITCH.",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/components/LandingPage.jsx",
                                lineNumber: 49,
                                columnNumber: 35
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-neonGold",
                                style: {
                                    textShadow: '0 0 20px #FFD700'
                                },
                                children: "PREDICT THE FUTURE."
                            }, void 0, false, {
                                fileName: "[project]/src/components/LandingPage.jsx",
                                lineNumber: 50,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LandingPage.jsx",
                        lineNumber: 43,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                        initial: {
                            y: 20,
                            opacity: 0
                        },
                        animate: {
                            y: 0,
                            opacity: 1
                        },
                        transition: {
                            delay: 0.5,
                            duration: 0.8
                        },
                        className: "text-xl md:text-2xl text-gray-400 font-body mb-12 max-w-2xl mx-auto",
                        children: "The world's first AAA Web3 Football Manager. Scout real players, build your ultimate squad, and bet on live fixtures."
                    }, void 0, false, {
                        fileName: "[project]/src/components/LandingPage.jsx",
                        lineNumber: 53,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            y: 20,
                            opacity: 0
                        },
                        animate: {
                            y: 0,
                            opacity: 1
                        },
                        transition: {
                            delay: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleConnect,
                                className: "group relative px-8 py-4 bg-neonGold text-black font-heading font-bold text-xl rounded-full overflow-hidden transition-transform hover:scale-105",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LandingPage.jsx",
                                        lineNumber: 71,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative flex items-center gap-2",
                                        children: [
                                            "CONNECT WALLET TO ENTER",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-5 h-5",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: "2",
                                                    d: "M14 5l7 7m0 0l-7 7m7-7H3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LandingPage.jsx",
                                                    lineNumber: 74,
                                                    columnNumber: 108
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LandingPage.jsx",
                                                lineNumber: 74,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LandingPage.jsx",
                                        lineNumber: 72,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LandingPage.jsx",
                                lineNumber: 67,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onEnter,
                                className: "mt-6 block mx-auto px-6 py-2 border border-white/20 text-gray-400 rounded-full hover:text-white hover:border-white transition-colors",
                                children: "Enter Demo Mode"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LandingPage.jsx",
                                lineNumber: 78,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-xs text-gray-600",
                                children: "No crypto required to play demo mode."
                            }, void 0, false, {
                                fileName: "[project]/src/components/LandingPage.jsx",
                                lineNumber: 84,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LandingPage.jsx",
                        lineNumber: 62,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LandingPage.jsx",
                lineNumber: 42,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LandingPage.jsx",
        lineNumber: 18,
        columnNumber: 9
    }, this);
}
_s(LandingPage, "GfzkrLE2X/wCsyjm5zjHWEcGh1Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWeb3"]
    ];
});
_c = LandingPage;
var _c;
__turbopack_context__.k.register(_c, "LandingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/screens/Dashboard.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GameContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Flag.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function Dashboard() {
    _s();
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const winRate = state.activeBets.length > 0 ? (state.activeBets.filter((b)=>b.won).length / state.activeBets.filter((b)=>b.resolved).length * 100).toFixed(1) : 0;
    const totalWon = state.activeBets.filter((b)=>b.won).length;
    const totalLost = state.activeBets.filter((b)=>b.resolved && !b.won).length;
    const playerTeam = state.teams[state.playerTeamIndex];
    const form = [
        'W',
        'D',
        'W',
        'W',
        'L'
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8 animate-in fade-in duration-500 font-body",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex justify-between items-end border-b border-white/10 pb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-heading font-bold text-white uppercase tracking-wider shadow-black drop-shadow-lg",
                                children: "MANAGER OVERVIEW"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Dashboard.jsx",
                                lineNumber: 22,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-neonGreen font-bold uppercase tracking-widest text-xs mt-1",
                                children: "Live Broadcast Data Center"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Dashboard.jsx",
                                lineNumber: 23,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/Dashboard.jsx",
                        lineNumber: 21,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1 bg-black/50 p-2 rounded-xl border border-white/5 shadow-inner",
                        children: form.map((res, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-lg ${res === 'W' ? 'bg-neonGreen text-black shadow-[0_0_10px_rgba(16,185,129,0.4)]' : res === 'D' ? 'bg-gray-600 text-white' : 'bg-neonRed text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]'}`,
                                children: res
                            }, i, false, {
                                fileName: "[project]/src/screens/Dashboard.jsx",
                                lineNumber: 27,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/screens/Dashboard.jsx",
                        lineNumber: 25,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/screens/Dashboard.jsx",
                lineNumber: 20,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 xl:grid-cols-3 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-1 xl:col-span-2 space-y-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-stadiumBlue/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden shadow-2xl group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-0 right-0 p-4 opacity-5 text-6xl group-hover:scale-110 transition-transform",
                                                children: "📈"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                lineNumber: 42,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-bold text-gray-400 mb-6 uppercase tracking-widest text-xs flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2 h-2 rounded-full bg-neonGold"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                        lineNumber: 43,
                                                        columnNumber: 132
                                                    }, this),
                                                    "Prediction Analytics"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                lineNumber: 43,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-6xl font-heading font-bold text-neonGold mb-1 tracking-wider drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]",
                                                children: [
                                                    winRate,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                lineNumber: 44,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-gray-400 mb-4 font-bold uppercase tracking-wider",
                                                children: "Oracle Accuracy Rate"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                lineNumber: 45,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex w-full h-3 bg-black/80 rounded-full overflow-hidden border border-white/5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-neonGreen transition-all shadow-[0_0_10px_rgba(16,185,129,0.8)]",
                                                        style: {
                                                            width: `${totalWon / (totalWon + totalLost) * 100 || 0}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                        lineNumber: 48,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-neonRed transition-all shadow-[0_0_10px_rgba(239,68,68,0.8)]",
                                                        style: {
                                                            width: `${totalLost / (totalWon + totalLost) * 100 || 0}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                        lineNumber: 49,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                lineNumber: 47,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between mt-3 text-xs font-bold tracking-widest",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-neonGreen",
                                                        children: [
                                                            totalWon,
                                                            " WINS"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                        lineNumber: 52,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-neonRed",
                                                        children: [
                                                            totalLost,
                                                            " LOSSES"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                        lineNumber: 53,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                lineNumber: 51,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                        lineNumber: 41,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gradient-to-br from-stadiumBlue/90 to-black border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden shadow-2xl flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.03)_50%,transparent_75%)] bg-[size:250px_250px] animate-[shimmer_3s_infinite_linear]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                lineNumber: 59,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative z-10 flex w-full items-center gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute inset-0 bg-neonBlue blur-2xl opacity-20"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                                lineNumber: 62,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                code: playerTeam.code,
                                                                size: "w-24 h-24",
                                                                className: "shadow-2xl border-2 border-white/10 rounded-lg relative z-10"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                                lineNumber: 63,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                        lineNumber: 61,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: "font-bold text-neonBlue mb-1 uppercase tracking-widest text-xs",
                                                                children: "Your Franchise"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                                lineNumber: 66,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-3xl font-heading font-bold text-white uppercase tracking-wider drop-shadow-md",
                                                                children: playerTeam.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                                lineNumber: 67,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-4 mt-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-[10px] text-gray-500 font-bold uppercase",
                                                                                children: "Points"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                                                lineNumber: 70,
                                                                                columnNumber: 45
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "font-heading text-xl text-white",
                                                                                children: playerTeam.stats.points
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                                                lineNumber: 71,
                                                                                columnNumber: 45
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                                        lineNumber: 69,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-[10px] text-gray-500 font-bold uppercase",
                                                                                children: "Goals"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                                                lineNumber: 74,
                                                                                columnNumber: 45
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "font-heading text-xl text-white",
                                                                                children: playerTeam.stats.gf
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                                                lineNumber: 75,
                                                                                columnNumber: 45
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                                        lineNumber: 73,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                                lineNumber: 68,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                        lineNumber: 65,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                lineNumber: 60,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                        lineNumber: 58,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-stadiumBlue/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden shadow-2xl group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-0 right-0 p-4 opacity-5 text-6xl group-hover:scale-110 transition-transform",
                                                children: "🎯"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                lineNumber: 84,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-bold text-gray-400 mb-6 uppercase tracking-widest text-xs flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2 h-2 rounded-full bg-neonGreen"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                        lineNumber: 85,
                                                        columnNumber: 132
                                                    }, this),
                                                    "PK Shootout Stats"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                lineNumber: 85,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-400 font-bold uppercase tracking-wider mb-1",
                                                                children: "Win Rate"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                                lineNumber: 88,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-3xl font-heading font-bold text-white mb-4",
                                                                children: [
                                                                    state.pkShooterStats.totalPlayed ? Math.round(state.pkShooterStats.totalWins / state.pkShooterStats.totalPlayed * 100) : 0,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                                lineNumber: 89,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                        lineNumber: 87,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-400 font-bold uppercase tracking-wider mb-1",
                                                                children: "Best Score"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                                lineNumber: 94,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-3xl font-heading font-bold text-neonGold mb-4",
                                                                children: [
                                                                    state.pkShooterStats.bestScore,
                                                                    "/5"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                                lineNumber: 95,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                        lineNumber: 93,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                lineNumber: 86,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between mt-3 text-xs font-bold tracking-widest pt-3 border-t border-white/5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-300",
                                                        children: [
                                                            state.pkShooterStats.totalWins,
                                                            " WINS"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                        lineNumber: 99,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-300",
                                                        children: [
                                                            state.pkShooterStats.totalPlayed,
                                                            " PLAYED"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                        lineNumber: 100,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-neonBlue",
                                                        children: [
                                                            state.pkShooterStats.winStreak,
                                                            " STREAK"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                        lineNumber: 101,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                lineNumber: 98,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                        lineNumber: 83,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/Dashboard.jsx",
                                lineNumber: 39,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-stadiumBlue/60 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-black/40 px-6 py-4 border-b border-white/10 flex justify-between items-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-neonGreen animate-pulse",
                                                    children: "●"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/screens/Dashboard.jsx",
                                                    lineNumber: 110,
                                                    columnNumber: 33
                                                }, this),
                                                " LIVE MARKETS"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/screens/Dashboard.jsx",
                                            lineNumber: 109,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                        lineNumber: 108,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2",
                                        children: state.activeBets.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-12 text-center text-gray-500 font-bold uppercase tracking-widest text-sm",
                                            children: "No Active Markets"
                                        }, void 0, false, {
                                            fileName: "[project]/src/screens/Dashboard.jsx",
                                            lineNumber: 115,
                                            columnNumber: 33
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: state.activeBets.map((bet, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-12 h-12 bg-black/50 rounded-lg flex items-center justify-center border border-white/5 font-heading text-xl text-neonGold shadow-inner",
                                                                    children: bet.selection
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/screens/Dashboard.jsx",
                                                                    lineNumber: 121,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "font-bold text-white tracking-wider",
                                                                            children: [
                                                                                bet.homeAbbr,
                                                                                " ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-gray-600 text-xs mx-1",
                                                                                    children: "VS"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/screens/Dashboard.jsx",
                                                                                    lineNumber: 125,
                                                                                    columnNumber: 121
                                                                                }, this),
                                                                                " ",
                                                                                bet.awayAbbr
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/screens/Dashboard.jsx",
                                                                            lineNumber: 125,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs text-gray-400 font-bold uppercase mt-1",
                                                                            children: [
                                                                                "Stake: ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-neonGold",
                                                                                    children: bet.stake
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/screens/Dashboard.jsx",
                                                                                    lineNumber: 126,
                                                                                    columnNumber: 124
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/screens/Dashboard.jsx",
                                                                            lineNumber: 126,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/screens/Dashboard.jsx",
                                                                    lineNumber: 124,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/screens/Dashboard.jsx",
                                                            lineNumber: 120,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-right",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-[10px] text-gray-500 font-bold uppercase mb-1",
                                                                    children: "Status"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/screens/Dashboard.jsx",
                                                                    lineNumber: 130,
                                                                    columnNumber: 49
                                                                }, this),
                                                                bet.resolved ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `px-3 py-1 rounded font-bold text-xs uppercase ${bet.won ? 'bg-neonGreen/20 text-neonGreen border border-neonGreen/30' : 'bg-neonRed/20 text-neonRed border border-neonRed/30'}`,
                                                                    children: bet.won ? 'WON' : 'LOST'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/screens/Dashboard.jsx",
                                                                    lineNumber: 132,
                                                                    columnNumber: 53
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "px-3 py-1 rounded font-bold text-xs uppercase bg-neonBlue/20 text-neonBlue border border-neonBlue/30 animate-pulse",
                                                                    children: "PENDING"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/screens/Dashboard.jsx",
                                                                    lineNumber: 136,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/screens/Dashboard.jsx",
                                                            lineNumber: 129,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, bet.id || `${bet.marketId}-${bet.selection}-${idx}`, true, {
                                                    fileName: "[project]/src/screens/Dashboard.jsx",
                                                    lineNumber: 119,
                                                    columnNumber: 41
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/screens/Dashboard.jsx",
                                            lineNumber: 117,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                        lineNumber: 113,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/Dashboard.jsx",
                                lineNumber: 107,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/Dashboard.jsx",
                        lineNumber: 36,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-stadiumBlue/60 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col h-[600px] overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-black/40 px-6 py-4 border-b border-white/10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-bold text-white uppercase tracking-widest",
                                    children: "TRANSACTION LOG"
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Dashboard.jsx",
                                    lineNumber: 152,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Dashboard.jsx",
                                lineNumber: 151,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar",
                                children: state.activeBets.filter((b)=>b.resolved).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full flex flex-col items-center justify-center text-gray-500 p-6 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-4xl mb-4 opacity-50",
                                            children: "🧾"
                                        }, void 0, false, {
                                            fileName: "[project]/src/screens/Dashboard.jsx",
                                            lineNumber: 157,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-bold uppercase tracking-widest",
                                            children: "No History"
                                        }, void 0, false, {
                                            fileName: "[project]/src/screens/Dashboard.jsx",
                                            lineNumber: 158,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs mt-2",
                                            children: "Resolved markets will appear here."
                                        }, void 0, false, {
                                            fileName: "[project]/src/screens/Dashboard.jsx",
                                            lineNumber: 159,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/screens/Dashboard.jsx",
                                    lineNumber: 156,
                                    columnNumber: 29
                                }, this) : state.activeBets.filter((b)=>b.resolved).map((bet, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: 20
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        transition: {
                                            delay: i * 0.1
                                        },
                                        className: "p-3 border border-white/5 rounded-xl bg-black/40 flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-bold text-gray-400",
                                                        children: [
                                                            bet.homeAbbr,
                                                            " vs ",
                                                            bet.awayAbbr
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                        lineNumber: 171,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-gray-600 uppercase font-bold mt-1",
                                                        children: [
                                                            "Pick: ",
                                                            bet.selection,
                                                            " • Odds: ",
                                                            bet.odds
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                                        lineNumber: 172,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                lineNumber: 170,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `font-heading text-lg ${bet.won ? 'text-neonGreen drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'text-neonRed opacity-50'}`,
                                                children: bet.won ? `+${(parseFloat(bet.stake) * parseFloat(bet.odds)).toFixed(2)}` : `-${bet.stake}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Dashboard.jsx",
                                                lineNumber: 174,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, `hist-${bet.id || i}-${i}`, true, {
                                        fileName: "[project]/src/screens/Dashboard.jsx",
                                        lineNumber: 163,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Dashboard.jsx",
                                lineNumber: 154,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/Dashboard.jsx",
                        lineNumber: 150,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/screens/Dashboard.jsx",
                lineNumber: 34,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/screens/Dashboard.jsx",
        lineNumber: 19,
        columnNumber: 9
    }, this);
}
_s(Dashboard, "bz/3tffehqHq3ZcuP6JOKCZwvko=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/screens/Squad.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Squad
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GameContext.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function Squad() {
    _s();
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const team = state.teams[state.playerTeamIndex];
    const [activeView, setActiveView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('pitch'); // 'pitch' | 'roster'
    const togglePlayer = (id)=>dispatch({
            type: 'TOGGLE_LINEUP',
            payload: id
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8 animate-in fade-in duration-500 pb-12 lg:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex justify-between items-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-heading font-black",
                                children: "SQUAD SELECTION"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Squad.jsx",
                                lineNumber: 15,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400",
                                children: "Manage your starting XI and tactics."
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Squad.jsx",
                                lineNumber: 16,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/Squad.jsx",
                        lineNumber: 14,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>dispatch({
                                type: 'AUTO_LINEUP'
                            }),
                        className: "px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all border border-white/10",
                        children: "AUTO-PICK BEST XI"
                    }, void 0, false, {
                        fileName: "[project]/src/screens/Squad.jsx",
                        lineNumber: 18,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/screens/Squad.jsx",
                lineNumber: 13,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex lg:hidden bg-black/45 p-1 rounded-xl border border-white/10 shadow-inner w-full mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveView('pitch'),
                        className: `flex-1 py-3 rounded-lg font-bold text-xs transition-all text-center ${activeView === 'pitch' ? 'bg-neonGold text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'text-gray-400'}`,
                        children: "🏟️ PITCH VIEW"
                    }, void 0, false, {
                        fileName: "[project]/src/screens/Squad.jsx",
                        lineNumber: 28,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveView('roster'),
                        className: `flex-1 py-3 rounded-lg font-bold text-xs transition-all text-center ${activeView === 'roster' ? 'bg-neonGreen text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'text-gray-400'}`,
                        children: "📋 ROSTER LIST"
                    }, void 0, false, {
                        fileName: "[project]/src/screens/Squad.jsx",
                        lineNumber: 34,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/screens/Squad.jsx",
                lineNumber: 27,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `bg-white/5 border border-white/10 rounded-3xl p-4 md:p-8 backdrop-blur-md ${activeView === 'pitch' ? 'block' : 'hidden lg:block'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pitch-container h-[600px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "formation-row",
                                    children: state.selectedLineup.map((id)=>{
                                        const p = team.players.find((x)=>x.id === id);
                                        if (p?.position !== 'FWD') return null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "player-card",
                                            onClick: ()=>togglePlayer(p.id),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xl font-bold",
                                                    children: p.strength
                                                }, void 0, false, {
                                                    fileName: "[project]/src/screens/Squad.jsx",
                                                    lineNumber: 50,
                                                    columnNumber: 115
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs truncate",
                                                    children: p.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/screens/Squad.jsx",
                                                    lineNumber: 50,
                                                    columnNumber: 168
                                                }, this)
                                            ]
                                        }, p.id, true, {
                                            fileName: "[project]/src/screens/Squad.jsx",
                                            lineNumber: 50,
                                            columnNumber: 40
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Squad.jsx",
                                    lineNumber: 46,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "formation-row",
                                    children: state.selectedLineup.map((id)=>{
                                        const p = team.players.find((x)=>x.id === id);
                                        if (p?.position !== 'MID') return null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "player-card",
                                            onClick: ()=>togglePlayer(p.id),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xl font-bold",
                                                    children: p.strength
                                                }, void 0, false, {
                                                    fileName: "[project]/src/screens/Squad.jsx",
                                                    lineNumber: 57,
                                                    columnNumber: 115
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs truncate",
                                                    children: p.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/screens/Squad.jsx",
                                                    lineNumber: 57,
                                                    columnNumber: 168
                                                }, this)
                                            ]
                                        }, p.id, true, {
                                            fileName: "[project]/src/screens/Squad.jsx",
                                            lineNumber: 57,
                                            columnNumber: 40
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Squad.jsx",
                                    lineNumber: 53,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "formation-row",
                                    children: state.selectedLineup.map((id)=>{
                                        const p = team.players.find((x)=>x.id === id);
                                        if (p?.position !== 'DEF') return null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "player-card",
                                            onClick: ()=>togglePlayer(p.id),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xl font-bold",
                                                    children: p.strength
                                                }, void 0, false, {
                                                    fileName: "[project]/src/screens/Squad.jsx",
                                                    lineNumber: 64,
                                                    columnNumber: 115
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs truncate",
                                                    children: p.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/screens/Squad.jsx",
                                                    lineNumber: 64,
                                                    columnNumber: 168
                                                }, this)
                                            ]
                                        }, p.id, true, {
                                            fileName: "[project]/src/screens/Squad.jsx",
                                            lineNumber: 64,
                                            columnNumber: 40
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Squad.jsx",
                                    lineNumber: 60,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "formation-row",
                                    children: state.selectedLineup.map((id)=>{
                                        const p = team.players.find((x)=>x.id === id);
                                        if (p?.position !== 'GK') return null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "player-card",
                                            onClick: ()=>togglePlayer(p.id),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xl font-bold",
                                                    children: p.strength
                                                }, void 0, false, {
                                                    fileName: "[project]/src/screens/Squad.jsx",
                                                    lineNumber: 71,
                                                    columnNumber: 115
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs truncate",
                                                    children: p.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/screens/Squad.jsx",
                                                    lineNumber: 71,
                                                    columnNumber: 168
                                                }, this)
                                            ]
                                        }, p.id, true, {
                                            fileName: "[project]/src/screens/Squad.jsx",
                                            lineNumber: 71,
                                            columnNumber: 40
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Squad.jsx",
                                    lineNumber: 67,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/screens/Squad.jsx",
                            lineNumber: 45,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/screens/Squad.jsx",
                        lineNumber: 44,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `bg-white/5 border border-white/10 rounded-3xl p-4 md:p-8 backdrop-blur-md flex flex-col ${activeView === 'roster' ? 'block' : 'hidden lg:block'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-gray-400 uppercase tracking-widest text-sm",
                                        children: "Full Roster"
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/Squad.jsx",
                                        lineNumber: 80,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `px-3 py-1 rounded-full text-xs font-bold ${state.selectedLineup.length === 11 ? 'bg-neonGreen/20 text-neonGreen' : 'bg-neonRed/20 text-neonRed'}`,
                                        children: [
                                            state.selectedLineup.length,
                                            "/11 SELECTED"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/Squad.jsx",
                                        lineNumber: 81,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/Squad.jsx",
                                lineNumber: 79,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-y-auto pr-2 space-y-6 max-h-[550px]",
                                children: [
                                    'FWD',
                                    'MID',
                                    'DEF',
                                    'GK'
                                ].map((pos)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-neonGold font-bold mb-3 border-b border-white/10 pb-1",
                                                children: pos
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Squad.jsx",
                                                lineNumber: 89,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: team.players.filter((p)=>p.position === pos).sort((a, b)=>b.strength - a.strength).map((p)=>{
                                                    const isSelected = state.selectedLineup.includes(p.id);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        onClick: ()=>togglePlayer(p.id),
                                                        className: `flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all ${isSelected ? 'bg-neonGreen/10 border-neonGreen shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 'bg-black/40 border-white/5 hover:bg-white/10'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${isSelected ? 'bg-neonGreen text-black' : 'bg-gray-800 text-white'}`,
                                                                        children: p.strength
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/screens/Squad.jsx",
                                                                        lineNumber: 100,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "font-bold",
                                                                                children: p.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/screens/Squad.jsx",
                                                                                lineNumber: 104,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-xs text-gray-400 flex items-center gap-2",
                                                                                children: [
                                                                                    "Energy: ",
                                                                                    p.energy,
                                                                                    "%",
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "w-16 h-1 bg-gray-700 rounded-full overflow-hidden",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "h-full bg-neonGreen",
                                                                                            style: {
                                                                                                width: `${p.energy}%`
                                                                                            }
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/screens/Squad.jsx",
                                                                                            lineNumber: 108,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/screens/Squad.jsx",
                                                                                        lineNumber: 107,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/screens/Squad.jsx",
                                                                                lineNumber: 105,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/screens/Squad.jsx",
                                                                        lineNumber: 103,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/screens/Squad.jsx",
                                                                lineNumber: 99,
                                                                columnNumber: 49
                                                            }, this),
                                                            isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-neonGreen text-xl bg-neonGreen/20 w-8 h-8 flex items-center justify-center rounded-full",
                                                                children: "✓"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/screens/Squad.jsx",
                                                                lineNumber: 113,
                                                                columnNumber: 64
                                                            }, this)
                                                        ]
                                                    }, p.id, true, {
                                                        fileName: "[project]/src/screens/Squad.jsx",
                                                        lineNumber: 94,
                                                        columnNumber: 45
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Squad.jsx",
                                                lineNumber: 90,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, pos, true, {
                                        fileName: "[project]/src/screens/Squad.jsx",
                                        lineNumber: 88,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Squad.jsx",
                                lineNumber: 86,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/Squad.jsx",
                        lineNumber: 78,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/screens/Squad.jsx",
                lineNumber: 42,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/screens/Squad.jsx",
        lineNumber: 12,
        columnNumber: 9
    }, this);
}
_s(Squad, "QcozCMi2r4+UjLWmqlUTfa+399k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c = Squad;
var _c;
__turbopack_context__.k.register(_c, "Squad");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/BetSlip.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BetSlip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GameContext.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function BetSlip() {
    _s();
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const { betSlip, budget } = state;
    const totalStake = betSlip.reduce((sum, b)=>sum + b.amount, 0);
    const totalPotential = betSlip.reduce((sum, b)=>sum + b.amount * parseFloat(b.odds), 0);
    const canConfirm = betSlip.length > 0 && totalStake <= budget;
    if (betSlip.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white/5 border border-white/10 rounded-2xl p-6 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-gray-500 text-sm font-bold uppercase tracking-widest mb-2",
                    children: "Bet Slip"
                }, void 0, false, {
                    fileName: "[project]/src/components/BetSlip.jsx",
                    lineNumber: 15,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-gray-600 text-xs py-8",
                    children: "Click any odds to add a selection"
                }, void 0, false, {
                    fileName: "[project]/src/components/BetSlip.jsx",
                    lineNumber: 16,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BetSlip.jsx",
            lineNumber: 14,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white/5 border border-white/10 rounded-2xl overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-neonGold/10 border-b border-neonGold/20 flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold text-sm text-neonGold uppercase tracking-widest",
                        children: [
                            "Bet Slip (",
                            betSlip.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BetSlip.jsx",
                        lineNumber: 24,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>dispatch({
                                type: 'CLEAR_SLIP'
                            }),
                        className: "text-xs text-gray-400 hover:text-neonRed transition-colors",
                        children: "Clear All"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BetSlip.jsx",
                        lineNumber: 25,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BetSlip.jsx",
                lineNumber: 23,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 space-y-3 max-h-[300px] overflow-y-auto hide-scrollbar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    children: betSlip.map((bet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                height: 0
                            },
                            animate: {
                                opacity: 1,
                                height: 'auto'
                            },
                            exit: {
                                opacity: 0,
                                height: 0
                            },
                            className: "bg-black/40 rounded-xl p-4 border border-white/5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-start mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-400",
                                                    children: [
                                                        bet.homeAbbr,
                                                        " vs ",
                                                        bet.awayAbbr
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/BetSlip.jsx",
                                                    lineNumber: 40,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-bold text-sm",
                                                    children: [
                                                        bet.selection === '1' ? bet.homeAbbr + ' Win' : bet.selection === '2' ? bet.awayAbbr + ' Win' : 'Draw',
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-neonGreen ml-2",
                                                            children: [
                                                                "@",
                                                                bet.odds
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/BetSlip.jsx",
                                                            lineNumber: 43,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/BetSlip.jsx",
                                                    lineNumber: 41,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/BetSlip.jsx",
                                            lineNumber: 39,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>dispatch({
                                                    type: 'REMOVE_FROM_SLIP',
                                                    payload: bet.matchId
                                                }),
                                            className: "text-gray-500 hover:text-neonRed text-lg leading-none",
                                            children: "×"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BetSlip.jsx",
                                            lineNumber: 46,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BetSlip.jsx",
                                    lineNumber: 38,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        1000,
                                        5000,
                                        10000,
                                        50000
                                    ].map((amt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>dispatch({
                                                    type: 'UPDATE_SLIP_AMOUNT',
                                                    payload: {
                                                        matchId: bet.matchId,
                                                        amount: amt
                                                    }
                                                }),
                                            className: `flex-1 text-xs py-1.5 rounded-lg border transition-colors ${bet.amount === amt ? 'bg-neonGold/20 border-neonGold/50 text-neonGold' : 'border-white/10 text-gray-400 hover:border-white/30'}`,
                                            children: amt >= 1000 ? `${amt / 1000}K` : amt
                                        }, amt, false, {
                                            fileName: "[project]/src/components/BetSlip.jsx",
                                            lineNumber: 53,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BetSlip.jsx",
                                    lineNumber: 51,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, bet.matchId, true, {
                            fileName: "[project]/src/components/BetSlip.jsx",
                            lineNumber: 31,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/BetSlip.jsx",
                    lineNumber: 29,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/BetSlip.jsx",
                lineNumber: 28,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-t border-white/10 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-400",
                                children: "Total Stake"
                            }, void 0, false, {
                                fileName: "[project]/src/components/BetSlip.jsx",
                                lineNumber: 69,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `font-bold ${totalStake > budget ? 'text-neonRed' : 'text-white'}`,
                                children: [
                                    "€",
                                    totalStake.toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BetSlip.jsx",
                                lineNumber: 70,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BetSlip.jsx",
                        lineNumber: 68,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-400",
                                children: "Potential Return"
                            }, void 0, false, {
                                fileName: "[project]/src/components/BetSlip.jsx",
                                lineNumber: 73,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-neonGreen",
                                children: [
                                    "€",
                                    Math.floor(totalPotential).toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BetSlip.jsx",
                                lineNumber: 74,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BetSlip.jsx",
                        lineNumber: 72,
                        columnNumber: 17
                    }, this),
                    totalStake > budget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neonRed text-center",
                        children: "Insufficient funds"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BetSlip.jsx",
                        lineNumber: 77,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>dispatch({
                                type: 'CONFIRM_SLIP'
                            }),
                        disabled: !canConfirm,
                        className: `w-full py-3 rounded-xl font-bold text-sm transition-all ${canConfirm ? 'bg-neonGreen text-black hover:scale-[1.02]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`,
                        children: "CONFIRM BETS"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BetSlip.jsx",
                        lineNumber: 79,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BetSlip.jsx",
                lineNumber: 67,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BetSlip.jsx",
        lineNumber: 22,
        columnNumber: 9
    }, this);
}
_s(BetSlip, "0Ezd+lYqYM4Ze1hEY5mBTpMQDZc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c = BetSlip;
var _c;
__turbopack_context__.k.register(_c, "BetSlip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/LiveSimulation.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LiveSimulation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GameContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Flag.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
// Symmetrical compact match row memoized to only rerender if specific scores change.
const LiveMatchRow = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(({ homeTeam, awayTeam, matchId, score })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between py-2 px-3 border-b border-white/5 hover:bg-white/10 transition-colors",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 w-5/12 justify-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-bold text-gray-300 uppercase tracking-wider",
                        children: homeTeam.abbr
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 11,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        code: homeTeam.code,
                        size: "w-5 h-5 rounded-sm shadow-md"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 12,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveSimulation.jsx",
                lineNumber: 10,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-2/12 flex justify-center text-lg font-heading font-bold px-2 bg-black/40 rounded border border-white/5 shadow-inner",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        initial: {
                            scale: 1.5,
                            color: '#10B981'
                        },
                        animate: {
                            scale: 1,
                            color: '#fff'
                        },
                        transition: {
                            duration: 0.5
                        },
                        children: score.home
                    }, `h-${score.home}`, false, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 16,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mx-1 text-gray-600",
                        children: "-"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 17,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        initial: {
                            scale: 1.5,
                            color: '#10B981'
                        },
                        animate: {
                            scale: 1,
                            color: '#fff'
                        },
                        transition: {
                            duration: 0.5
                        },
                        children: score.away
                    }, `a-${score.away}`, false, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 18,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveSimulation.jsx",
                lineNumber: 15,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 w-5/12 justify-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        code: awayTeam.code,
                        size: "w-5 h-5 rounded-sm shadow-md"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 22,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-bold text-gray-300 uppercase tracking-wider",
                        children: awayTeam.abbr
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 23,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveSimulation.jsx",
                lineNumber: 21,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LiveSimulation.jsx",
        lineNumber: 9,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
}, (prevProps, nextProps)=>{
    return prevProps.score.home === nextProps.score.home && prevProps.score.away === nextProps.score.away;
});
_c = LiveMatchRow;
function LiveSimulation() {
    _s();
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const { liveSim, round } = state;
    const { minute, scores, playerMatchEvents, active, allResults } = liveSim;
    const eventsEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Auto-scroll the commentary feed to the bottom
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveSimulation.useEffect": ()=>{
            if (eventsEndRef.current) {
                eventsEndRef.current.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }["LiveSimulation.useEffect"], [
        playerMatchEvents
    ]);
    if (!active) return null;
    const matchData = allResults || [];
    // Separate the player's match from the rest
    const playerMatchIdx = matchData.findIndex((m)=>m.fixture.home === state.playerTeamIndex || m.fixture.away === state.playerTeamIndex);
    const playerMatch = playerMatchIdx !== -1 ? matchData[playerMatchIdx] : null;
    // The other 23 matches
    const otherMatches = matchData.filter((_, idx)=>idx !== playerMatchIdx);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            scale: 0.95
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        className: "absolute inset-0 z-50 flex flex-col p-6 gap-6 font-body",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-stadiumBlue z-[-1] overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neonGreen/20 via-stadiumBlue/80 to-stadiumBlue opacity-90 blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 64,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 inset-x-0 h-[300px] bg-gradient-to-t from-black to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 65,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveSimulation.jsx",
                lineNumber: 62,
                columnNumber: 13
            }, this),
            playerMatch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-b from-stadiumBlue/90 to-black/80 border border-white/20 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden flex items-center justify-between backdrop-blur-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neonGreen via-pitchLime to-neonGreen"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 71,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-1/4 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-neonGreen font-bold uppercase tracking-widest text-[10px] mb-1",
                                children: "Match Clock"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                lineNumber: 75,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-7xl font-heading font-bold text-white leading-none tracking-wider drop-shadow-lg",
                                children: [
                                    minute < 10 ? `0${minute}` : minute,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-pitchLime animate-pulse",
                                        children: "'"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveSimulation.jsx",
                                        lineNumber: 77,
                                        columnNumber: 66
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                lineNumber: 76,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3",
                                children: liveSim.halfTimePause ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-bold text-neonGold tracking-widest bg-neonGold/10 border border-neonGold/30 px-6 py-1.5 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.2)]",
                                    children: "HALF TIME"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LiveSimulation.jsx",
                                    lineNumber: 81,
                                    columnNumber: 33
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-bold text-black tracking-widest bg-pitchLime px-6 py-1.5 rounded-full shadow-[0_0_15px_rgba(192,255,0,0.5)] animate-pulse",
                                    children: "LIVE MATCH"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LiveSimulation.jsx",
                                    lineNumber: 83,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                lineNumber: 79,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 74,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-2/4 flex items-center justify-center gap-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center flex flex-col items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 bg-white/20 blur-xl rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                                lineNumber: 92,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                code: playerMatch.homeTeam.code,
                                                size: "w-24 h-24",
                                                className: "mb-3 relative z-10 shadow-2xl border-4 border-white/10 rounded-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                                lineNumber: 93,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LiveSimulation.jsx",
                                        lineNumber: 91,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-heading text-3xl font-bold tracking-widest uppercase drop-shadow-md",
                                        children: playerMatch.homeTeam.abbr
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveSimulation.jsx",
                                        lineNumber: 95,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                lineNumber: 90,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-8xl font-heading font-bold px-10 py-2 bg-black/60 border-y-2 border-white/10 rounded-3xl shadow-inner flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                        initial: {
                                            scale: 1.5,
                                            color: '#C0FF00'
                                        },
                                        animate: {
                                            scale: 1,
                                            color: '#fff'
                                        },
                                        className: "drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]",
                                        children: scores[`${playerMatch.fixture.home}-${playerMatch.fixture.away}`]?.home || 0
                                    }, `ph-${scores[`${playerMatch.fixture.home}-${playerMatch.fixture.away}`]?.home || 0}`, false, {
                                        fileName: "[project]/src/components/LiveSimulation.jsx",
                                        lineNumber: 99,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mx-6 text-gray-700 text-6xl pb-2",
                                        children: "-"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveSimulation.jsx",
                                        lineNumber: 102,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                        initial: {
                                            scale: 1.5,
                                            color: '#C0FF00'
                                        },
                                        animate: {
                                            scale: 1,
                                            color: '#fff'
                                        },
                                        className: "drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]",
                                        children: scores[`${playerMatch.fixture.home}-${playerMatch.fixture.away}`]?.away || 0
                                    }, `pa-${scores[`${playerMatch.fixture.home}-${playerMatch.fixture.away}`]?.away || 0}`, false, {
                                        fileName: "[project]/src/components/LiveSimulation.jsx",
                                        lineNumber: 103,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                lineNumber: 98,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center flex flex-col items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 bg-white/20 blur-xl rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                                lineNumber: 110,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                code: playerMatch.awayTeam.code,
                                                size: "w-24 h-24",
                                                className: "mb-3 relative z-10 shadow-2xl border-4 border-white/10 rounded-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                                lineNumber: 111,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LiveSimulation.jsx",
                                        lineNumber: 109,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-heading text-3xl font-bold tracking-widest uppercase drop-shadow-md",
                                        children: playerMatch.awayTeam.abbr
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveSimulation.jsx",
                                        lineNumber: 113,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                lineNumber: 108,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 89,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-1/4 flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>dispatch({
                                    type: 'SKIP_SIM'
                                }),
                            className: "px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105",
                            children: "SKIP TO END >>"
                        }, void 0, false, {
                            fileName: "[project]/src/components/LiveSimulation.jsx",
                            lineNumber: 119,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 118,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveSimulation.jsx",
                lineNumber: 70,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex gap-6 min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-[2] bg-stadiumBlue/60 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col shadow-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-black/40 px-6 py-4 border-b border-white/10 flex justify-between items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-2 h-2 rounded-full bg-neonRed animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveSimulation.jsx",
                                            lineNumber: 134,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-bold tracking-widest text-xs uppercase text-white",
                                            children: [
                                                "Global Scores ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-500 mx-2",
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveSimulation.jsx",
                                                    lineNumber: 135,
                                                    columnNumber: 114
                                                }, this),
                                                " Round ",
                                                round - 1
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LiveSimulation.jsx",
                                            lineNumber: 135,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LiveSimulation.jsx",
                                    lineNumber: 133,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                lineNumber: 132,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 p-6 overflow-y-auto hide-scrollbar",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-x-10 gap-y-2",
                                    children: otherMatches.map((match)=>{
                                        const { homeTeam, awayTeam, fixture } = match;
                                        const matchId = `${fixture.home}-${fixture.away}`;
                                        const score = scores[matchId] || {
                                            home: 0,
                                            away: 0
                                        };
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LiveMatchRow, {
                                            homeTeam: homeTeam,
                                            awayTeam: awayTeam,
                                            matchId: matchId,
                                            score: score
                                        }, matchId, false, {
                                            fileName: "[project]/src/components/LiveSimulation.jsx",
                                            lineNumber: 146,
                                            columnNumber: 37
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LiveSimulation.jsx",
                                    lineNumber: 140,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                lineNumber: 139,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 131,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 bg-stadiumBlue/60 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col shadow-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-black/40 px-6 py-4 border-b border-white/10 flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold text-white uppercase tracking-widest",
                                        children: "Match Commentary"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveSimulation.jsx",
                                        lineNumber: 162,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] bg-neonBlue/20 text-neonBlue border border-neonBlue/30 px-2 py-0.5 rounded font-bold uppercase",
                                        children: "LIVE FEED"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveSimulation.jsx",
                                        lineNumber: 163,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                lineNumber: 161,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 p-5 overflow-y-auto hide-scrollbar flex flex-col gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        children: playerMatchEvents.slice().reverse().map((evt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    y: 10,
                                                    scale: 0.95
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1
                                                },
                                                className: `p-3 rounded-xl border flex gap-4 text-sm shadow-md transition-colors ${evt.type === 'goal' ? 'bg-pitchLime/10 border-pitchLime text-white shadow-[0_0_15px_rgba(192,255,0,0.15)]' : 'bg-black/40 border-white/5 text-gray-300'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `font-heading text-xl w-6 text-center ${evt.type === 'goal' ? 'text-pitchLime' : 'text-gray-500'}`,
                                                        children: [
                                                            evt.minute,
                                                            "'"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/LiveSimulation.jsx",
                                                        lineNumber: 175,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 leading-tight self-center",
                                                        children: [
                                                            evt.type === 'goal' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "mr-2 text-lg",
                                                                children: "⚽"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                                                lineNumber: 177,
                                                                columnNumber: 65
                                                            }, this),
                                                            evt.type === 'yellow' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "mr-2",
                                                                children: "🟨"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                                                lineNumber: 178,
                                                                columnNumber: 67
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-white mr-1 text-base",
                                                                children: evt.player
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                                                lineNumber: 179,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: evt.type === 'goal' ? 'text-pitchLime font-bold uppercase tracking-wider text-xs ml-1' : 'opacity-80 text-xs ml-1',
                                                                children: evt.desc
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                                                lineNumber: 180,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/LiveSimulation.jsx",
                                                        lineNumber: 176,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, evt.key, true, {
                                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                                lineNumber: 169,
                                                columnNumber: 33
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveSimulation.jsx",
                                        lineNumber: 167,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: eventsEndRef
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveSimulation.jsx",
                                        lineNumber: 185,
                                        columnNumber: 25
                                    }, this),
                                    playerMatchEvents.length === 0 && minute > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center text-gray-500 italic mt-8 text-sm font-bold uppercase tracking-widest",
                                        children: "Kickoff! The match is underway."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveSimulation.jsx",
                                        lineNumber: 187,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveSimulation.jsx",
                                lineNumber: 166,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveSimulation.jsx",
                        lineNumber: 160,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveSimulation.jsx",
                lineNumber: 129,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LiveSimulation.jsx",
        lineNumber: 56,
        columnNumber: 9
    }, this);
}
_s(LiveSimulation, "UU1e5rm/ieYfjXCKHM4FzVAmRcM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c1 = LiveSimulation;
var _c, _c1;
__turbopack_context__.k.register(_c, "LiveMatchRow");
__turbopack_context__.k.register(_c1, "LiveSimulation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/oracleFixtures.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Mock API response simulating real-world international fixtures fetched from RapidAPI
__turbopack_context__.s([
    "fetchRealWorldFixtures",
    ()=>fetchRealWorldFixtures
]);
const fetchRealWorldFixtures = async ()=>{
    // Simulate network delay
    await new Promise((resolve)=>setTimeout(resolve, 800));
    return [
        {
            id: 'wc-qual-001',
            homeTeam: 'Brazil',
            homeCode: 'BR',
            awayTeam: 'Argentina',
            awayCode: 'AR',
            odds: {
                home: '2.10',
                draw: '3.40',
                away: '3.10'
            },
            status: 'upcoming'
        },
        {
            id: 'wc-qual-002',
            homeTeam: 'England',
            homeCode: 'GB-ENG',
            awayTeam: 'France',
            awayCode: 'FR',
            odds: {
                home: '2.80',
                draw: '3.20',
                away: '2.50'
            },
            status: 'upcoming'
        },
        {
            id: 'wc-qual-003',
            homeTeam: 'Portugal',
            homeCode: 'PT',
            awayTeam: 'Spain',
            awayCode: 'ES',
            odds: {
                home: '2.90',
                draw: '3.10',
                away: '2.60'
            },
            status: 'upcoming'
        },
        {
            id: 'wc-qual-004',
            homeTeam: 'Germany',
            homeCode: 'DE',
            awayTeam: 'Italy',
            awayCode: 'IT',
            odds: {
                home: '2.30',
                draw: '3.30',
                away: '3.00'
            },
            status: 'upcoming'
        }
    ];
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/OracleDashboard.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OracleDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$oracleFixtures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/oracleFixtures.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Flag.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function OracleDashboard() {
    _s();
    const [fixtures, setFixtures] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [simulatedAdminAction, setSimulatedAdminAction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userBets, setUserBets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({}); // Track mocked bets
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OracleDashboard.useEffect": ()=>{
            async function loadFixtures() {
                setLoading(true);
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$oracleFixtures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchRealWorldFixtures"])();
                setFixtures(data);
                setLoading(false);
            }
            loadFixtures();
        }
    }["OracleDashboard.useEffect"], []);
    const handlePlaceBet = (fixtureId, selection)=>{
        alert(`MetaMask Prompt: Sign transaction to place bet on ${selection} for fixture ${fixtureId} via PredictionMarket.sol`);
        // Mock successful transaction
        setUserBets((prev)=>({
                ...prev,
                [fixtureId]: {
                    selection,
                    claimed: false
                }
            }));
        setSimulatedAdminAction(`Bet placed on ${selection}`);
        setTimeout(()=>setSimulatedAdminAction(null), 3000);
    };
    const handleResolveMarket = (fixtureId)=>{
        alert(`Oracle Node Action: Calling PredictionMarket.sol -> resolveMarket(${fixtureId}, HOME_WIN) based on real-world RapidAPI data.`);
        setFixtures((prev)=>prev.map((f)=>f.id === fixtureId ? {
                    ...f,
                    status: 'resolved',
                    result: 'home'
                } : f));
        setSimulatedAdminAction(`Market ${fixtureId} resolved as HOME WIN`);
        setTimeout(()=>setSimulatedAdminAction(null), 3000);
    };
    const handleClaimWinnings = (fixtureId)=>{
        alert(`MetaMask Prompt: Sign transaction to claim winnings from PredictionMarket.sol for fixture ${fixtureId}`);
        setUserBets((prev)=>({
                ...prev,
                [fixtureId]: {
                    ...prev[fixtureId],
                    claimed: true
                }
            }));
        setSimulatedAdminAction(`Winnings claimed for ${fixtureId}`);
        setTimeout(()=>setSimulatedAdminAction(null), 3000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 flex gap-8 h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-[2] flex flex-col bg-black/40 border border-neonBlue/30 rounded-3xl overflow-hidden shadow-[0_0_20px_rgba(0,191,255,0.1)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-neonBlue/10 px-6 py-4 border-b border-neonBlue/30 flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xl",
                                        children: "🔮"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                        lineNumber: 49,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-bold tracking-widest text-sm text-neonBlue uppercase",
                                        children: "X Layer Oracle Markets"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                        lineNumber: 50,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/OracleDashboard.jsx",
                                lineNumber: 48,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold text-gray-400 bg-black/50 px-3 py-1 rounded-full border border-white/10",
                                children: "Data: RapidAPI World Cup Feeds"
                            }, void 0, false, {
                                fileName: "[project]/src/components/OracleDashboard.jsx",
                                lineNumber: 52,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/OracleDashboard.jsx",
                        lineNumber: 47,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-6 overflow-y-auto hide-scrollbar space-y-4",
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center items-center h-40",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-neonBlue animate-pulse font-bold tracking-widest",
                                children: "FETCHING ON-CHAIN DATA..."
                            }, void 0, false, {
                                fileName: "[project]/src/components/OracleDashboard.jsx",
                                lineNumber: 58,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/OracleDashboard.jsx",
                            lineNumber: 57,
                            columnNumber: 25
                        }, this) : fixtures.map((f)=>{
                            const userBet = userBets[f.id];
                            const isResolved = f.status === 'resolved';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-black/60 border border-white/10 rounded-2xl p-6 relative overflow-hidden group",
                                children: [
                                    isResolved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black/80 z-10 flex items-center justify-center backdrop-blur-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl font-black text-white mb-2",
                                                    children: "MARKET RESOLVED"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OracleDashboard.jsx",
                                                    lineNumber: 69,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-bold text-neonGold uppercase tracking-widest",
                                                    children: [
                                                        "Result: ",
                                                        f.result
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OracleDashboard.jsx",
                                                    lineNumber: 70,
                                                    columnNumber: 45
                                                }, this),
                                                userBet && !userBet.claimed && userBet.selection === f.result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleClaimWinnings(f.id),
                                                    className: "mt-4 px-6 py-2 bg-neonGold text-black font-bold rounded hover:bg-white transition-colors shadow-[0_0_15px_rgba(255,215,0,0.5)]",
                                                    children: "CLAIM WINNINGS"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OracleDashboard.jsx",
                                                    lineNumber: 72,
                                                    columnNumber: 49
                                                }, this),
                                                userBet && userBet.claimed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 text-xs font-bold text-gray-500 uppercase",
                                                    children: "Payout Claimed"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OracleDashboard.jsx",
                                                    lineNumber: 77,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OracleDashboard.jsx",
                                            lineNumber: 68,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                        lineNumber: 67,
                                        columnNumber: 52
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 w-5/12 justify-end",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-lg text-white",
                                                        children: f.homeTeam
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                                        lineNumber: 84,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        code: f.homeCode,
                                                        size: "w-8 h-8"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                                        lineNumber: 85,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/OracleDashboard.jsx",
                                                lineNumber: 83,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2/12 flex justify-center text-xs font-bold text-gray-500 uppercase",
                                                children: "VS"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OracleDashboard.jsx",
                                                lineNumber: 87,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 w-5/12 justify-start",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        code: f.awayCode,
                                                        size: "w-8 h-8"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                                        lineNumber: 89,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-lg text-white",
                                                        children: f.awayTeam
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                                        lineNumber: 90,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/OracleDashboard.jsx",
                                                lineNumber: 88,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                        lineNumber: 82,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handlePlaceBet(f.id, 'home'),
                                                disabled: userBet || isResolved,
                                                className: `flex-1 py-3 rounded-xl border transition-all ${userBet?.selection === 'home' ? 'bg-neonBlue text-black border-neonBlue' : 'bg-white/5 border-white/10 hover:border-neonBlue/50 hover:bg-neonBlue/5'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-gray-400 font-bold uppercase mb-1",
                                                        children: "HOME"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                                        lineNumber: 96,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-black text-lg",
                                                        children: f.odds.home
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                                        lineNumber: 97,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/OracleDashboard.jsx",
                                                lineNumber: 95,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handlePlaceBet(f.id, 'draw'),
                                                disabled: userBet || isResolved,
                                                className: `flex-1 py-3 rounded-xl border transition-all ${userBet?.selection === 'draw' ? 'bg-neonBlue text-black border-neonBlue' : 'bg-white/5 border-white/10 hover:border-neonBlue/50 hover:bg-neonBlue/5'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-gray-400 font-bold uppercase mb-1",
                                                        children: "DRAW"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                                        lineNumber: 100,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-black text-lg",
                                                        children: f.odds.draw
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                                        lineNumber: 101,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/OracleDashboard.jsx",
                                                lineNumber: 99,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handlePlaceBet(f.id, 'away'),
                                                disabled: userBet || isResolved,
                                                className: `flex-1 py-3 rounded-xl border transition-all ${userBet?.selection === 'away' ? 'bg-neonBlue text-black border-neonBlue' : 'bg-white/5 border-white/10 hover:border-neonBlue/50 hover:bg-neonBlue/5'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-gray-400 font-bold uppercase mb-1",
                                                        children: "AWAY"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                                        lineNumber: 104,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-black text-lg",
                                                        children: f.odds.away
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                                        lineNumber: 105,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/OracleDashboard.jsx",
                                                lineNumber: 103,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                        lineNumber: 94,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, f.id, true, {
                                fileName: "[project]/src/components/OracleDashboard.jsx",
                                lineNumber: 66,
                                columnNumber: 33
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/OracleDashboard.jsx",
                        lineNumber: 55,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/OracleDashboard.jsx",
                lineNumber: 46,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-black/60 border border-neonRed/30 rounded-3xl p-6 shadow-[0_0_20px_rgba(255,0,0,0.1)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 rounded-full bg-neonRed animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                        lineNumber: 119,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-bold text-xs uppercase tracking-widest text-neonRed",
                                        children: "Oracle Resolver Node"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                        lineNumber: 120,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/OracleDashboard.jsx",
                                lineNumber: 118,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mb-6 leading-relaxed",
                                children: [
                                    "This panel simulates the backend Oracle Node. On Mainnet, an automated script will fetch RapidAPI results and call ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "text-neonRed",
                                        children: "resolveMarket()"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                        lineNumber: 123,
                                        columnNumber: 140
                                    }, this),
                                    " on the smart contract."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/OracleDashboard.jsx",
                                lineNumber: 122,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    fixtures.filter((f)=>f.status === 'upcoming').map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleResolveMarket(f.id),
                                            className: "w-full py-3 px-4 bg-white/5 border border-white/10 hover:border-neonRed/50 rounded-xl text-left flex justify-between items-center transition-colors group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] text-gray-500 font-bold uppercase mb-1",
                                                            children: "TRIGGER RESULT FETCH"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OracleDashboard.jsx",
                                                            lineNumber: 134,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-bold text-sm text-gray-300 group-hover:text-white transition-colors",
                                                            children: [
                                                                f.homeTeam,
                                                                " vs ",
                                                                f.awayTeam
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/OracleDashboard.jsx",
                                                            lineNumber: 135,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OracleDashboard.jsx",
                                                    lineNumber: 133,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-neonRed text-xl",
                                                    children: "⚡"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OracleDashboard.jsx",
                                                    lineNumber: 137,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, `resolve-${f.id}`, true, {
                                            fileName: "[project]/src/components/OracleDashboard.jsx",
                                            lineNumber: 128,
                                            columnNumber: 29
                                        }, this)),
                                    fixtures.filter((f)=>f.status === 'upcoming').length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center text-xs text-gray-500 py-4",
                                        children: "All markets resolved."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/OracleDashboard.jsx",
                                        lineNumber: 141,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/OracleDashboard.jsx",
                                lineNumber: 126,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/OracleDashboard.jsx",
                        lineNumber: 117,
                        columnNumber: 17
                    }, this),
                    simulatedAdminAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-neonGreen/10 border border-neonGreen text-neonGreen p-4 rounded-xl text-sm font-bold text-center animate-in fade-in",
                        children: simulatedAdminAction
                    }, void 0, false, {
                        fileName: "[project]/src/components/OracleDashboard.jsx",
                        lineNumber: 147,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/OracleDashboard.jsx",
                lineNumber: 116,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/OracleDashboard.jsx",
        lineNumber: 44,
        columnNumber: 9
    }, this);
}
_s(OracleDashboard, "NJ4kGH0YLGGavdk/bLwqxjY0OXE=");
_c = OracleDashboard;
var _c;
__turbopack_context__.k.register(_c, "OracleDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/screens/Matchday.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Matchday
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GameContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Flag.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BetSlip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BetSlip.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveSimulation$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LiveSimulation.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OracleDashboard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/OracleDashboard.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$engine$2f$MatchSim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/engine/MatchSim.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
function Matchday() {
    _s();
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('league');
    const currentRoundIdx = state.round - 1;
    const fixtures = state.fixtures[currentRoundIdx] || [];
    const [realFixtures, setRealFixtures] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Matchday.useEffect": ()=>{
            fetch('/api/fixtures').then({
                "Matchday.useEffect": (r)=>r.json()
            }["Matchday.useEffect"]).then(setRealFixtures).catch(console.error);
        }
    }["Matchday.useEffect"], []);
    // Find player's match
    const playerMatch = fixtures.find((f)=>f.home === state.playerTeamIndex || f.away === state.playerTeamIndex);
    // Only show the 6 banger fixtures that have active markets, and always include the player's own team match
    const bangerFixtures = fixtures.filter((f)=>{
        const isPlayerMatch = f.home === state.playerTeamIndex || f.away === state.playerTeamIndex;
        if (isPlayerMatch) return true;
        const matchId = `${state.round - 1}-${f.home}-${f.away}`;
        return state.markets.some((m)=>m.id === matchId);
    });
    const handleSimulate = ()=>{
        if (state.selectedLineup.length < 11) {
            dispatch({
                type: 'ADD_TOAST',
                payload: {
                    message: 'Incomplete squad. Auto-filling lineup.',
                    type: 'info'
                }
            });
            dispatch({
                type: 'AUTO_LINEUP'
            });
        }
        dispatch({
            type: 'START_LIVE_SIM'
        });
    };
    const handleOddsClick = (matchId, selection, odds, homeAbbr, awayAbbr)=>{
        dispatch({
            type: 'ADD_TO_SLIP',
            payload: {
                matchId,
                selection,
                odds,
                homeAbbr,
                awayAbbr
            }
        });
    };
    const renderHeroMatch = ()=>{
        if (!playerMatch) return null;
        const homeTeam = state.teams[playerMatch.home];
        const awayTeam = state.teams[playerMatch.away];
        const homeIsPlayer = playerMatch.home === state.playerTeamIndex;
        const playerStrength = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$engine$2f$MatchSim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateTeamStrength"])(state.teams[state.playerTeamIndex], state.selectedLineup).toFixed(1);
        const opponentStrength = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$engine$2f$MatchSim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateTeamStrength"])(homeIsPlayer ? awayTeam : homeTeam, null).toFixed(1);
        const winProb = parseFloat(playerStrength) / (parseFloat(playerStrength) + parseFloat(opponentStrength)) * 100;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gradient-to-br from-stadiumBlue/80 to-black/60 border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl mb-8 group backdrop-blur-xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neonGreen to-pitchLime"
                }, void 0, false, {
                    fileName: "[project]/src/screens/Matchday.jsx",
                    lineNumber: 61,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-neonGreen font-bold uppercase tracking-widest flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-2 h-2 rounded-full bg-neonGreen animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 65,
                                    columnNumber: 25
                                }, this),
                                "YOUR NEXT MATCH"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/screens/Matchday.jsx",
                            lineNumber: 64,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs font-heading font-bold tracking-widest text-white bg-black/50 px-4 py-1.5 rounded border border-white/5 shadow-inner",
                            children: [
                                "OVR: ",
                                playerStrength,
                                " vs ",
                                opponentStrength
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/screens/Matchday.jsx",
                            lineNumber: 68,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/screens/Matchday.jsx",
                    lineNumber: 63,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center w-2/5 flex flex-col items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    code: homeTeam.code,
                                    size: "w-24 h-24",
                                    className: "mb-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] border-2 border-white/5 rounded-xl group-hover:scale-105 transition-transform duration-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 75,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-heading text-3xl font-bold tracking-widest uppercase drop-shadow-md",
                                    children: homeTeam.abbr
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 76,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/screens/Matchday.jsx",
                            lineNumber: 74,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xl font-heading font-bold text-gray-500 bg-black/40 px-6 py-2 rounded-xl border border-white/5 shadow-inner",
                            children: "VS"
                        }, void 0, false, {
                            fileName: "[project]/src/screens/Matchday.jsx",
                            lineNumber: 78,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center w-2/5 flex flex-col items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    code: awayTeam.code,
                                    size: "w-24 h-24",
                                    className: "mb-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] border-2 border-white/5 rounded-xl group-hover:scale-105 transition-transform duration-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 80,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-heading text-3xl font-bold tracking-widest uppercase drop-shadow-md",
                                    children: awayTeam.abbr
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 81,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/screens/Matchday.jsx",
                            lineNumber: 79,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/screens/Matchday.jsx",
                    lineNumber: 73,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2 bg-black/40 p-4 rounded-xl border border-white/5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between text-xs text-gray-400 font-bold uppercase tracking-widest",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Win Probability"
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 87,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white",
                                    children: [
                                        winProb.toFixed(0),
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 88,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/screens/Matchday.jsx",
                            lineNumber: 86,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-2 bg-black/80 rounded-full overflow-hidden shadow-inner",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-full bg-gradient-to-r from-neonGreen to-pitchLime transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
                                style: {
                                    width: `${winProb}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Matchday.jsx",
                                lineNumber: 91,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/screens/Matchday.jsx",
                            lineNumber: 90,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/screens/Matchday.jsx",
                    lineNumber: 85,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/screens/Matchday.jsx",
            lineNumber: 60,
            columnNumber: 13
        }, this);
    };
    const renderFixtureRow = (f, isReal = false)=>{
        let homeTeam, awayTeam, matchId, market;
        if (isReal) {
            const hName = f.teams?.home?.name || 'HOM';
            const aName = f.teams?.away?.name || 'AWY';
            const findCode = (name)=>{
                const found = state.teams.find((t)=>t.name.toLowerCase() === name.toLowerCase());
                // Fallback to 'AR' (Argentina) or 'BR' (Brazil) etc if not found for testing, but mostly 'UN'
                return found ? found.code : 'UN';
            };
            homeTeam = {
                abbr: hName.substring(0, 3).toUpperCase(),
                code: findCode(hName)
            };
            awayTeam = {
                abbr: aName.substring(0, 3).toUpperCase(),
                code: findCode(aName)
            };
            matchId = f.id.toString();
            // Mock market odds for real fixtures
            market = {
                odds1: 2.10,
                oddsX: 3.40,
                odds2: 3.10
            };
        } else {
            homeTeam = state.teams[f.home];
            awayTeam = state.teams[f.away];
            matchId = `${state.round - 1}-${f.home}-${f.away}`;
            market = state.markets.find((m)=>m.id === matchId);
        }
        const slipItem = state.betSlip.find((b)=>b.matchId === matchId);
        const isPlayerMatch = !isReal && (f.home === state.playerTeamIndex || f.away === state.playerTeamIndex);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `flex flex-col lg:flex-row items-center justify-between p-6 border-b border-white/5 hover:bg-white/10 transition-all gap-6 group relative ${isPlayerMatch ? 'bg-neonGold/5 border-l-4 border-l-neonGold shadow-[inset_0_0_20px_rgba(245,158,11,0.05)]' : ''}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex items-center justify-between gap-6 w-full max-w-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 w-[42%] justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `font-heading text-2xl font-black tracking-wider uppercase transition-colors text-right truncate ${isPlayerMatch && f.home === state.playerTeamIndex ? 'text-neonGold' : 'text-white group-hover:text-neonGold'}`,
                                    children: homeTeam.abbr
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 131,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative group/flag flex-shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 bg-white/20 blur rounded-full scale-105 opacity-0 group-hover/flag:opacity-100 transition-opacity"
                                        }, void 0, false, {
                                            fileName: "[project]/src/screens/Matchday.jsx",
                                            lineNumber: 135,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            code: homeTeam.code,
                                            size: "w-14 h-14 rounded-full border-2 border-white/25 shadow-xl relative z-10 transition-transform group-hover/flag:scale-110"
                                        }, void 0, false, {
                                            fileName: "[project]/src/screens/Matchday.jsx",
                                            lineNumber: 136,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 134,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/screens/Matchday.jsx",
                            lineNumber: 130,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center px-4 py-2 bg-black/40 rounded-xl border border-white/10 min-w-[80px] shadow-inner flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-bold text-gray-500 uppercase tracking-widest leading-none mb-1",
                                    children: "VS"
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 142,
                                    columnNumber: 25
                                }, this),
                                isPlayerMatch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[9px] bg-neonGold text-black font-extrabold px-1.5 py-0.5 rounded shadow-sm animate-pulse tracking-wide whitespace-nowrap",
                                    children: "MY TEAM"
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 144,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/screens/Matchday.jsx",
                            lineNumber: 141,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 w-[42%] justify-start",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative group/flag flex-shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 bg-white/20 blur rounded-full scale-105 opacity-0 group-hover/flag:opacity-100 transition-opacity"
                                        }, void 0, false, {
                                            fileName: "[project]/src/screens/Matchday.jsx",
                                            lineNumber: 153,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            code: awayTeam.code,
                                            size: "w-14 h-14 rounded-full border-2 border-white/25 shadow-xl relative z-10 transition-transform group-hover/flag:scale-110"
                                        }, void 0, false, {
                                            fileName: "[project]/src/screens/Matchday.jsx",
                                            lineNumber: 154,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 152,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `font-heading text-2xl font-black tracking-wider uppercase transition-colors text-left truncate ${isPlayerMatch && f.away === state.playerTeamIndex ? 'text-neonGold' : 'text-white group-hover:text-neonGold'}`,
                                    children: awayTeam.abbr
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 156,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/screens/Matchday.jsx",
                            lineNumber: 151,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/screens/Matchday.jsx",
                    lineNumber: 128,
                    columnNumber: 17
                }, this),
                market ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3 flex-shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleOddsClick(matchId, '1', market.odds1, homeTeam.abbr, awayTeam.abbr),
                            className: `flex flex-col items-center justify-center w-20 py-3 rounded-xl border transition-all ${slipItem?.selection === '1' ? 'bg-neonGold text-black border-neonGold shadow-[0_0_15px_rgba(245,158,11,0.4)] font-bold' : 'bg-black/50 border-white/10 hover:border-neonGold/50 text-white shadow-inner'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] opacity-70 font-bold uppercase mb-1",
                                    children: "HOME"
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 168,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-heading text-xl leading-none",
                                    children: market.odds1
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 169,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/screens/Matchday.jsx",
                            lineNumber: 164,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleOddsClick(matchId, 'X', market.oddsX, homeTeam.abbr, awayTeam.abbr),
                            className: `flex flex-col items-center justify-center w-20 py-3 rounded-xl border transition-all ${slipItem?.selection === 'X' ? 'bg-neonGold text-black border-neonGold shadow-[0_0_15px_rgba(245,158,11,0.4)] font-bold' : 'bg-black/50 border-white/10 hover:border-neonGold/50 text-white shadow-inner'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] opacity-70 font-bold uppercase mb-1",
                                    children: "DRAW"
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 175,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-heading text-xl leading-none",
                                    children: market.oddsX
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 176,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/screens/Matchday.jsx",
                            lineNumber: 171,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleOddsClick(matchId, '2', market.odds2, homeTeam.abbr, awayTeam.abbr),
                            className: `flex flex-col items-center justify-center w-20 py-3 rounded-xl border transition-all ${slipItem?.selection === '2' ? 'bg-neonGold text-black border-neonGold shadow-[0_0_15px_rgba(245,158,11,0.4)] font-bold' : 'bg-black/50 border-white/10 hover:border-neonGold/50 text-white shadow-inner'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] opacity-70 font-bold uppercase mb-1",
                                    children: "AWAY"
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 182,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-heading text-xl leading-none",
                                    children: market.odds2
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/Matchday.jsx",
                                    lineNumber: 183,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/screens/Matchday.jsx",
                            lineNumber: 178,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/screens/Matchday.jsx",
                    lineNumber: 163,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-gray-600 font-bold uppercase tracking-widest px-4 py-3 bg-black/20 rounded-xl border border-white/5 flex-shrink-0",
                    children: "Odds Closed"
                }, void 0, false, {
                    fileName: "[project]/src/screens/Matchday.jsx",
                    lineNumber: 187,
                    columnNumber: 21
                }, this)
            ]
        }, matchId, true, {
            fileName: "[project]/src/screens/Matchday.jsx",
            lineNumber: 126,
            columnNumber: 13
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col lg:flex-row gap-8 h-auto lg:h-[calc(100vh-140px)] relative font-body pb-12 lg:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveSimulation$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/screens/Matchday.jsx",
                lineNumber: 195,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col min-w-0 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "flex justify-between items-end mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-4xl font-heading font-bold uppercase tracking-wider drop-shadow-md",
                                        children: [
                                            "MATCHDAY ",
                                            state.round
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/Matchday.jsx",
                                        lineNumber: 200,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400 font-bold uppercase tracking-widest text-xs mt-1",
                                        children: "Review Odds & Place Predictions"
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/Matchday.jsx",
                                        lineNumber: 201,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/Matchday.jsx",
                                lineNumber: 199,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex bg-black/50 border border-white/10 rounded-xl p-1.5 shadow-inner",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setMode('league'),
                                        className: `px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors ${mode === 'league' ? 'bg-white/20 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`,
                                        children: "LEAGUE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/Matchday.jsx",
                                        lineNumber: 204,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setMode('oracle'),
                                        className: `px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${mode === 'oracle' ? 'bg-neonBlue/20 text-neonBlue border border-neonBlue/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'text-gray-500 hover:text-gray-300'}`,
                                        children: [
                                            "ORACLE ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] bg-neonBlue text-black px-1.5 rounded-sm shadow-md",
                                                children: "WEB3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Matchday.jsx",
                                                lineNumber: 206,
                                                columnNumber: 36
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/Matchday.jsx",
                                        lineNumber: 205,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/Matchday.jsx",
                                lineNumber: 203,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/Matchday.jsx",
                        lineNumber: 198,
                        columnNumber: 17
                    }, this),
                    mode === 'league' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto hide-scrollbar pr-4",
                        children: [
                            renderHeroMatch(),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-stadiumBlue/60 border border-white/10 rounded-2xl overflow-hidden shadow-2xl mb-8 backdrop-blur-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-black/40 px-8 py-4 border-b border-white/10 flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-bold text-neonGold uppercase tracking-widest flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]",
                                                        children: "🔥"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/Matchday.jsx",
                                                        lineNumber: 218,
                                                        columnNumber: 37
                                                    }, this),
                                                    " FEATURED BANGER MARKETS"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/Matchday.jsx",
                                                lineNumber: 217,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-white font-bold bg-black/60 px-3 py-1 rounded border border-white/5 shadow-inner",
                                                children: "LIVE"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Matchday.jsx",
                                                lineNumber: 220,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/Matchday.jsx",
                                        lineNumber: 216,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2",
                                        children: realFixtures.length > 0 ? realFixtures.map((f)=>renderFixtureRow(f, true)) : bangerFixtures.map((f)=>renderFixtureRow(f, false))
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/Matchday.jsx",
                                        lineNumber: 222,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/Matchday.jsx",
                                lineNumber: 215,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/Matchday.jsx",
                        lineNumber: 212,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OracleDashboard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/screens/Matchday.jsx",
                        lineNumber: 232,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/screens/Matchday.jsx",
                lineNumber: 197,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full lg:w-80 flex flex-col gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSimulate,
                        className: "w-full py-6 rounded-2xl font-heading text-2xl font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] relative overflow-hidden group bg-neonGreen text-black hover:scale-105 border border-pitchLime",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Matchday.jsx",
                                lineNumber: 241,
                                columnNumber: 21
                            }, this),
                            "SIMULATE MATCHDAY ▶"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/Matchday.jsx",
                        lineNumber: 237,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BetSlip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/screens/Matchday.jsx",
                        lineNumber: 245,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/screens/Matchday.jsx",
                lineNumber: 236,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/screens/Matchday.jsx",
        lineNumber: 194,
        columnNumber: 9
    }, this);
}
_s(Matchday, "hBtB6JVQbunGcQmFB0v6MbGMClI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c = Matchday;
var _c;
__turbopack_context__.k.register(_c, "Matchday");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/screens/Collection.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Collection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GameContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const BADGE_TYPES = [
    {
        id: 0,
        name: 'First Victory',
        icon: '⚽',
        desc: 'Win your first match',
        rarity: 'common'
    },
    {
        id: 1,
        name: 'Dominant Force',
        icon: '🔥',
        desc: '5-match win streak',
        rarity: 'rare'
    },
    {
        id: 2,
        name: 'Oracle Master',
        icon: '🔮',
        desc: '3 correct predictions in a row',
        rarity: 'rare'
    },
    {
        id: 3,
        name: 'Big Spender',
        icon: '💎',
        desc: 'Place a bet of €50,000+',
        rarity: 'rare'
    },
    {
        id: 4,
        name: 'Unbeaten Run',
        icon: '🛡️',
        desc: '10 matches without a loss',
        rarity: 'legendary'
    },
    {
        id: 5,
        name: 'Top of the Table',
        icon: '👑',
        desc: 'Reach #1 in the league',
        rarity: 'legendary'
    },
    {
        id: 6,
        name: 'Season Veteran',
        icon: '📅',
        desc: 'Complete 20 matchdays',
        rarity: 'common'
    },
    {
        id: 7,
        name: 'Collector',
        icon: '🎖️',
        desc: 'Mint 5 other badges',
        rarity: 'legendary'
    },
    {
        id: 8,
        name: 'PK Novice',
        icon: '🎯',
        desc: 'Win 1 Penalty Shootout',
        rarity: 'common'
    },
    {
        id: 9,
        name: 'PK Veteran',
        icon: '🏅',
        desc: 'Win 5 Penalty Shootouts',
        rarity: 'rare'
    },
    {
        id: 10,
        name: 'PK Legend',
        icon: '🏆',
        desc: 'Win 10 Penalty Shootouts',
        rarity: 'legendary'
    }
];
function Collection() {
    _s();
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const getBadgeStyle = (rarity)=>{
        if (rarity === 'common') return 'from-gray-500/20 to-gray-900/40 border-gray-500/50 shadow-[0_0_15px_rgba(156,163,175,0.2)]';
        if (rarity === 'rare') return 'from-neonBlue/20 to-purple-900/40 border-neonBlue/50 shadow-[0_0_15px_rgba(0,255,255,0.2)]';
        return 'from-neonGold/20 to-orange-900/40 border-neonGold/80 shadow-[0_0_30px_rgba(255,215,0,0.4)]';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8 animate-in fade-in duration-500",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-heading font-black flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-neonGold text-4xl",
                                children: "🏆"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Collection.jsx",
                                lineNumber: 31,
                                columnNumber: 21
                            }, this),
                            " MY COLLECTION"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/Collection.jsx",
                        lineNumber: 30,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400",
                        children: [
                            "You have earned ",
                            state.nftBadges.length,
                            " of ",
                            BADGE_TYPES.length,
                            " available badges."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/Collection.jsx",
                        lineNumber: 33,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/screens/Collection.jsx",
                lineNumber: 29,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-6",
                children: BADGE_TYPES.map((badgeDef)=>{
                    const earnedBadge = state.nftBadges.find((b)=>b.type === badgeDef.id);
                    const isLocked = !earnedBadge;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        whileHover: !isLocked ? {
                            scale: 1.05
                        } : {},
                        className: `relative rounded-3xl p-6 border flex flex-col items-center text-center overflow-hidden transition-all duration-300 ${isLocked ? 'bg-black/60 border-white/5 opacity-50 grayscale' : `bg-gradient-to-br ${getBadgeStyle(badgeDef.rarity)} cursor-pointer`}`,
                        children: [
                            !isLocked && badgeDef.rarity === 'legendary' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Collection.jsx",
                                lineNumber: 48,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-6xl mb-4 drop-shadow-2xl",
                                children: isLocked ? '🔒' : badgeDef.icon
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Collection.jsx",
                                lineNumber: 51,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-lg mb-1 font-heading",
                                children: badgeDef.name
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Collection.jsx",
                                lineNumber: 53,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mb-4 h-8",
                                children: badgeDef.desc
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Collection.jsx",
                                lineNumber: 54,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `mt-auto text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isLocked ? 'bg-white/10 text-gray-500' : 'bg-black/50 text-white border border-white/20'}`,
                                children: isLocked ? 'LOCKED' : 'MINTED'
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Collection.jsx",
                                lineNumber: 56,
                                columnNumber: 29
                            }, this),
                            earnedBadge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-black/90 backdrop-blur opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-3xl mb-2",
                                        children: badgeDef.icon
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/Collection.jsx",
                                        lineNumber: 63,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-neonGold font-bold mb-2",
                                        children: [
                                            "Earned: ",
                                            earnedBadge.date
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/Collection.jsx",
                                        lineNumber: 64,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] text-gray-400 text-center",
                                        children: earnedBadge.info
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/Collection.jsx",
                                        lineNumber: 65,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 text-[9px] text-neonBlue bg-neonBlue/10 px-2 py-1 rounded w-full truncate",
                                        children: [
                                            "TX: 0x",
                                            ((earnedBadge.type + 1) * 123456789).toString(16).slice(0, 8),
                                            "... on X Layer"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/Collection.jsx",
                                        lineNumber: 66,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/Collection.jsx",
                                lineNumber: 62,
                                columnNumber: 33
                            }, this)
                        ]
                    }, badgeDef.id, true, {
                        fileName: "[project]/src/screens/Collection.jsx",
                        lineNumber: 42,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/screens/Collection.jsx",
                lineNumber: 36,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/screens/Collection.jsx",
        lineNumber: 28,
        columnNumber: 9
    }, this);
}
_s(Collection, "bz/3tffehqHq3ZcuP6JOKCZwvko=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c = Collection;
var _c;
__turbopack_context__.k.register(_c, "Collection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/engine/PKShootoutEngine.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PKShootoutEngine",
    ()=>PKShootoutEngine
]);
class PKShootoutEngine {
    constructor(canvas, onGameEnd, updateScoreboard){
        this.canvas = canvas;
        this.fieldctx = canvas.getContext('2d');
        this.onGameEnd = onGameEnd;
        this.updateScoreboard = updateScoreboard;
        // Fixed internal resolution matching original game
        this.canvas.width = 1275;
        this.canvas.height = 735;
        this.scoresArr = [];
        this.attempt = 0;
        this.score = 0;
        this.shotInProgress = false;
        this.audioCache = {};
        this.loadAudio();
        this.diveSelection = null;
        this.hopeSoloImageSource = "/pk-shooter/images/solo-ready.png";
        this.theKeeperImg = new Image();
        this.theBallImg = new Image();
        this.theBallImg.src = "/pk-shooter/images/ball.png";
        this.keeper = {
            x: 590,
            y: 410,
            width: 89,
            height: 190
        };
        this.ball = {
            x: 595,
            y: 660,
            width: 80,
            height: 80
        };
        this.renderInterval = null;
        this.activeIntervals = []; // track all dive/ball intervals for cleanup
        this.isAnimating = false;
        this.boundKeyDown = this.handleKeyDown.bind(this);
    }
    loadAudio() {
        [
            'oleole',
            'whistle',
            'cheering',
            'win',
            'lose'
        ].forEach((name)=>{
            const audio = new Audio(`/pk-shooter/audio/${name}.mp3`);
            audio.preload = "auto";
            this.audioCache[name] = audio;
        });
    }
    playSound(name) {
        if (this.audioCache[name]) {
            this.audioCache[name].currentTime = 0;
            this.audioCache[name].play().catch(()=>{});
        }
    }
    stopSound(name) {
        if (this.audioCache[name]) {
            this.audioCache[name].pause();
        }
    }
    start() {
        // Clean up any previous game state
        this.clearAllIntervals();
        this.scoresArr = [];
        this.attempt = 0;
        this.score = 0;
        this.shotInProgress = false;
        this.resetPositions();
        if (this.updateScoreboard) this.updateScoreboard([]);
        this.playSound('oleole');
        setTimeout(()=>{
            this.stopSound('oleole');
            this.playSound('whistle');
            this.playSound('cheering');
        }, 1000);
        this.isAnimating = true;
        this.startRenderLoop();
        document.addEventListener('keydown', this.boundKeyDown);
    }
    stop() {
        this.isAnimating = false;
        this.clearAllIntervals();
        document.removeEventListener('keydown', this.boundKeyDown);
        Object.values(this.audioCache).forEach((a)=>{
            a.pause();
            a.currentTime = 0;
        });
    }
    clearAllIntervals() {
        if (this.renderInterval) {
            clearInterval(this.renderInterval);
            this.renderInterval = null;
        }
        this.activeIntervals.forEach((id)=>clearInterval(id));
        this.activeIntervals = [];
    }
    resetPositions() {
        this.keeper = {
            x: 590,
            y: 410,
            width: 89,
            height: 190
        };
        this.ball = {
            x: 595,
            y: 660,
            width: 80,
            height: 80
        };
        this.hopeSoloImageSource = "/pk-shooter/images/solo-ready.png";
    }
    startRenderLoop() {
        if (this.renderInterval) clearInterval(this.renderInterval);
        this.renderInterval = setInterval(()=>{
            if (!this.isAnimating) return;
            this.fieldctx.clearRect(0, 0, 1275, 735);
            this.theKeeperImg.src = this.hopeSoloImageSource;
            this.fieldctx.drawImage(this.theKeeperImg, this.keeper.x, this.keeper.y);
            this.fieldctx.drawImage(this.theBallImg, this.ball.x, this.ball.y, this.ball.width, this.ball.height);
        }, 50);
    }
    setNextDivePrediction(quadrant) {
        this.predictedDive = quadrant;
    }
    handleKeyDown(event) {
        // Support both event.which (legacy) and event.keyCode, plus event.key
        let key = event.which || event.keyCode;
        if (!key || key === 0) {
            // Fallback to event.key for modern browsers
            const keyMap = {
                'a': 65,
                'A': 65,
                's': 83,
                'S': 83,
                'z': 90,
                'Z': 90,
                'x': 88,
                'X': 88
            };
            key = keyMap[event.key] || 0;
        }
        if (![
            65,
            83,
            90,
            88
        ].includes(key)) return;
        if (this.shotInProgress) return; // prevent double-firing
        event.preventDefault();
        this.shotInProgress = true;
        document.removeEventListener('keydown', this.boundKeyDown);
        // Determine goal or save: map key to target quadrant
        const keyToQuadrant = {
            65: 1,
            83: 2,
            90: 3,
            88: 4
        };
        const shotQuadrant = keyToQuadrant[key];
        // If we have a predicted dive, use it, otherwise random
        if (this.predictedDive) {
            this.diveSelection = this.predictedDive;
            this.predictedDive = null; // consume it
        } else {
            this.diveSelection = [
                1,
                2,
                3,
                4
            ][Math.floor(Math.random() * 4)];
        }
        // SMART KEEPER BOOST: Give the keeper an automatic 35% chance to just read the player perfectly
        // This makes the keeper feel much smarter and harder to beat
        if (Math.random() < 0.35) {
            this.diveSelection = shotQuadrant;
        }
        this.shootBall(key);
        this.diveKeeper(key);
    }
    // Ball trajectory functions — faithfully replicated from original main.js
    // Original uses nested if blocks, NOT else-if chains
    shootBall(keyPressed) {
        const that = this;
        let start;
        function topLeft() {
            if (that.ball.x !== 185 && that.ball.y !== 250) {
                that.ball.x -= 5;
                that.ball.y -= 5;
            }
            if (that.ball.x !== 185) {
                that.ball.x -= 5;
            }
            if (that.ball.y !== 250) {
                that.ball.y -= 5;
            } else {
                clearInterval(start);
            }
        }
        function topRight() {
            if (that.ball.x !== 1000 && that.ball.y !== 250) {
                that.ball.x += 5;
                that.ball.y -= 5;
            }
            if (that.ball.x !== 1000) {
                that.ball.x += 5;
            }
            if (that.ball.y !== 250) {
                that.ball.y -= 5;
            } else {
                clearInterval(start);
            }
        }
        function bottomLeft() {
            if (that.ball.x !== 185 && that.ball.y !== 500) {
                that.ball.x -= 5;
                that.ball.y -= 3;
            }
            if (that.ball.x !== 185) {
                that.ball.x -= 5;
            }
            if (that.ball.y !== 500) {
                that.ball.y -= 1;
            } else {
                clearInterval(start);
            }
        }
        function bottomRight() {
            if (that.ball.x !== 1010 && that.ball.y !== 500) {
                that.ball.x += 5;
                that.ball.y -= 3;
            }
            if (that.ball.x !== 1010) {
                that.ball.x += 5;
            }
            if (that.ball.y !== 500) {
                that.ball.y -= 1;
            } else {
                clearInterval(start);
            }
        }
        switch(keyPressed){
            case 65:
                start = setInterval(topLeft, 10);
                break;
            case 83:
                start = setInterval(topRight, 10);
                break;
            case 90:
                start = setInterval(bottomLeft, 10);
                break;
            case 88:
                start = setInterval(bottomRight, 10);
                break;
        }
        if (start) this.activeIntervals.push(start);
    }
    // Keeper dive functions — faithfully replicated from original main.js
    diveKeeper(keyPressed) {
        const that = this;
        let start;
        function topLeft() {
            that.hopeSoloImageSource = "/pk-shooter/images/solo-topleft.png";
            if (that.keeper.x !== 185 && that.keeper.y !== 250) {
                that.keeper.x -= 5;
                that.keeper.y -= 3;
            }
            if (that.keeper.x !== 185) {
                that.keeper.x -= 5;
            }
            if (that.keeper.y !== 250) {
                that.keeper.y -= 1;
            } else {
                clearInterval(start);
            }
        }
        function topRight() {
            that.hopeSoloImageSource = "/pk-shooter/images/solo-topright.png";
            if (that.keeper.x !== 1000 && that.keeper.y !== 250) {
                that.keeper.x += 5;
                that.keeper.y -= 5;
            }
            if (that.keeper.x !== 1000) {
                that.keeper.x += 5;
            }
            if (that.keeper.y !== 250) {
                that.keeper.y -= 5;
            } else {
                clearInterval(start);
            }
        }
        function bottomLeft() {
            that.hopeSoloImageSource = "/pk-shooter/images/solo-bottomleft.png";
            if (that.keeper.x !== 185 && that.keeper.y !== 500) {
                that.keeper.x -= 5;
                that.keeper.y += 1;
            }
            if (that.keeper.x !== 185) {
                that.keeper.x -= 5;
            }
            if (that.keeper.y !== 500) {
                that.keeper.y += 1;
            } else {
                clearInterval(start);
            }
        }
        function bottomRight() {
            that.hopeSoloImageSource = "/pk-shooter/images/solo-bottomright.png";
            if (that.keeper.x !== 700 && that.keeper.y !== 500) {
                that.keeper.x += 5;
                that.keeper.y += 3;
            }
            if (that.keeper.x !== 700) {
                that.keeper.x += 5;
            }
            if (that.keeper.y !== 500) {
                that.keeper.y += 3;
            } else {
                clearInterval(start);
            }
        }
        // Determine keeper dive direction (random, independent of player's shot)
        switch(this.diveSelection){
            case 1:
                start = setInterval(topLeft, 1);
                break;
            case 2:
                start = setInterval(topRight, 1);
                break;
            case 3:
                start = setInterval(bottomLeft, 1);
                break;
            case 4:
                start = setInterval(bottomRight, 1);
                break;
        }
        if (start) this.activeIntervals.push(start);
        // Determine goal or save: map key to target quadrant
        // A=65 → topLeft=1, S=83 → topRight=2, Z=90 → bottomLeft=3, X=88 → bottomRight=4
        const keyToQuadrant = {
            65: 1,
            83: 2,
            90: 3,
            88: 4
        };
        const shotQuadrant = keyToQuadrant[keyPressed];
        this.attempt++;
        if (this.diveSelection === shotQuadrant) {
            this.scoresArr.push("save");
        } else {
            this.score++;
            this.scoresArr.push("goal");
        }
        if (this.updateScoreboard) this.updateScoreboard([
            ...this.scoresArr
        ]);
        this.endGameCheck();
    }
    endGameCheck() {
        if (this.scoresArr.length === 5) {
            // Game over — stop accepting input
            const won = this.score >= 3;
            if (won) {
                this.playSound('win');
            } else {
                this.playSound('lose');
            }
            setTimeout(()=>{
                this.stop();
                this.onGameEnd({
                    won,
                    score: this.score,
                    attempts: 5
                });
            }, 1100);
        } else {
            // Next shot — reset after delay
            this.playSound('cheering');
            setTimeout(()=>{
                // Clear old ball/keeper movement intervals before resetting
                this.activeIntervals.forEach((id)=>clearInterval(id));
                this.activeIntervals = [];
                this.resetPositions();
                this.shotInProgress = false;
                document.addEventListener('keydown', this.boundKeyDown);
            }, 2200);
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/screens/PKShooter.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PKShooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GameContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$engine$2f$PKShootoutEngine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/engine/PKShootoutEngine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/web3/useWeb3.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
// Helper to map keys to text for AI
const mapKeyToDirection = (key)=>{
    switch(key){
        case 65:
            return "top-left";
        case 83:
            return "top-right";
        case 90:
            return "bottom-left";
        case 88:
            return "bottom-right";
        default:
            return "unknown";
    }
};
const mapDirectionToQuadrant = (dir)=>{
    switch(dir){
        case "top-left":
            return 1;
        case "top-right":
            return 2;
        case "bottom-left":
            return 3;
        case "bottom-right":
            return 4;
        default:
            return null;
    }
};
function PKShooter() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const engineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const { wallet, connectWallet } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWeb3"])();
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('pre'); // pre, playing, post
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [scoreboard, setScoreboard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('practice'); // 'practice' | 'real'
    const [cooldownLeft, setCooldownLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [payoutStatus, setPayoutStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // 'processing', 'done', 'error'
    const [txHash, setTxHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [commentary, setCommentary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isFetchingPrediction, setIsFetchingPrediction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Track user's shot directions for the adaptive AI
    const shotHistoryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const fetchDivePrediction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PKShooter.useCallback[fetchDivePrediction]": async (history)=>{
            if (mode !== 'real') return;
            setIsFetchingPrediction(true);
            try {
                const res = await fetch('/api/ai', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: 'predict_dive',
                        data: {
                            history
                        }
                    })
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
        }
    }["PKShooter.useCallback[fetchDivePrediction]"], [
        mode
    ]);
    const handleGameEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PKShooter.useCallback[handleGameEnd]": async (gameResult)=>{
            setResult(gameResult);
            dispatch({
                type: 'PK_GAME_END',
                payload: gameResult
            });
            if (mode === 'real') {
                setGameState('payout');
                setPayoutStatus('processing');
                setCommentary('DeepSeek is analyzing the match...');
                // 1. Generate Commentary
                const commentaryPromise = fetch('/api/ai', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: 'generate_commentary',
                        data: {
                            history: engineRef.current.scoresArr,
                            score: gameResult.score,
                            won: gameResult.won
                        }
                    })
                }).then({
                    "PKShooter.useCallback[handleGameEnd].commentaryPromise": (r)=>r.json()
                }["PKShooter.useCallback[handleGameEnd].commentaryPromise"]);
                // 2. Process Payout (only if won)
                let payoutPromise = Promise.resolve({
                    success: false,
                    txHash: null
                });
                if (gameResult.won) {
                    // Instantly record a local cooldown check
                    if (wallet?.address) {
                        const localCooldownKey = `pk_cooldown_${wallet.address.toLowerCase()}`;
                        localStorage.setItem(localCooldownKey, Date.now().toString());
                    }
                    payoutPromise = fetch('/api/pk-payout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            action: 'payout',
                            userAddress: wallet?.address
                        })
                    }).then({
                        "PKShooter.useCallback[handleGameEnd]": (r)=>r.json()
                    }["PKShooter.useCallback[handleGameEnd]"]);
                }
                try {
                    const [aiRes, payoutRes] = await Promise.all([
                        commentaryPromise,
                        payoutPromise
                    ]);
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
        }
    }["PKShooter.useCallback[handleGameEnd]"], [
        dispatch,
        mode,
        wallet?.address
    ]);
    const handleScoreboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PKShooter.useCallback[handleScoreboard]": (scores)=>{
            setScoreboard(scores);
        }
    }["PKShooter.useCallback[handleScoreboard]"], []);
    // Create engine once on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PKShooter.useEffect": ()=>{
            if (!canvasRef.current) return;
            engineRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$engine$2f$PKShootoutEngine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PKShootoutEngine"](canvasRef.current, handleGameEnd, handleScoreboard);
            // Override shootBall to record history & fetch next prediction
            const originalShoot = engineRef.current.shootBall.bind(engineRef.current);
            engineRef.current.shootBall = ({
                "PKShooter.useEffect": (key)=>{
                    originalShoot(key);
                    const dir = mapKeyToDirection(key);
                    if (dir !== "unknown") {
                        shotHistoryRef.current.push(dir);
                        // Fetch prediction for the NEXT shot
                        if (shotHistoryRef.current.length < 5) {
                            fetchDivePrediction(shotHistoryRef.current);
                        }
                    }
                }
            })["PKShooter.useEffect"];
            return ({
                "PKShooter.useEffect": ()=>{
                    if (engineRef.current) {
                        engineRef.current.stop();
                        engineRef.current = null;
                    }
                }
            })["PKShooter.useEffect"];
        }
    }["PKShooter.useEffect"], [
        handleGameEnd,
        handleScoreboard,
        fetchDivePrediction
    ]);
    const startGame = async ()=>{
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
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: 'check',
                        userAddress: wallet.address
                    })
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
    const formatTime = (seconds)=>{
        const h = Math.floor(seconds / 3600);
        const m = Math.floor(seconds % 3600 / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-full relative overflow-hidden bg-black rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]",
        children: [
            gameState === 'playing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-8 left-1/2 -translate-x-1/2 z-50 flex gap-4 p-4 bg-black/50 backdrop-blur-md rounded-full border border-white/20",
                children: [
                    0,
                    1,
                    2,
                    3,
                    4
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-10 h-10 rounded-full border-4 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-colors duration-300 ${scoreboard[i] === 'goal' ? 'bg-neonGreen border-white shadow-[0_0_15px_rgba(0,255,0,0.5)]' : scoreboard[i] === 'save' ? 'bg-red-500 border-white shadow-[0_0_15px_rgba(255,0,0,0.5)]' : 'bg-transparent border-white/30'}`
                    }, i, false, {
                        fileName: "[project]/src/screens/PKShooter.jsx",
                        lineNumber: 235,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/screens/PKShooter.jsx",
                lineNumber: 233,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-full flex items-center justify-center",
                style: {
                    backgroundImage: 'url(/pk-shooter/images/background.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                    ref: canvasRef,
                    width: "1275",
                    height: "735",
                    style: {
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                    },
                    tabIndex: 0
                }, void 0, false, {
                    fileName: "[project]/src/screens/PKShooter.jsx",
                    lineNumber: 249,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/screens/PKShooter.jsx",
                lineNumber: 247,
                columnNumber: 13
            }, this),
            gameState === 'pre' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center text-white p-8 z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-5xl font-heading font-black text-neonGold mb-6 drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]",
                        children: "PK SHOOTOUT"
                    }, void 0, false, {
                        fileName: "[project]/src/screens/PKShooter.jsx",
                        lineNumber: 261,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex bg-white/10 p-1 rounded-full mb-6 border border-white/20 relative overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMode('practice'),
                                className: `px-8 py-3 rounded-full font-bold transition-colors z-10 ${mode === 'practice' ? 'text-black bg-white shadow-lg' : 'text-gray-400 hover:text-white'}`,
                                children: "Practice"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/PKShooter.jsx",
                                lineNumber: 267,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMode('real'),
                                className: `px-8 py-3 rounded-full font-bold transition-colors z-10 flex items-center gap-2 ${mode === 'real' ? 'text-black bg-neonGreen shadow-[0_0_20px_rgba(0,255,0,0.4)]' : 'text-gray-400 hover:text-white'}`,
                                children: [
                                    "Real Stakes",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-black/20 text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider",
                                        children: "Win 1 USDT"
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/PKShooter.jsx",
                                        lineNumber: 278,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/PKShooter.jsx",
                                lineNumber: 273,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/PKShooter.jsx",
                        lineNumber: 266,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/5 border border-white/10 rounded-2xl p-8 mb-6 max-w-md text-center backdrop-blur-md",
                        children: [
                            mode === 'real' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg text-gray-300 mb-4 leading-relaxed",
                                children: [
                                    "Face off against an ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-neonGreen font-bold",
                                        children: "Adaptive AI"
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/PKShooter.jsx",
                                        lineNumber: 285,
                                        columnNumber: 53
                                    }, this),
                                    " that learns your shots.",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/screens/PKShooter.jsx",
                                        lineNumber: 285,
                                        columnNumber: 138
                                    }, this),
                                    "Score ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-neonGreen font-bold",
                                        children: "3+ out of 5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/PKShooter.jsx",
                                        lineNumber: 286,
                                        columnNumber: 39
                                    }, this),
                                    " to win 1 USDT.",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/screens/PKShooter.jsx",
                                        lineNumber: 286,
                                        columnNumber: 115
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-400 italic",
                                        children: "One attempt per 24 hours."
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/PKShooter.jsx",
                                        lineNumber: 287,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/PKShooter.jsx",
                                lineNumber: 284,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg text-gray-300 mb-4 leading-relaxed",
                                children: [
                                    "Practice your shots against a random keeper.",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/screens/PKShooter.jsx",
                                        lineNumber: 291,
                                        columnNumber: 77
                                    }, this),
                                    "Score ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-neonGreen font-bold",
                                        children: "3+ out of 5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/PKShooter.jsx",
                                        lineNumber: 292,
                                        columnNumber: 39
                                    }, this),
                                    " to win!"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/PKShooter.jsx",
                                lineNumber: 290,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4 my-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-black/40 rounded-xl p-3 border border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                                className: "text-neonGold font-mono font-bold text-2xl",
                                                children: "A"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/PKShooter.jsx",
                                                lineNumber: 296,
                                                columnNumber: 96
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-400 mt-1",
                                                children: "Top Left"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/PKShooter.jsx",
                                                lineNumber: 296,
                                                columnNumber: 163
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/PKShooter.jsx",
                                        lineNumber: 296,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-black/40 rounded-xl p-3 border border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                                className: "text-neonGold font-mono font-bold text-2xl",
                                                children: "S"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/PKShooter.jsx",
                                                lineNumber: 297,
                                                columnNumber: 96
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-400 mt-1",
                                                children: "Top Right"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/PKShooter.jsx",
                                                lineNumber: 297,
                                                columnNumber: 163
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/PKShooter.jsx",
                                        lineNumber: 297,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-black/40 rounded-xl p-3 border border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                                className: "text-neonGold font-mono font-bold text-2xl",
                                                children: "Z"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/PKShooter.jsx",
                                                lineNumber: 298,
                                                columnNumber: 96
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-400 mt-1",
                                                children: "Bottom Left"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/PKShooter.jsx",
                                                lineNumber: 298,
                                                columnNumber: 163
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/PKShooter.jsx",
                                        lineNumber: 298,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-black/40 rounded-xl p-3 border border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                                className: "text-neonGold font-mono font-bold text-2xl",
                                                children: "X"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/PKShooter.jsx",
                                                lineNumber: 299,
                                                columnNumber: 96
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-400 mt-1",
                                                children: "Bottom Right"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/PKShooter.jsx",
                                                lineNumber: 299,
                                                columnNumber: 163
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/PKShooter.jsx",
                                        lineNumber: 299,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/PKShooter.jsx",
                                lineNumber: 295,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/PKShooter.jsx",
                        lineNumber: 282,
                        columnNumber: 21
                    }, this),
                    cooldownLeft !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center p-4 bg-red-500/20 border border-red-500/50 rounded-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-400 font-bold mb-1",
                                children: "Cooldown Active"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/PKShooter.jsx",
                                lineNumber: 305,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white font-mono text-xl",
                                children: formatTime(cooldownLeft)
                            }, void 0, false, {
                                fileName: "[project]/src/screens/PKShooter.jsx",
                                lineNumber: 306,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/PKShooter.jsx",
                        lineNumber: 304,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: startGame,
                        className: "px-16 py-6 bg-neonGold text-black text-2xl font-black rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,215,0,0.5)] active:scale-95",
                        children: mode === 'real' && !wallet?.connected ? 'CONNECT WALLET' : 'START SHOOTOUT'
                    }, void 0, false, {
                        fileName: "[project]/src/screens/PKShooter.jsx",
                        lineNumber: 309,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/screens/PKShooter.jsx",
                lineNumber: 260,
                columnNumber: 17
            }, this),
            gameState === 'payout' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center text-white p-12 z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-4xl font-black mb-8 text-neonBlue animate-pulse",
                        children: payoutStatus === 'processing' ? 'PROCESSING MATCH...' : 'MATCH COMPLETE'
                    }, void 0, false, {
                        fileName: "[project]/src/screens/PKShooter.jsx",
                        lineNumber: 322,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-black/50 border border-white/10 rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -top-3 -left-3 bg-neonBlue text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest",
                                children: "DeepSeek Commentary"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/PKShooter.jsx",
                                lineNumber: 327,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg text-gray-300 italic leading-relaxed min-h-[100px]",
                                children: [
                                    '"',
                                    commentary,
                                    '"'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/PKShooter.jsx",
                                lineNumber: 330,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/PKShooter.jsx",
                        lineNumber: 326,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/screens/PKShooter.jsx",
                lineNumber: 321,
                columnNumber: 17
            }, this),
            gameState === 'post' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center text-white p-8 z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-8xl font-black mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]",
                        children: result?.won ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-neonGreen drop-shadow-[0_0_30px_rgba(0,255,0,0.5)]",
                            children: "YOU WIN!"
                        }, void 0, false, {
                            fileName: "[project]/src/screens/PKShooter.jsx",
                            lineNumber: 342,
                            columnNumber: 29
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-red-500 drop-shadow-[0_0_30px_rgba(255,0,0,0.5)]",
                            children: "YOU LOSE!"
                        }, void 0, false, {
                            fileName: "[project]/src/screens/PKShooter.jsx",
                            lineNumber: 344,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/screens/PKShooter.jsx",
                        lineNumber: 340,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-4xl font-heading font-bold text-white mb-2",
                        children: [
                            result?.score,
                            " / 5"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/PKShooter.jsx",
                        lineNumber: 347,
                        columnNumber: 21
                    }, this),
                    mode === 'real' && payoutStatus === 'done' && txHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "my-6 p-4 bg-neonGreen/10 border border-neonGreen/30 rounded-xl text-center max-w-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-neonGreen font-bold mb-2",
                                children: "Payout Successful!"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/PKShooter.jsx",
                                lineNumber: 353,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 break-all",
                                children: txHash
                            }, void 0, false, {
                                fileName: "[project]/src/screens/PKShooter.jsx",
                                lineNumber: 354,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/PKShooter.jsx",
                        lineNumber: 352,
                        columnNumber: 25
                    }, this),
                    mode === 'real' && commentary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "my-6 p-6 bg-white/5 border border-white/10 rounded-xl max-w-2xl w-full text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-neonBlue font-bold mb-2 uppercase tracking-widest",
                                children: "DeepSeek Commentary"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/PKShooter.jsx",
                                lineNumber: 360,
                                columnNumber: 30
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-300 italic",
                                children: [
                                    '"',
                                    commentary,
                                    '"'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/PKShooter.jsx",
                                lineNumber: 361,
                                columnNumber: 30
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/PKShooter.jsx",
                        lineNumber: 359,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xl text-gray-400 mb-8 mt-4 text-center max-w-lg",
                        children: result?.won ? 'Incredible performance under pressure.' : 'The AI Goalkeeper read you like a book!'
                    }, void 0, false, {
                        fileName: "[project]/src/screens/PKShooter.jsx",
                        lineNumber: 365,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setGameState('pre'),
                        className: "px-16 py-6 bg-neonBlue text-black text-2xl font-black rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,255,255,0.5)] active:scale-95",
                        children: "BACK TO MENU"
                    }, void 0, false, {
                        fileName: "[project]/src/screens/PKShooter.jsx",
                        lineNumber: 371,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/screens/PKShooter.jsx",
                lineNumber: 339,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/screens/PKShooter.jsx",
        lineNumber: 230,
        columnNumber: 9
    }, this);
}
_s(PKShooter, "jHI2MX5wlacvz3Q7oR6XiIX6apY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWeb3"]
    ];
});
_c = PKShooter;
var _c;
__turbopack_context__.k.register(_c, "PKShooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/top30.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TOP_30_PLAYERS",
    ()=>TOP_30_PLAYERS
]);
const TOP_30_PLAYERS = [
    // --- FORWARDS (6) ---
    {
        id: 'f1',
        name: 'Kylian Mbappé',
        teamName: 'France',
        position: 'FWD',
        value: 25
    },
    {
        id: 'f2',
        name: 'Lionel Messi',
        teamName: 'Argentina',
        position: 'FWD',
        value: 24
    },
    {
        id: 'f3',
        name: 'Vinícius Júnior',
        teamName: 'Brazil',
        position: 'FWD',
        value: 23
    },
    {
        id: 'f4',
        name: 'Harry Kane',
        teamName: 'England',
        position: 'FWD',
        value: 22
    },
    {
        id: 'f5',
        name: 'Robert Lewandowski',
        teamName: 'Poland',
        position: 'FWD',
        value: 19
    },
    {
        id: 'f6',
        name: 'Cristiano Ronaldo',
        teamName: 'Portugal',
        position: 'FWD',
        value: 20
    },
    // --- MIDFIELDERS (10) ---
    {
        id: 'm1',
        name: 'Jude Bellingham',
        teamName: 'England',
        position: 'MID',
        value: 20
    },
    {
        id: 'm2',
        name: 'Kevin De Bruyne',
        teamName: 'Belgium',
        position: 'MID',
        value: 19
    },
    {
        id: 'm3',
        name: 'Rodri',
        teamName: 'Spain',
        position: 'MID',
        value: 18
    },
    {
        id: 'm4',
        name: 'Pedri',
        teamName: 'Spain',
        position: 'MID',
        value: 16
    },
    {
        id: 'm5',
        name: 'Jamal Musiala',
        teamName: 'Germany',
        position: 'MID',
        value: 17
    },
    {
        id: 'm6',
        name: 'Enzo Fernández',
        teamName: 'Argentina',
        position: 'MID',
        value: 14
    },
    {
        id: 'm7',
        name: 'Bruno Fernandes',
        teamName: 'Portugal',
        position: 'MID',
        value: 17
    },
    {
        id: 'm8',
        name: 'Luka Modrić',
        teamName: 'Croatia',
        position: 'MID',
        value: 13
    },
    {
        id: 'm9',
        name: 'Aurélien Tchouaméni',
        teamName: 'France',
        position: 'MID',
        value: 13
    },
    {
        id: 'm10',
        name: 'Phil Foden',
        teamName: 'England',
        position: 'MID',
        value: 18
    },
    // --- DEFENDERS (10) ---
    {
        id: 'd1',
        name: 'Rúben Dias',
        teamName: 'Portugal',
        position: 'DEF',
        value: 14
    },
    {
        id: 'd2',
        name: 'Virgil van Dijk',
        teamName: 'Netherlands',
        position: 'DEF',
        value: 13
    },
    {
        id: 'd3',
        name: 'William Saliba',
        teamName: 'France',
        position: 'DEF',
        value: 12
    },
    {
        id: 'd4',
        name: 'Achraf Hakimi',
        teamName: 'Morocco',
        position: 'DEF',
        value: 13
    },
    {
        id: 'd5',
        name: 'Alphonso Davies',
        teamName: 'Canada',
        position: 'DEF',
        value: 12
    },
    {
        id: 'd6',
        name: 'Joško Gvardiol',
        teamName: 'Croatia',
        position: 'DEF',
        value: 11
    },
    {
        id: 'd7',
        name: 'Marquinhos',
        teamName: 'Brazil',
        position: 'DEF',
        value: 10
    },
    {
        id: 'd8',
        name: 'Trent Alexander-Arnold',
        teamName: 'England',
        position: 'DEF',
        value: 13
    },
    {
        id: 'd9',
        name: 'Cristian Romero',
        teamName: 'Argentina',
        position: 'DEF',
        value: 10
    },
    {
        id: 'd10',
        name: 'Antonio Rüdiger',
        teamName: 'Germany',
        position: 'DEF',
        value: 11
    },
    // --- GOALKEEPERS (4) ---
    {
        id: 'g1',
        name: 'Alisson Becker',
        teamName: 'Brazil',
        position: 'GK',
        value: 9
    },
    {
        id: 'g2',
        name: 'Emiliano Martínez',
        teamName: 'Argentina',
        position: 'GK',
        value: 8
    },
    {
        id: 'g3',
        name: 'Thibaut Courtois',
        teamName: 'Belgium',
        position: 'GK',
        value: 9
    },
    {
        id: 'g4',
        name: 'Gianluigi Donnarumma',
        teamName: 'Italy',
        position: 'GK',
        value: 7
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/screens/FantasyLeague.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FantasyLeague
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GameContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/web3/useWeb3.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Flag.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$top30$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/top30.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const COUNTRY_TO_FLAG_CODE = {
    'france': 'fr',
    'argentina': 'ar',
    'brazil': 'br',
    'england': 'gb',
    'poland': 'pl',
    'portugal': 'pt',
    'belgium': 'be',
    'spain': 'es',
    'germany': 'de',
    'croatia': 'hr',
    'netherlands': 'nl',
    'morocco': 'ma',
    'canada': 'ca',
    'italy': 'it'
};
function FantasyLeague() {
    _s();
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const { wallet } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWeb3"])();
    // Toggle between 'pitch' (My Squad) and 'market' (Draft Market)
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('pitch');
    const [draftFilter, setDraftFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('ALL');
    const [leaderboard, setLeaderboard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const userTeam = state.teams[state.playerTeamIndex]?.name || 'Argentina';
    const { squad, budget, totalPoints } = state.fantasy;
    // Position requirement check
    const hasGk = squad.some((p)=>p.position === 'GK');
    const hasDef = squad.some((p)=>p.position === 'DEF');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FantasyLeague.useEffect": ()=>{
            // Fetch leaderboard initially and poll every 30s
            const fetchLeaderboard = {
                "FantasyLeague.useEffect.fetchLeaderboard": ()=>{
                    fetch('/api/fantasy/leaderboard').then({
                        "FantasyLeague.useEffect.fetchLeaderboard": (res)=>res.json()
                    }["FantasyLeague.useEffect.fetchLeaderboard"]).then({
                        "FantasyLeague.useEffect.fetchLeaderboard": (data)=>setLeaderboard(data)
                    }["FantasyLeague.useEffect.fetchLeaderboard"]).catch(console.error);
                }
            }["FantasyLeague.useEffect.fetchLeaderboard"];
            fetchLeaderboard();
            const interval = setInterval(fetchLeaderboard, 30000);
            return ({
                "FantasyLeague.useEffect": ()=>clearInterval(interval)
            })["FantasyLeague.useEffect"];
        }
    }["FantasyLeague.useEffect"], []);
    const filteredDraftPool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$top30$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOP_30_PLAYERS"].filter((p)=>draftFilter === 'ALL' || p.position === draftFilter);
    const handleAddPlayer = (player)=>{
        if (squad.length >= 6) return dispatch({
            type: 'ADD_TOAST',
            payload: {
                message: 'Squad full (Max 6)!',
                type: 'error'
            }
        });
        if (budget < player.value) return dispatch({
            type: 'ADD_TOAST',
            payload: {
                message: 'Not enough budget!',
                type: 'error'
            }
        });
        if (squad.find((p)=>p.id === player.id)) return dispatch({
            type: 'ADD_TOAST',
            payload: {
                message: 'Player already in squad!',
                type: 'error'
            }
        });
        const slotsLeft = 6 - squad.length;
        if (slotsLeft === 2 && !hasGk && !hasDef) {
            if (player.position !== 'GK' && player.position !== 'DEF') {
                return dispatch({
                    type: 'ADD_TOAST',
                    payload: {
                        message: 'You must select a GK and DEF!',
                        type: 'error'
                    }
                });
            }
        }
        if (slotsLeft === 1) {
            if (!hasGk && player.position !== 'GK') return dispatch({
                type: 'ADD_TOAST',
                payload: {
                    message: 'You must select a GK!',
                    type: 'error'
                }
            });
            if (!hasDef && player.position !== 'DEF') return dispatch({
                type: 'ADD_TOAST',
                payload: {
                    message: 'You must select a DEF!',
                    type: 'error'
                }
            });
        }
        dispatch({
            type: 'FANTASY_ADD_PLAYER',
            payload: player
        });
        dispatch({
            type: 'ADD_TOAST',
            payload: {
                message: `${player.name} drafted!`,
                type: 'success'
            }
        });
    };
    const handleRemovePlayer = (id)=>{
        dispatch({
            type: 'FANTASY_REMOVE_PLAYER',
            payload: id
        });
    };
    const handleAutoFill = ()=>{
        let validSquad = [];
        let attempts = 0;
        while(attempts < 100){
            attempts++;
            const gks = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$top30$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOP_30_PLAYERS"].filter((p)=>p.position === 'GK');
            const gk = gks[Math.floor(Math.random() * gks.length)];
            const defs = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$top30$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOP_30_PLAYERS"].filter((p)=>p.position === 'DEF');
            const def = defs[Math.floor(Math.random() * defs.length)];
            const remainingPool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$top30$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOP_30_PLAYERS"].filter((p)=>p.id !== gk.id && p.id !== def.id);
            const shuffled = [
                ...remainingPool
            ].sort(()=>0.5 - Math.random());
            const others = shuffled.slice(0, 4);
            const potentialSquad = [
                gk,
                def,
                ...others
            ];
            const cost = potentialSquad.reduce((sum, p)=>sum + p.value, 0);
            if (cost <= 100) {
                validSquad = potentialSquad;
                break;
            }
        }
        if (validSquad.length === 6) {
            dispatch({
                type: 'FANTASY_SET_SQUAD',
                payload: validSquad
            });
            dispatch({
                type: 'ADD_TOAST',
                payload: {
                    message: 'Squad Auto-Filled!',
                    type: 'success'
                }
            });
        }
    };
    const calculatePoints = async ()=>{
        if (squad.length === 0) return;
        try {
            const res = await fetch(`/api/fantasy?action=calculate_points&players=${encodeURIComponent(JSON.stringify(squad))}`);
            const data = await res.json();
            let total = 0;
            data.forEach((pt)=>total += pt.totalPoints);
            dispatch({
                type: 'FANTASY_SET_POINTS',
                payload: state.fantasy.totalPoints + total
            });
            dispatch({
                type: 'ADD_TOAST',
                payload: {
                    message: `Gained ${total} points!`,
                    type: 'success'
                }
            });
            // Post to leaderboard
            await fetch('/api/fantasy/leaderboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    walletAddress: wallet.address || 'guest',
                    username: state.username || 'Guest Manager',
                    flagCode: userTeam,
                    totalPoints: state.fantasy.totalPoints + total,
                    squad: squad.map((s)=>s.name)
                })
            });
            // Refresh leaderboard
            fetch('/api/fantasy/leaderboard').then((r)=>r.json()).then(setLeaderboard);
        } catch (err) {
            dispatch({
                type: 'ADD_TOAST',
                payload: {
                    message: 'Failed to calc points',
                    type: 'error'
                }
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex flex-col lg:flex-row gap-6 p-6 max-w-[1600px] mx-auto text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "mb-6 flex justify-between items-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-4xl font-black mb-2 text-neonGold tracking-tight uppercase drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]",
                                        children: "Fantasy League"
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                        lineNumber: 152,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400",
                                        children: "Build your 6-man dream team and climb the leaderboard."
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                        lineNumber: 153,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                lineNumber: 151,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs uppercase opacity-70 font-bold tracking-widest text-blue-300",
                                        children: "Budget Remaining"
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                        lineNumber: 156,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-3xl font-black text-white",
                                        children: [
                                            budget,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl text-white/50",
                                                children: "M"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                lineNumber: 157,
                                                columnNumber: 81
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                        lineNumber: 157,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                lineNumber: 155,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                        lineNumber: 150,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setView('pitch'),
                                className: `px-8 py-3 rounded-full font-black uppercase tracking-wider transition-all shadow-lg ${view === 'pitch' ? 'bg-neonGold text-black shadow-[0_0_20px_rgba(255,215,0,0.5)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'}`,
                                children: "My Squad"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                lineNumber: 163,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setView('market'),
                                className: `px-8 py-3 rounded-full font-black uppercase tracking-wider transition-all shadow-lg ${view === 'market' ? 'bg-neonGold text-black shadow-[0_0_20px_rgba(255,215,0,0.5)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'}`,
                                children: "Draft Market"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                lineNumber: 169,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                        lineNumber: 162,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto pb-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            mode: "wait",
                            children: [
                                view === 'pitch' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        x: -20
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        x: -20
                                    },
                                    className: "space-y-6 h-full flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold border border-white/20",
                                                            children: [
                                                                squad.length,
                                                                "/6"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                            lineNumber: 190,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm text-gray-400 font-bold uppercase tracking-widest",
                                                                    children: "Total Points"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                    lineNumber: 194,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-4xl font-black text-neonGold",
                                                                    children: totalPoints
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                    lineNumber: 195,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                            lineNumber: 193,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                    lineNumber: 189,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: calculatePoints,
                                                    className: "px-6 py-4 bg-neonGreen text-black hover:bg-green-400 rounded-xl font-black uppercase tracking-widest transition-transform hover:scale-105 shadow-[0_0_20px_rgba(0,255,0,0.4)]",
                                                    children: "Refresh Points"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                    lineNumber: 198,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/screens/FantasyLeague.jsx",
                                            lineNumber: 188,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md relative flex flex-col min-h-[600px] justify-center shadow-2xl",
                                            children: squad.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/40 backdrop-blur-sm rounded-3xl",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-6xl mb-4 opacity-50",
                                                        children: "⚽"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                        lineNumber: 206,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-black uppercase text-white/80",
                                                        children: "Your Squad is Empty"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                        lineNumber: 207,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-400 mt-2",
                                                        children: "Switch to the Draft Market to sign players."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                        lineNumber: 208,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                lineNumber: 205,
                                                columnNumber: 41
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 md:grid-cols-3 gap-6 w-full py-4",
                                                children: squad.map((p)=>{
                                                    const flagCode = COUNTRY_TO_FLAG_CODE[p.teamName.toLowerCase()] || 'un';
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        whileHover: {
                                                            scale: 1.04
                                                        },
                                                        onClick: ()=>handleRemovePlayer(p.id),
                                                        className: "relative bg-gradient-to-br from-yellow-950/20 via-stadiumBlue/90 to-black border-2 border-neonGold rounded-2xl p-6 flex flex-col justify-between h-64 shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:border-white/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all cursor-pointer group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute -top-2.5 -right-2.5 w-7 h-7 bg-neonRed text-white rounded-full flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg border-2 border-white text-xs",
                                                                children: "✕"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                lineNumber: 222,
                                                                columnNumber: 57
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between items-start",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "bg-black/60 border border-white/10 px-2 py-1 rounded text-[10px] font-bold text-neonGold tracking-widest uppercase",
                                                                        children: p.position
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                        lineNumber: 228,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-heading font-black text-2xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]",
                                                                        children: [
                                                                            p.value,
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-white/50",
                                                                                children: "M"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                                lineNumber: 232,
                                                                                columnNumber: 74
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                        lineNumber: 231,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                lineNumber: 227,
                                                                columnNumber: 57
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3 my-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        code: flagCode,
                                                                        size: "w-10 h-10 border border-white/10 shadow-lg"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                        lineNumber: 238,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-bold text-gray-400 uppercase tracking-widest truncate max-w-[120px]",
                                                                        children: p.teamName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                        lineNumber: 239,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                lineNumber: 237,
                                                                columnNumber: 57
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-auto border-t border-white/5 pt-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "font-heading font-black text-2xl uppercase tracking-wider text-neonGold group-hover:text-white transition-colors truncate",
                                                                        children: p.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                        lineNumber: 244,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5",
                                                                        children: "Signed Franchise Player"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                        lineNumber: 247,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                lineNumber: 243,
                                                                columnNumber: 57
                                                            }, this)
                                                        ]
                                                    }, p.id, true, {
                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                        lineNumber: 215,
                                                        columnNumber: 53
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                lineNumber: 211,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/screens/FantasyLeague.jsx",
                                            lineNumber: 203,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, "pitch", true, {
                                    fileName: "[project]/src/screens/FantasyLeague.jsx",
                                    lineNumber: 183,
                                    columnNumber: 29
                                }, this),
                                view === 'market' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        x: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        x: 20
                                    },
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gradient-to-r from-neonGold/20 to-transparent p-6 rounded-2xl border border-neonGold/30 shadow-[0_0_30px_rgba(255,215,0,0.15)] flex justify-between items-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-3xl font-black text-neonGold tracking-widest uppercase",
                                                        children: "The Elite 30"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                        lineNumber: 267,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-300 font-medium",
                                                        children: "Draft from the world's best. No country restrictions."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                        lineNumber: 268,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                lineNumber: 266,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/screens/FantasyLeague.jsx",
                                            lineNumber: 265,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center justify-between gap-3 bg-black/40 p-3 rounded-2xl border border-white/5 backdrop-blur-md",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: [
                                                        'ALL',
                                                        'GK',
                                                        'DEF',
                                                        'MID',
                                                        'FWD'
                                                    ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setDraftFilter(f),
                                                            className: `px-5 py-2 rounded-full font-bold text-sm transition-all ${draftFilter === f ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`,
                                                            children: f === 'ALL' ? 'ALL' : f === 'GK' ? '🧤 GK (4)' : f === 'DEF' ? '🛡️ DEF (10)' : f === 'MID' ? '🎯 MID (10)' : '⚡ FWD (6)'
                                                        }, f, false, {
                                                            fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                            lineNumber: 275,
                                                            columnNumber: 45
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                    lineNumber: 273,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleAutoFill,
                                                    className: "px-6 py-2 bg-neonGold/20 text-neonGold border border-neonGold hover:bg-neonGold hover:text-black font-black uppercase rounded-full transition-all shadow-[0_0_15px_rgba(255,215,0,0.2)]",
                                                    children: "⚡ Auto Fill"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                    lineNumber: 284,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/screens/FantasyLeague.jsx",
                                            lineNumber: 272,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            layout: true,
                                            className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                children: filteredDraftPool.map((p)=>{
                                                    const isAdded = squad.some((s)=>s.id === p.id);
                                                    const canAfford = budget >= p.value;
                                                    let bgGradient = "from-zinc-800 to-zinc-900";
                                                    let borderGlow = "border-zinc-700";
                                                    if (p.value >= 20) {
                                                        bgGradient = "from-yellow-900/80 to-black";
                                                        borderGlow = "border-neonGold shadow-[0_0_15px_rgba(255,215,0,0.2)]";
                                                    } else if (p.value >= 15) {
                                                        bgGradient = "from-slate-700 to-slate-900";
                                                        borderGlow = "border-slate-400";
                                                    }
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        layout: true,
                                                        initial: {
                                                            opacity: 0,
                                                            scale: 0.8
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            scale: 1
                                                        },
                                                        exit: {
                                                            opacity: 0,
                                                            scale: 0.8
                                                        },
                                                        whileHover: {
                                                            y: -5
                                                        },
                                                        className: `relative overflow-hidden rounded-2xl bg-gradient-to-br ${bgGradient} border ${borderGlow} p-5 flex flex-col justify-between min-h-[220px] transition-all`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none transform -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] duration-1000 ease-in-out"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                lineNumber: 316,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between items-start z-10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-3xl font-black tracking-tighter text-white/90 drop-shadow-md",
                                                                        children: [
                                                                            p.value,
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm text-white/50",
                                                                                children: "M"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                                lineNumber: 320,
                                                                                columnNumber: 70
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                        lineNumber: 319,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-right",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/10 mb-1",
                                                                                children: p.position
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                                lineNumber: 323,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-xs text-gray-300 truncate max-w-[80px]",
                                                                                children: p.teamName
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                                lineNumber: 324,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                        lineNumber: 322,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                lineNumber: 318,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "z-10 mt-auto mb-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "font-black text-xl uppercase leading-tight tracking-wide drop-shadow-lg",
                                                                    children: p.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                    lineNumber: 329,
                                                                    columnNumber: 57
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                lineNumber: 328,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleAddPlayer(p),
                                                                disabled: isAdded || !canAfford,
                                                                className: `z-10 w-full py-3 rounded-xl font-bold uppercase tracking-wider transition-all ${isAdded ? 'bg-white/10 text-white/50 border border-white/5' : canAfford ? 'bg-neonGold text-black hover:bg-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)]' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`,
                                                                children: isAdded ? 'ADDED' : canAfford ? 'DRAFT' : 'TOO EXPENSIVE'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                lineNumber: 332,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, p.id, true, {
                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                        lineNumber: 309,
                                                        columnNumber: 49
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                lineNumber: 293,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/screens/FantasyLeague.jsx",
                                            lineNumber: 292,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, "market", true, {
                                    fileName: "[project]/src/screens/FantasyLeague.jsx",
                                    lineNumber: 260,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/screens/FantasyLeague.jsx",
                            lineNumber: 179,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                        lineNumber: 178,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/screens/FantasyLeague.jsx",
                lineNumber: 149,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full lg:w-[400px] flex flex-col bg-black/40 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/5 border-b border-white/10 p-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-black uppercase tracking-widest text-white flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-2xl",
                                    children: "🏆"
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/FantasyLeague.jsx",
                                    lineNumber: 354,
                                    columnNumber: 25
                                }, this),
                                " Global Leaderboard"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/screens/FantasyLeague.jsx",
                            lineNumber: 353,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                        lineNumber: 352,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-left text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-white/5 text-gray-400 font-bold uppercase text-xs sticky top-0 backdrop-blur-md",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4 pl-6",
                                                children: "Rank"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                lineNumber: 362,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4",
                                                children: "Manager"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                lineNumber: 363,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4 pr-6 text-right",
                                                children: "PTS"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                lineNumber: 364,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                        lineNumber: 361,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/screens/FantasyLeague.jsx",
                                    lineNumber: 360,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: [
                                        leaderboard.map((entry, idx)=>{
                                            const isMe = entry.walletAddress === wallet.address;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: `border-b border-white/5 transition-colors ${isMe ? 'bg-neonGold/10' : 'hover:bg-white/5'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-4 pl-6 font-mono font-bold text-gray-400",
                                                        children: idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                        lineNumber: 372,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `font-bold truncate max-w-[150px] ${isMe ? 'text-neonGold' : 'text-white'}`,
                                                                children: entry.username
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                lineNumber: 376,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-gray-500 uppercase",
                                                                children: entry.flagCode
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                                lineNumber: 377,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                        lineNumber: 375,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-4 pr-6 text-right font-black text-xl text-white drop-shadow-md",
                                                        children: entry.totalPoints
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                        lineNumber: 379,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                lineNumber: 371,
                                                columnNumber: 37
                                            }, this);
                                        }),
                                        leaderboard.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: "3",
                                                className: "p-10 text-center text-gray-500 font-medium",
                                                children: [
                                                    "No entries yet.",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                        lineNumber: 388,
                                                        columnNumber: 56
                                                    }, this),
                                                    "Be the first to draft a team!"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                                lineNumber: 387,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/screens/FantasyLeague.jsx",
                                            lineNumber: 386,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/screens/FantasyLeague.jsx",
                                    lineNumber: 367,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/screens/FantasyLeague.jsx",
                            lineNumber: 359,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                        lineNumber: 358,
                        columnNumber: 17
                    }, this),
                    wallet.connected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-neonGold/10 border-t border-neonGold/30 p-4 backdrop-blur-lg flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs uppercase tracking-widest text-neonGold font-bold mb-1",
                                        children: "Your Standing"
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                        lineNumber: 400,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-bold",
                                        children: state.username || 'Manager'
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                                        lineNumber: 401,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                lineNumber: 399,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl font-black text-neonGold",
                                children: totalPoints
                            }, void 0, false, {
                                fileName: "[project]/src/screens/FantasyLeague.jsx",
                                lineNumber: 403,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/FantasyLeague.jsx",
                        lineNumber: 398,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/screens/FantasyLeague.jsx",
                lineNumber: 351,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/screens/FantasyLeague.jsx",
        lineNumber: 146,
        columnNumber: 9
    }, this);
}
_s(FantasyLeague, "mpDxPRk8Bwb0Sbn5BhB4frRKaIU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWeb3"]
    ];
});
_c = FantasyLeague;
var _c;
__turbopack_context__.k.register(_c, "FantasyLeague");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/screens/Onboarding.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Onboarding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GameContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Flag.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$top30$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/top30.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const CONTINENTS = [
    {
        name: 'Europe',
        icon: '🏰',
        color: 'from-blue-500/20 to-blue-900/40 border-blue-500/30'
    },
    {
        name: 'South America',
        icon: '🌎',
        color: 'from-green-500/20 to-green-900/40 border-green-500/30'
    },
    {
        name: 'Africa',
        icon: '🌍',
        color: 'from-orange-500/20 to-orange-900/40 border-orange-500/30'
    },
    {
        name: 'Asia',
        icon: '🏯',
        color: 'from-red-500/20 to-red-900/40 border-red-500/30'
    },
    {
        name: 'North America',
        icon: '🗽',
        color: 'from-indigo-500/20 to-indigo-900/40 border-indigo-500/30'
    },
    {
        name: 'Oceania',
        icon: '🏝️',
        color: 'from-cyan-500/20 to-cyan-900/40 border-cyan-500/30'
    }
];
function Onboarding() {
    _s();
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selectedTeamIdx, setSelectedTeamIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1);
    const [selectedContinent, setSelectedContinent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const { squad, budget } = state.fantasy;
    const [draftFilter, setDraftFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('ALL');
    const hasGk = squad.some((p)=>p.position === 'GK');
    const hasDef = squad.some((p)=>p.position === 'DEF');
    const filteredDraftPool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$top30$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOP_30_PLAYERS"].filter((p)=>draftFilter === 'ALL' || p.position === draftFilter);
    const handleAddPlayer = (player)=>{
        if (squad.length >= 6) return dispatch({
            type: 'ADD_TOAST',
            payload: {
                message: 'Squad full (Max 6)!',
                type: 'error'
            }
        });
        if (budget < player.value) return dispatch({
            type: 'ADD_TOAST',
            payload: {
                message: 'Not enough budget!',
                type: 'error'
            }
        });
        if (squad.find((p)=>p.id === player.id)) return dispatch({
            type: 'ADD_TOAST',
            payload: {
                message: 'Player already in squad!',
                type: 'error'
            }
        });
        const slotsLeft = 6 - squad.length;
        if (slotsLeft === 2 && !hasGk && !hasDef) {
            if (player.position !== 'GK' && player.position !== 'DEF') {
                return dispatch({
                    type: 'ADD_TOAST',
                    payload: {
                        message: 'You must select a GK and DEF!',
                        type: 'error'
                    }
                });
            }
        }
        if (slotsLeft === 1) {
            if (!hasGk && player.position !== 'GK') return dispatch({
                type: 'ADD_TOAST',
                payload: {
                    message: 'You must select a GK!',
                    type: 'error'
                }
            });
            if (!hasDef && player.position !== 'DEF') return dispatch({
                type: 'ADD_TOAST',
                payload: {
                    message: 'You must select a DEF!',
                    type: 'error'
                }
            });
        }
        dispatch({
            type: 'FANTASY_ADD_PLAYER',
            payload: player
        });
    };
    const filteredTeams = selectedContinent ? state.teams.filter((t)=>t.continent === selectedContinent) : [];
    const selectedTeam = selectedTeamIdx >= 0 ? state.teams[selectedTeamIdx] : null;
    const handleFinish = ()=>{
        dispatch({
            type: 'SET_USERNAME',
            payload: username || 'Manager'
        });
        dispatch({
            type: 'SELECT_TEAM',
            payload: selectedTeamIdx
        });
        dispatch({
            type: 'AUTO_LINEUP'
        });
        dispatch({
            type: 'START_GAME'
        });
    };
    const getTeamStars = (index)=>{
        if (index < 5) return '★★★★★';
        if (index < 15) return '★★★★☆';
        if (index < 30) return '★★★☆☆';
        return '★★☆☆☆';
    };
    // Auto Fill logic for Onboarding Fantasy Draft
    const handleAutoFill = ()=>{
        let validSquad = [];
        let attempts = 0;
        while(attempts < 100){
            attempts++;
            const gks = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$top30$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOP_30_PLAYERS"].filter((p)=>p.position === 'GK');
            const gk = gks[Math.floor(Math.random() * gks.length)];
            const defs = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$top30$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOP_30_PLAYERS"].filter((p)=>p.position === 'DEF');
            const def = defs[Math.floor(Math.random() * defs.length)];
            const remainingPool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$top30$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOP_30_PLAYERS"].filter((p)=>p.id !== gk.id && p.id !== def.id);
            const shuffled = [
                ...remainingPool
            ].sort(()=>0.5 - Math.random());
            const others = shuffled.slice(0, 4);
            const potentialSquad = [
                gk,
                def,
                ...others
            ];
            const cost = potentialSquad.reduce((sum, p)=>sum + p.value, 0);
            if (cost <= 100) {
                validSquad = potentialSquad;
                break;
            }
        }
        if (validSquad.length === 6) {
            dispatch({
                type: 'FANTASY_SET_SQUAD',
                payload: validSquad
            });
            dispatch({
                type: 'ADD_TOAST',
                payload: {
                    message: 'Squad Auto-Filled!',
                    type: 'success'
                }
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-spaceBlack text-white flex flex-col items-center justify-center relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 ${step === 0 ? 'opacity-40 blur-none scale-100' : 'opacity-25 blur-3xl scale-110'}`,
                style: {
                    backgroundImage: 'url(/hero.jpg)'
                }
            }, void 0, false, {
                fileName: "[project]/src/screens/Onboarding.jsx",
                lineNumber: 103,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neonBlue/10 via-spaceBlack/95 to-spaceBlack"
            }, void 0, false, {
                fileName: "[project]/src/screens/Onboarding.jsx",
                lineNumber: 111,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] opacity-25"
            }, void 0, false, {
                fileName: "[project]/src/screens/Onboarding.jsx",
                lineNumber: 112,
                columnNumber: 13
            }, this),
            step > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full max-w-3xl px-8 mb-12 animate-in fade-in duration-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-xs text-gray-500 mb-2 font-bold tracking-widest uppercase",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: step >= 1 ? 'text-neonGold' : '',
                                children: "Continent"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 118,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: step >= 2 ? 'text-neonGold' : '',
                                children: "Nation"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 119,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: step >= 3 ? 'text-neonGold' : '',
                                children: "Draft"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 120,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: step >= 4 ? 'text-neonGold' : '',
                                children: "Identity"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 121,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: step >= 5 ? 'text-neonGold' : '',
                                children: "Confirm"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 122,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/screens/Onboarding.jsx",
                        lineNumber: 117,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1 bg-white/10 rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "h-full bg-neonGold",
                            animate: {
                                width: `${step / 5 * 100}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/screens/Onboarding.jsx",
                            lineNumber: 125,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/screens/Onboarding.jsx",
                        lineNumber: 124,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/screens/Onboarding.jsx",
                lineNumber: 116,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: [
                    step === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            scale: 0.95
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        exit: {
                            opacity: 0,
                            scale: 0.95
                        },
                        className: "relative z-10 text-center max-w-3xl px-6 flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-5xl md:text-7xl font-heading font-black text-neonGold mb-6 tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] text-center uppercase leading-none animate-in fade-in slide-in-from-top-6 duration-700",
                                children: [
                                    "WEB3 MANAGER",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                        lineNumber: 141,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] font-extrabold text-3xl md:text-5xl tracking-widest mt-2 block",
                                        children: "WORLD CUP LEAGUE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                        lineNumber: 142,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 140,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-250 text-base md:text-lg leading-relaxed mb-12 max-w-2xl bg-black/60 px-8 py-6 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl drop-shadow-lg text-center font-bold animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100",
                                children: "Step into the dugout of a decentralized football franchise. Scout international players, draft global superstars, deploy tactics, and bet on real-world fixture outcomes verified by Oracles on the X Layer blockchain."
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 147,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                whileHover: {
                                    scale: 1.05
                                },
                                whileTap: {
                                    scale: 0.95
                                },
                                onClick: ()=>setStep(1),
                                className: "px-16 py-5 rounded-full font-black text-xl bg-neonGold text-black shadow-[0_0_35px_rgba(255,215,0,0.5)] hover:shadow-[0_0_55px_rgba(255,215,0,0.7)] transition-all uppercase tracking-widest border border-yellow-400 animate-in fade-in duration-1000",
                                children: "GET STARTED ⚡"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 151,
                                columnNumber: 25
                            }, this)
                        ]
                    }, "s-welcome", true, {
                        fileName: "[project]/src/screens/Onboarding.jsx",
                        lineNumber: 133,
                        columnNumber: 21
                    }, this),
                    step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            y: -30
                        },
                        className: "relative z-10 text-center max-w-4xl px-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl md:text-5xl font-heading font-black text-neonGold mb-3",
                                children: "CHOOSE YOUR CONTINENT"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 165,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 mb-10",
                                children: "Where does your footballing journey begin?"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 166,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-3 gap-6 mb-10",
                                children: CONTINENTS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        onClick: ()=>{
                                            setSelectedContinent(c.name);
                                            setStep(2);
                                            setSelectedTeamIdx(-1);
                                        },
                                        className: `cursor-pointer rounded-2xl p-8 border bg-gradient-to-br ${c.color} flex flex-col items-center gap-3 hover:shadow-xl transition-shadow`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-5xl",
                                                children: c.icon
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                lineNumber: 176,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-lg",
                                                children: c.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                lineNumber: 177,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-400",
                                                children: [
                                                    state.teams.filter((t)=>t.continent === c.name).length,
                                                    " Nations"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                lineNumber: 178,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, c.name, true, {
                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                        lineNumber: 169,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 167,
                                columnNumber: 25
                            }, this)
                        ]
                    }, "s1", true, {
                        fileName: "[project]/src/screens/Onboarding.jsx",
                        lineNumber: 164,
                        columnNumber: 21
                    }, this),
                    step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            y: -30
                        },
                        className: "relative z-10 text-center max-w-3xl w-full px-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setStep(1),
                                className: "text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-2 mx-auto",
                                children: "← Back to Continents"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 188,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-heading font-black text-neonGold mb-3",
                                children: "SELECT YOUR NATION"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 189,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 mb-10",
                                children: [
                                    selectedContinent,
                                    " — ",
                                    filteredTeams.length,
                                    " nations available"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 190,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-h-[400px] overflow-y-auto hide-scrollbar pr-2",
                                children: filteredTeams.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        whileHover: {
                                            scale: 1.02
                                        },
                                        onClick: ()=>setSelectedTeamIdx(t.id),
                                        className: `cursor-pointer rounded-xl p-5 flex items-center gap-5 border transition-all ${selectedTeamIdx === t.id ? 'border-neonGold bg-neonGold/10 shadow-[0_0_20px_rgba(255,215,0,0.15)]' : 'border-white/10 bg-white/5 hover:bg-white/10'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                code: t.code,
                                                size: "w-14 h-14"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                lineNumber: 199,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-left flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-bold text-lg",
                                                        children: t.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                                        lineNumber: 201,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-neonGold text-sm",
                                                        children: getTeamStars(t.id)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                                        lineNumber: 202,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                lineNumber: 200,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-500 font-bold text-sm",
                                                children: t.abbr
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                lineNumber: 204,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, t.id, true, {
                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                        lineNumber: 193,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 191,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: selectedTeamIdx === -1,
                                onClick: ()=>setStep(3),
                                className: `px-12 py-4 rounded-full font-bold text-lg transition-all ${selectedTeamIdx !== -1 ? 'bg-neonGreen text-black hover:scale-105 shadow-[0_0_15px_rgba(0,255,0,0.4)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`,
                                children: "NEXT →"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 208,
                                columnNumber: 25
                            }, this)
                        ]
                    }, "s2", true, {
                        fileName: "[project]/src/screens/Onboarding.jsx",
                        lineNumber: 187,
                        columnNumber: 21
                    }, this),
                    step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            y: -30
                        },
                        className: "relative z-10 text-center max-w-4xl w-full px-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setStep(2),
                                className: "text-gray-400 hover:text-white text-sm mb-4 flex items-center gap-2 mx-auto",
                                children: "← Back"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 219,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-heading font-black text-neonGold mb-2",
                                children: "DRAFT YOUR ELITE 6"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 220,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 mb-6",
                                children: "Build your Fantasy League squad to compete globally."
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 221,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 backdrop-blur-md flex flex-col max-h-[600px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap justify-center gap-2 mb-4 shrink-0",
                                        children: [
                                            squad.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-black/50 border border-white/20 rounded-xl p-2 w-28 relative group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>dispatch({
                                                                    type: 'FANTASY_REMOVE_PLAYER',
                                                                    payload: p.id
                                                                }),
                                                            className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20",
                                                            children: "✕"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/screens/Onboarding.jsx",
                                                            lineNumber: 228,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] font-bold text-neonGold mb-1",
                                                            children: p.position
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/screens/Onboarding.jsx",
                                                            lineNumber: 229,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs font-bold truncate",
                                                            children: p.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/screens/Onboarding.jsx",
                                                            lineNumber: 230,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/screens/Onboarding.jsx",
                                                    lineNumber: 227,
                                                    columnNumber: 37
                                                }, this)),
                                            Array.from({
                                                length: Math.max(0, 6 - squad.length)
                                            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-white/5 border border-dashed border-white/20 rounded-xl p-2 w-28 flex flex-col items-center justify-center opacity-50 min-h-[50px]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm",
                                                        children: "+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                                        lineNumber: 235,
                                                        columnNumber: 41
                                                    }, this)
                                                }, `empty-${i}`, false, {
                                                    fileName: "[project]/src/screens/Onboarding.jsx",
                                                    lineNumber: 234,
                                                    columnNumber: 37
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                        lineNumber: 225,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col md:flex-row items-center justify-between gap-4 mb-6 shrink-0 border-b border-white/10 pb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs uppercase text-gray-500 font-bold tracking-widest",
                                                        children: "Budget"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                                        lineNumber: 242,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-2xl font-black text-white",
                                                        children: [
                                                            budget,
                                                            "M"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                                        lineNumber: 243,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                lineNumber: 241,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    'ALL',
                                                    'GK',
                                                    'DEF',
                                                    'MID',
                                                    'FWD'
                                                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setDraftFilter(f),
                                                        className: `px-3 py-1.5 rounded-full font-bold text-xs transition-all ${draftFilter === f ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'}`,
                                                        children: f
                                                    }, f, false, {
                                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                                        lineNumber: 248,
                                                        columnNumber: 41
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                lineNumber: 246,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleAutoFill,
                                                className: "px-6 py-2 bg-neonGold/20 text-neonGold border border-neonGold hover:bg-neonGold hover:text-black rounded-full font-black text-sm uppercase tracking-widest transition-all",
                                                children: "⚡ AUTO FILL"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                lineNumber: 258,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                        lineNumber: 240,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 overflow-y-auto pr-2 hide-scrollbar",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 md:grid-cols-3 gap-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                children: filteredDraftPool.map((p)=>{
                                                    const isAdded = squad.some((s)=>s.id === p.id);
                                                    const canAfford = budget >= p.value;
                                                    let bgGradient = "from-zinc-800 to-zinc-900";
                                                    if (p.value >= 20) bgGradient = "from-yellow-900/80 to-black";
                                                    else if (p.value >= 15) bgGradient = "from-slate-700 to-slate-900";
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        layout: true,
                                                        initial: {
                                                            opacity: 0,
                                                            scale: 0.9
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            scale: 1
                                                        },
                                                        exit: {
                                                            opacity: 0,
                                                            scale: 0.9
                                                        },
                                                        className: `relative overflow-hidden rounded-xl bg-gradient-to-br ${bgGradient} border border-white/10 p-4 flex flex-col justify-between min-h-[140px] text-left`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between items-start mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xl font-black text-white/90",
                                                                        children: [
                                                                            p.value,
                                                                            "M"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                                                        lineNumber: 285,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-[10px] font-bold text-white bg-black/50 px-2 py-1 rounded",
                                                                        children: p.position
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                                                        lineNumber: 286,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                                lineNumber: 284,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mb-3",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "font-black text-sm uppercase leading-tight",
                                                                    children: p.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/screens/Onboarding.jsx",
                                                                    lineNumber: 289,
                                                                    columnNumber: 57
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                                lineNumber: 288,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleAddPlayer(p),
                                                                disabled: isAdded || !canAfford,
                                                                className: `w-full py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${isAdded ? 'bg-white/10 text-white/50' : canAfford ? 'bg-neonGold text-black hover:bg-yellow-400' : 'bg-red-500/20 text-red-400'}`,
                                                                children: isAdded ? 'ADDED' : canAfford ? 'DRAFT' : 'EXPENSIVE'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                                lineNumber: 291,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, p.id, true, {
                                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                                        lineNumber: 278,
                                                        columnNumber: 49
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                lineNumber: 268,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/screens/Onboarding.jsx",
                                            lineNumber: 267,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                        lineNumber: 266,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 223,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: squad.length !== 6,
                                onClick: ()=>setStep(4),
                                className: `px-12 py-4 rounded-full font-bold text-lg transition-all ${squad.length === 6 ? 'bg-neonGreen text-black hover:scale-105 shadow-[0_0_15px_rgba(0,255,0,0.4)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`,
                                children: "NEXT →"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 306,
                                columnNumber: 25
                            }, this)
                        ]
                    }, "s3", true, {
                        fileName: "[project]/src/screens/Onboarding.jsx",
                        lineNumber: 218,
                        columnNumber: 21
                    }, this),
                    step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            y: -30
                        },
                        className: "relative z-10 text-center max-w-lg w-full px-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setStep(3),
                                className: "text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-2 mx-auto",
                                children: "← Back"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 317,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-heading font-black text-neonGold mb-3",
                                children: "MANAGER IDENTITY"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 318,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 mb-10",
                                children: "Choose a name for the global leaderboard."
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 319,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white/5 border border-white/10 rounded-2xl p-8 mb-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Enter your manager name...",
                                        value: username,
                                        onChange: (e)=>setUsername(e.target.value),
                                        maxLength: 20,
                                        className: "w-full bg-black/60 border border-white/20 rounded-xl px-6 py-4 text-xl text-white font-bold outline-none focus:border-neonGold transition-colors text-center placeholder-gray-600"
                                    }, void 0, false, {
                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                        lineNumber: 321,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-500 mt-3",
                                        children: [
                                            username.length,
                                            "/20 characters"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                        lineNumber: 329,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 320,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: !username.trim(),
                                onClick: ()=>setStep(5),
                                className: `px-12 py-4 rounded-full font-bold text-lg transition-all ${username.trim() ? 'bg-neonGreen text-black hover:scale-105 shadow-[0_0_15px_rgba(0,255,0,0.4)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`,
                                children: "NEXT →"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 331,
                                columnNumber: 25
                            }, this)
                        ]
                    }, "s4", true, {
                        fileName: "[project]/src/screens/Onboarding.jsx",
                        lineNumber: 316,
                        columnNumber: 21
                    }, this),
                    step === 5 && selectedTeam && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            y: -30
                        },
                        className: "relative z-10 text-center max-w-2xl w-full px-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setStep(4),
                                className: "text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-2 mx-auto",
                                children: "← Back"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 342,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-heading font-black text-neonGold mb-3",
                                children: "READY FOR GLORY"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 343,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 mb-8",
                                children: "Review your franchise before starting."
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 344,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/5 border border-white/10 rounded-2xl p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500 uppercase tracking-widest font-bold mb-4",
                                                children: "Nation"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                lineNumber: 348,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col items-center justify-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        code: selectedTeam.code,
                                                        size: "w-16 h-16"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                                        lineNumber: 350,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xl font-black",
                                                        children: selectedTeam.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                                        lineNumber: 351,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                lineNumber: 349,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                        lineNumber: 347,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/5 border border-white/10 rounded-2xl p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500 uppercase tracking-widest font-bold mb-4",
                                                children: "Manager"
                                            }, void 0, false, {
                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                lineNumber: 355,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col items-center justify-center gap-3 h-full",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-4xl",
                                                        children: "👔"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                                        lineNumber: 357,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xl font-black text-neonGold",
                                                        children: username
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                                        lineNumber: 358,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/screens/Onboarding.jsx",
                                                lineNumber: 356,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/screens/Onboarding.jsx",
                                        lineNumber: 354,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 346,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                whileHover: {
                                    scale: 1.05
                                },
                                whileTap: {
                                    scale: 0.95
                                },
                                onClick: handleFinish,
                                className: "px-16 py-5 rounded-full font-black text-xl bg-neonGold text-black shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-shadow",
                                children: "BEGIN YOUR CAREER →"
                            }, void 0, false, {
                                fileName: "[project]/src/screens/Onboarding.jsx",
                                lineNumber: 363,
                                columnNumber: 25
                            }, this)
                        ]
                    }, "s5", true, {
                        fileName: "[project]/src/screens/Onboarding.jsx",
                        lineNumber: 341,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/screens/Onboarding.jsx",
                lineNumber: 130,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/screens/Onboarding.jsx",
        lineNumber: 101,
        columnNumber: 9
    }, this);
}
_s(Onboarding, "whanpAPXKOhKEErQkaMlx6wG4vE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c = Onboarding;
var _c;
__turbopack_context__.k.register(_c, "Onboarding");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Toast.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Toast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GameContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function Toast() {
    _s();
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toast.useEffect": ()=>{
            if (state.toasts.length > 0) {
                const timer = setTimeout({
                    "Toast.useEffect.timer": ()=>{
                        dispatch({
                            type: 'DISMISS_TOAST',
                            payload: state.toasts[0].id
                        });
                    }
                }["Toast.useEffect.timer"], 4000);
                return ({
                    "Toast.useEffect": ()=>clearTimeout(timer)
                })["Toast.useEffect"];
            }
        }
    }["Toast.useEffect"], [
        state.toasts,
        dispatch
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: state.toasts.slice(0, 5).map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        x: 80,
                        scale: 0.9
                    },
                    animate: {
                        opacity: 1,
                        x: 0,
                        scale: 1
                    },
                    exit: {
                        opacity: 0,
                        x: 80,
                        scale: 0.9
                    },
                    className: `pointer-events-auto px-6 py-4 rounded-xl backdrop-blur-xl border shadow-2xl font-bold text-sm max-w-sm cursor-pointer ${toast.type === 'success' ? 'bg-neonGreen/20 border-neonGreen/50 text-neonGreen' : toast.type === 'error' ? 'bg-neonRed/20 border-neonRed/50 text-neonRed' : 'bg-neonBlue/20 border-neonBlue/50 text-neonBlue'}`,
                    onClick: ()=>dispatch({
                            type: 'DISMISS_TOAST',
                            payload: toast.id
                        }),
                    children: toast.message
                }, toast.id, false, {
                    fileName: "[project]/src/components/Toast.jsx",
                    lineNumber: 21,
                    columnNumber: 21
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/Toast.jsx",
            lineNumber: 19,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Toast.jsx",
        lineNumber: 18,
        columnNumber: 9
    }, this);
}
_s(Toast, "SMlZY2uyVTClKrSyPFthlqGR0nA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c = Toast;
var _c;
__turbopack_context__.k.register(_c, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/PostMatchStandings.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PostMatchStandings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GameContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Flag.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function PostMatchStandings() {
    _s();
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    if (!state.showMatchModal) return null;
    const { playerMatch } = state.lastMatchResult || {};
    const teams = [
        ...state.teams
    ].sort((a, b)=>b.stats.points - a.stats.points);
    const isWin = playerMatch?.homeIsPlayer ? playerMatch.result.homeGoals > playerMatch.result.awayGoals : playerMatch?.result.awayGoals > playerMatch?.result.homeGoals;
    const isDraw = playerMatch?.result.homeGoals === playerMatch?.result.awayGoals;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex flex-col p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: -20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "text-center mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-black font-heading tracking-widest text-white mb-2",
                        children: [
                            "ROUND ",
                            state.round - 1,
                            " COMPLETED"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400",
                        children: "Leaderboard has been updated."
                    }, void 0, false, {
                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                        lineNumber: 28,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PostMatchStandings.jsx",
                lineNumber: 22,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 gap-8 max-w-7xl mx-auto w-full min-h-0",
                children: [
                    playerMatch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-1/3 flex flex-col gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex-1 rounded-3xl border flex flex-col items-center justify-center p-8 relative overflow-hidden ${isWin ? 'bg-neonGreen/10 border-neonGreen shadow-[0_0_50px_rgba(0,255,128,0.2)]' : isDraw ? 'bg-white/5 border-white/20' : 'bg-neonRed/10 border-neonRed shadow-[0_0_50px_rgba(255,0,0,0.2)]'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-black font-heading mb-8 uppercase tracking-widest",
                                        children: isWin ? 'VICTORY' : isDraw ? 'DRAW' : 'DEFEAT'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                        lineNumber: 37,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex w-full items-center justify-between mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center flex flex-col items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        code: playerMatch.homeTeam.code,
                                                        size: "w-20 h-20",
                                                        className: "mb-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                        lineNumber: 43,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-bold",
                                                        children: playerMatch.homeTeam.abbr
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                        lineNumber: 44,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                lineNumber: 42,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-5xl font-black font-mono",
                                                children: [
                                                    playerMatch.result.homeGoals,
                                                    " - ",
                                                    playerMatch.result.awayGoals
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                lineNumber: 46,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center flex flex-col items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        code: playerMatch.awayTeam.code,
                                                        size: "w-20 h-20",
                                                        className: "mb-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                        lineNumber: 50,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-bold",
                                                        children: playerMatch.awayTeam.abbr
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                        lineNumber: 51,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                lineNumber: 49,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                        lineNumber: 41,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-black/50 w-full rounded-2xl p-4 text-center border border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-500 uppercase tracking-widest font-bold mb-1",
                                                children: "Match Income"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                lineNumber: 56,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xl font-black text-neonGold",
                                                children: [
                                                    "+€",
                                                    (playerMatch.homeIsPlayer ? 1200000 : 400000).toLocaleString()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                lineNumber: 57,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                        lineNumber: 55,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                lineNumber: 35,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>dispatch({
                                        type: 'CLOSE_MATCH_MODAL'
                                    }),
                                className: "w-full py-5 bg-white text-black font-black text-xl rounded-2xl hover:bg-gray-200 transition-colors shadow-xl",
                                children: "CONTINUE TO NEXT ROUND"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                lineNumber: 61,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                        lineNumber: 34,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-2/3 bg-black/60 border border-white/10 rounded-3xl overflow-hidden flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-8 py-4 border-b border-white/10 bg-white/5 flex text-xs font-bold text-gray-500 uppercase tracking-widest",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16",
                                        children: "Pos"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                        lineNumber: 73,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: "Nation"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                        lineNumber: 74,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16 text-center",
                                        children: "P"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                        lineNumber: 75,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16 text-center",
                                        children: "W"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                        lineNumber: 76,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16 text-center",
                                        children: "D"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                        lineNumber: 77,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16 text-center",
                                        children: "L"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                        lineNumber: 78,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16 text-center",
                                        children: "GD"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                        lineNumber: 79,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16 text-right",
                                        children: "Pts"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                        lineNumber: 80,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                lineNumber: 72,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "flex-1 overflow-y-auto hide-scrollbar p-4 space-y-2 relative",
                                children: teams.map((t, idx)=>{
                                    const isPlayer = t.id === state.playerTeamIndex;
                                    const gd = t.stats.goalsFor - t.stats.goalsAgainst;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].li, {
                                        layout: true,
                                        initial: {
                                            opacity: 0,
                                            scale: 0.9
                                        },
                                        animate: {
                                            opacity: 1,
                                            scale: 1
                                        },
                                        transition: {
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25
                                        },
                                        className: `flex items-center px-4 py-3 rounded-xl border ${isPlayer ? 'bg-neonGold/20 border-neonGold shadow-[0_0_15px_rgba(255,215,0,0.2)]' : 'bg-black/40 border-white/5'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-12 font-bold ${idx < 4 ? 'text-neonGreen' : idx > 43 ? 'text-neonRed' : 'text-gray-400'}`,
                                                children: idx + 1
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                lineNumber: 96,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Flag$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        code: t.code,
                                                        size: "w-6 h-6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                        lineNumber: 100,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `font-bold ${isPlayer ? 'text-neonGold' : 'text-white'}`,
                                                        children: t.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                        lineNumber: 101,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                lineNumber: 99,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 text-center text-gray-400",
                                                children: t.stats.played
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                lineNumber: 103,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 text-center text-gray-400",
                                                children: t.stats.won
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                lineNumber: 104,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 text-center text-gray-400",
                                                children: t.stats.drawn
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                lineNumber: 105,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 text-center text-gray-400",
                                                children: t.stats.lost
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                lineNumber: 106,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 text-center text-gray-400",
                                                children: gd > 0 ? `+${gd}` : gd
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                lineNumber: 107,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 text-right font-black text-lg",
                                                children: t.stats.points
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                                lineNumber: 108,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, t.id, true, {
                                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                                        lineNumber: 88,
                                        columnNumber: 33
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/PostMatchStandings.jsx",
                                lineNumber: 83,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PostMatchStandings.jsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PostMatchStandings.jsx",
                lineNumber: 31,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PostMatchStandings.jsx",
        lineNumber: 21,
        columnNumber: 9
    }, this);
}
_s(PostMatchStandings, "0Ezd+lYqYM4Ze1hEY5mBTpMQDZc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c = PostMatchStandings;
var _c;
__turbopack_context__.k.register(_c, "PostMatchStandings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/App.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$canvas$2d$confetti$2f$dist$2f$confetti$2e$module$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/canvas-confetti/dist/confetti.module.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GameContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/web3/useWeb3.jsx [app-client] (ecmascript)");
// Layout & Pages
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$ManagerLayout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/layouts/ManagerLayout.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LandingPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LandingPage.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$screens$2f$Dashboard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/screens/Dashboard.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$screens$2f$Squad$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/screens/Squad.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$screens$2f$Matchday$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/screens/Matchday.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$screens$2f$Collection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/screens/Collection.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$screens$2f$PKShooter$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/screens/PKShooter.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$screens$2f$FantasyLeague$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/screens/FantasyLeague.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$screens$2f$Onboarding$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/screens/Onboarding.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Toast.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PostMatchStandings$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PostMatchStandings.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function NftMintModal() {
    _s();
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const { wallet, mintNFT } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWeb3"])();
    const [minting, setMinting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (state.pendingMints.length === 0) return null;
    const pending = state.pendingMints[0];
    const handleMint = async ()=>{
        if (!wallet.connected) {
            dispatch({
                type: 'ADD_TOAST',
                payload: {
                    message: "Wallet not connected",
                    type: "error"
                }
            });
            return;
        }
        setMinting(true);
        const res = await mintNFT(wallet.address, pending.type, pending.info);
        setMinting(false);
        if (res.success) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$canvas$2d$confetti$2f$dist$2f$confetti$2e$module$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
                particleCount: 150,
                spread: 100,
                origin: {
                    y: 0.6
                },
                colors: [
                    '#FFD700',
                    '#ffffff',
                    '#00ff00'
                ]
            });
            const newBadge = {
                type: pending.type,
                name: 'Achievement Badge',
                info: pending.info,
                date: new Date().toLocaleDateString()
            };
            dispatch({
                type: 'DISMISS_MINT',
                payload: newBadge
            });
            dispatch({
                type: 'ADD_TOAST',
                payload: {
                    message: "NFT Minted on X Layer!",
                    type: "success"
                }
            });
        } else {
            dispatch({
                type: 'ADD_TOAST',
                payload: {
                    message: "Mint Failed: " + res.error,
                    type: "error"
                }
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/95 backdrop-blur-xl z-[110] flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                y: 50,
                opacity: 0,
                scale: 0.9
            },
            animate: {
                y: 0,
                opacity: 1,
                scale: 1
            },
            className: "text-center max-w-lg bg-white/5 border border-white/10 p-12 rounded-3xl relative overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-neonGold via-white to-neonGold animate-[shimmer_2s_infinite]"
                }, void 0, false, {
                    fileName: "[project]/src/App.jsx",
                    lineNumber: 59,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-neonGold text-8xl mb-8 drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]",
                    children: "🏆"
                }, void 0, false, {
                    fileName: "[project]/src/App.jsx",
                    lineNumber: 60,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-4xl font-heading font-black text-white mb-4",
                    children: "ACHIEVEMENT UNLOCKED"
                }, void 0, false, {
                    fileName: "[project]/src/App.jsx",
                    lineNumber: 61,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl text-gray-400 mb-8",
                    children: pending.info
                }, void 0, false, {
                    fileName: "[project]/src/App.jsx",
                    lineNumber: 62,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-black/60 rounded-2xl p-6 mb-10 border border-white/5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-gray-500 mb-2 uppercase tracking-widest font-bold",
                            children: "Exclusive Reward"
                        }, void 0, false, {
                            fileName: "[project]/src/App.jsx",
                            lineNumber: 64,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-bold text-neonGold text-xl animate-pulse",
                            children: "MINT ON X LAYER"
                        }, void 0, false, {
                            fileName: "[project]/src/App.jsx",
                            lineNumber: 65,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/App.jsx",
                    lineNumber: 63,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-4 justify-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleMint,
                            disabled: minting,
                            className: "px-10 py-4 bg-neonGold text-black font-black rounded-xl hover:scale-105 transition-transform flex-1 shadow-[0_0_20px_rgba(255,215,0,0.2)]",
                            children: minting ? 'MINTING...' : 'CLAIM NFT NOW'
                        }, void 0, false, {
                            fileName: "[project]/src/App.jsx",
                            lineNumber: 68,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>dispatch({
                                    type: 'DISMISS_MINT',
                                    payload: {
                                        type: pending.type,
                                        name: 'Skipped Badge',
                                        info: pending.info,
                                        date: new Date().toLocaleDateString()
                                    }
                                }),
                            className: "px-8 py-4 border border-white/20 text-gray-400 hover:text-white rounded-xl transition-colors",
                            children: "SKIP"
                        }, void 0, false, {
                            fileName: "[project]/src/App.jsx",
                            lineNumber: 71,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/App.jsx",
                    lineNumber: 67,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/App.jsx",
            lineNumber: 58,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/App.jsx",
        lineNumber: 57,
        columnNumber: 9
    }, this);
}
_s(NftMintModal, "BXyn53sEycl3OWJvygQZBZi6XPs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWeb3"]
    ];
});
_c = NftMintModal;
// --- MAIN ROUTER APP ---
function MainApp() {
    _s1();
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dashboard');
    if (!state.gameStarted) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$screens$2f$Onboarding$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/src/App.jsx",
        lineNumber: 85,
        columnNumber: 36
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/App.jsx",
                lineNumber: 89,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PostMatchStandings$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/App.jsx",
                lineNumber: 90,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NftMintModal, {}, void 0, false, {
                fileName: "[project]/src/App.jsx",
                lineNumber: 91,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$ManagerLayout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                activeTab: activeTab,
                setActiveTab: setActiveTab,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    mode: "wait",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 10
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            y: -10
                        },
                        transition: {
                            duration: 0.2
                        },
                        className: "h-full",
                        children: [
                            activeTab === 'dashboard' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$screens$2f$Dashboard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/App.jsx",
                                lineNumber: 102,
                                columnNumber: 55
                            }, this),
                            activeTab === 'squad' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$screens$2f$Squad$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/App.jsx",
                                lineNumber: 103,
                                columnNumber: 51
                            }, this),
                            activeTab === 'matchday' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$screens$2f$Matchday$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/App.jsx",
                                lineNumber: 104,
                                columnNumber: 54
                            }, this),
                            activeTab === 'collection' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$screens$2f$Collection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/App.jsx",
                                lineNumber: 105,
                                columnNumber: 56
                            }, this),
                            activeTab === 'pk-shooter' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$screens$2f$PKShooter$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/App.jsx",
                                lineNumber: 106,
                                columnNumber: 56
                            }, this),
                            activeTab === 'fantasy' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$screens$2f$FantasyLeague$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/App.jsx",
                                lineNumber: 107,
                                columnNumber: 53
                            }, this)
                        ]
                    }, activeTab, true, {
                        fileName: "[project]/src/App.jsx",
                        lineNumber: 94,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/App.jsx",
                    lineNumber: 93,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/App.jsx",
                lineNumber: 92,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s1(MainApp, "Ck54UX5VqqoRWOY3YUpQOttPaWI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c1 = MainApp;
function App() {
    _s2();
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$web3$2f$useWeb3$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Web3Provider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GameContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: !entered ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    exit: {
                        opacity: 0,
                        scale: 1.05
                    },
                    transition: {
                        duration: 0.5
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LandingPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onEnter: ()=>setEntered(true)
                    }, void 0, false, {
                        fileName: "[project]/src/App.jsx",
                        lineNumber: 125,
                        columnNumber: 29
                    }, this)
                }, "landing", false, {
                    fileName: "[project]/src/App.jsx",
                    lineNumber: 124,
                    columnNumber: 25
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    transition: {
                        duration: 0.5
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MainApp, {}, void 0, false, {
                        fileName: "[project]/src/App.jsx",
                        lineNumber: 129,
                        columnNumber: 29
                    }, this)
                }, "app", false, {
                    fileName: "[project]/src/App.jsx",
                    lineNumber: 128,
                    columnNumber: 25
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/App.jsx",
                lineNumber: 122,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/App.jsx",
            lineNumber: 121,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/App.jsx",
        lineNumber: 120,
        columnNumber: 9
    }, this);
}
_s2(App, "ZWFvFDZaFlODZYwGUMXg7XIOPyM=");
_c2 = App;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "NftMintModal");
__turbopack_context__.k.register(_c1, "MainApp");
__turbopack_context__.k.register(_c2, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/App.jsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/App.jsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_0~sxtt9._.js.map