export const CONFIG = {
    XLAYER_MAINNET_ID: 196,
    XLAYER_RPC: 'https://rpc.xlayer.tech',
    PREDICTION_MARKET_ADDRESS: process.env.NEXT_PUBLIC_PREDICTION_MARKET_ADDRESS || '0x25b82B010f5FC38417d1d70f62B0f7b37cB3eCc5',
    WORLD_CUP_NFT_ADDRESS: process.env.NEXT_PUBLIC_WORLD_CUP_NFT_ADDRESS || '0x87493aBD5A738c32c4A1b63Af4E470eA2D704Bc6',
    TREASURY_ADDRESS: process.env.NEXT_PUBLIC_TREASURY_ADDRESS || '0x491d07ede06eebf25a3a0ff3ce3b78ca78af4aac' // Defaulting to the active agentic wallet/treasury
};

export const ABIS = {
    PredictionMarket: [
        "function createMarket(string _fixtureId) external",
        "function placeBet(string _fixtureId, uint8 _selection) external payable",
        "function resolveMarket(string _fixtureId, uint8 _winningOutcome) external",
        "function claimWinnings(string _fixtureId) external",
        "function getMarket(string _fixtureId) external view returns (string fixtureId, uint8 outcome, bool isResolved, uint256 totalHomePool, uint256 totalDrawPool, uint256 totalAwayPool)",
        "function markets(string) external view returns (uint8 outcome, bool isResolved, uint256 totalHomePool, uint256 totalDrawPool, uint256 totalAwayPool)",
        "function bets(string, address) external view returns (uint8 selection, uint256 amount, bool claimed)"
    ],
    WorldCupNFT: [
        "function mintBadge(address to, string tokenURI, uint8 badgeType, string matchInfo) external returns (uint256)",
        "function getUserBadges(address user) external view returns (uint256[])",
        "function tokenURI(uint256 tokenId) external view returns (string)",
        "event BadgeMinted(address indexed to, uint256 tokenId, uint8 badgeType, string matchInfo)"
    ]
};
