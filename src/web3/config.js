export const CONFIG = {
    XLAYER_TESTNET_ID: 195,
    XLAYER_RPC: 'https://testrpc.xlayer.tech',
    PREDICTION_MARKET_ADDRESS: process.env.NEXT_PUBLIC_PREDICTION_MARKET_ADDRESS || '0x3a1161a0244BdAb218a0e463Bfbe2E1d1F7Ee522',
    WORLD_CUP_NFT_ADDRESS: process.env.NEXT_PUBLIC_WORLD_CUP_NFT_ADDRESS || '0x87493aBD5A738c32c4A1b63Af4E470eA2D704Bc6',
    USDT_ADDRESS: process.env.NEXT_PUBLIC_USDT0_ADDRESS || '0x14712173612c33c8bafd0E7A8916ebd84EE8A6B8'
};

export const ABIS = {
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
