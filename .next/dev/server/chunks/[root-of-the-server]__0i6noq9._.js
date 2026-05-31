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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/fantasy/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const RAPID_API_KEY = process.env.RAPID_API_KEY || 'e9cc5043dfmsh497d559c44d5bd4p1f6f7ajsn090a62d49229';
const RAPID_API_HOST = 'free-api-live-football-data.p.rapidapi.com';
const headers = {
    'x-rapidapi-key': RAPID_API_KEY,
    'x-rapidapi-host': RAPID_API_HOST,
    'Content-Type': 'application/json'
};
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    try {
        if (action === 'search_players') {
            const search = searchParams.get('search');
            if (!search) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Search term required'
            }, {
                status: 400
            });
            const response = await fetch(`https://${RAPID_API_HOST}/football-players-search?search=${encodeURIComponent(search)}`, {
                headers
            });
            const data = await response.json();
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                locked: isLocked,
                nextChangeAt
            });
        }
        if (action === 'calculate_points') {
            const playersJson = searchParams.get('players');
            if (!playersJson) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'players required'
            }, {
                status: 400
            });
            const players = JSON.parse(playersJson);
            const results = players.map((p)=>{
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
                const totalPoints = goals * 6 + assists * 4 - yellows * 1 - reds * 3 + cleanSheetBonus;
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(results);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Invalid action'
        }, {
            status: 400
        });
    } catch (err) {
        console.error('Fantasy API Error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0i6noq9._.js.map