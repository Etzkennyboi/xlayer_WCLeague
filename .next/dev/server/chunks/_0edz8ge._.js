module.exports = [
"[project]/node_modules/axios/index.js [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/node_modules_0enfbcf._.js",
  "server/chunks/[externals]__0b8d4u8._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/axios/index.js [app-route] (ecmascript)");
    });
});
}),
"[project]/src/app/api/pk-payout/route.js [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[project]/src/app/api/pk-payout/route.js [app-route] (ecmascript)");
    });
});
}),
];