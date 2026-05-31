module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/src/app/api/pk-payout/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
;
;
const dynamic = 'force-dynamic';
const originalFetch = globalThis.fetch;
globalThis.fetch = async (url, options)=>{
    if (options && options.referrer === "client") {
        delete options.referrer;
    }
    return originalFetch(url, options);
};
const COOLDOWN_FILE = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'cooldowns.json');
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours
const RPC_URL = 'https://rpc.xlayer.tech'; // MAINNET RPC
const USDT_ADDRESS = process.env.USDT_CONTRACT_ADDRESS || '0x1E4a5963aBFD975d8c9021ce480b42188849D41d'; // Common Mainnet USDT
const ERC20_ABI = [
    "function transfer(address to, uint amount) returns (bool)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address account) view returns (uint256)"
];
async function getCooldowns() {
    try {
        const data = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(COOLDOWN_FILE, 'utf8');
        return JSON.parse(data);
    } catch  {
        return {}; // File doesn't exist or invalid
    }
}
async function saveCooldowns(cooldowns) {
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(COOLDOWN_FILE), {
            recursive: true
        });
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(COOLDOWN_FILE, JSON.stringify(cooldowns, null, 2));
    } catch (error) {
        console.error('Error saving cooldowns:', error);
    }
}
async function POST(req) {
    try {
        const body = await req.json();
        const { userAddress, action } = body;
        if (!userAddress) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing user address'
            }, {
                status: 400
            });
        }
        const lowerAddress = userAddress.toLowerCase();
        const cooldowns = await getCooldowns();
        const lastPlayTime = cooldowns[lowerAddress] || 0;
        const now = Date.now();
        if (now - lastPlayTime < COOLDOWN_MS) {
            const timeLeft = Math.ceil((COOLDOWN_MS - (now - lastPlayTime)) / 1000);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Cooldown active',
                cooldownActive: true,
                timeLeftSeconds: timeLeft
            }, {
                status: 403
            });
        }
        if (action === 'check') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                message: 'Ready to play'
            });
        }
        // Using OKX Agentic Wallet CLI (Option 2)
        const exec = __turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)").exec;
        const util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
        const execPromise = util.promisify(exec);
        // Record cooldown IMMEDIATELY to prevent double-clicks
        cooldowns[lowerAddress] = now;
        await saveCooldowns(cooldowns);
        console.log(`Sending 1 USDT to ${userAddress} using Agentic Wallet CLI on Mainnet...`);
        // Ensure onchainos path is configurable or available in system PATH
        const onchainosPath = process.env.ONCHAINOS_PATH || 'C:\\Users\\User\\.local\\bin\\onchainos.exe';
        const command = `"${onchainosPath}" wallet send --readable-amount 1 --recipient ${userAddress} --chain xlayer --contract-token ${USDT_ADDRESS} --force`;
        try {
            const { stdout, stderr } = await execPromise(command);
            console.log('CLI Output:', stdout);
            // Extract a txHash from stdout if possible, or just return success
            const txMatch = stdout.match(/0x[a-fA-F0-9]{64}/);
            const txHash = txMatch ? txMatch[0] : 'Transaction Sent';
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                txHash: txHash
            });
        } catch (execError) {
            console.error('CLI Execution Error:', execError);
            throw new Error('Agentic Wallet CLI failed to send transaction');
        }
    } catch (error) {
        console.error('Payout error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0wgzlv~._.js.map