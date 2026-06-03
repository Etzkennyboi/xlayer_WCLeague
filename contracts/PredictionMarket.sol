// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title PredictionMarket
 * @dev A fully functional Web3 Prediction Market for X-Cup. 
 * Allows users to place bets on 1X2 outcomes in OKB and claim winnings after the Oracle resolves the market.
 */
contract PredictionMarket {
    
    address public owner;
    address public oracleNode; // The address authorized to resolve markets (e.g., pulling from RapidAPI)

    // Unified MatchOutcome aligned directly with the JavaScript mapping
    enum MatchOutcome { UNRESOLVED, HOME_WIN, AWAY_WIN, DRAW }

    struct Market {
        string fixtureId;
        MatchOutcome outcome;
        bool isResolved;
        uint256 totalHomePool;
        uint256 totalDrawPool;
        uint256 totalAwayPool;
    }

    struct Bet {
        MatchOutcome selection;
        uint256 amount;
        bool claimed;
    }

    // Mapping from fixtureId string to Market data
    mapping(string => Market) public markets;
    
    // Mapping from fixtureId => userAddress => Bet
    mapping(string => mapping(address => Bet)) public bets;

    event MarketCreated(string fixtureId);
    event BetPlaced(address indexed user, string fixtureId, MatchOutcome selection, uint256 amount);
    event MarketResolved(string fixtureId, MatchOutcome winningOutcome);
    event WinningsClaimed(address indexed user, string fixtureId, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    modifier onlyOracle() {
        require(msg.sender == oracleNode, "Only oracle node can call this");
        _;
    }

    modifier onlyOwnerOrOracle() {
        require(msg.sender == owner || msg.sender == oracleNode, "Only owner or oracle can call this");
        _;
    }

    constructor(address _oracleNode) {
        owner = msg.sender;
        oracleNode = _oracleNode;
    }

    /**
     * @dev Creates a new betting market for a fixture
     */
    function createMarket(string memory _fixtureId) external onlyOwnerOrOracle {
        require(bytes(markets[_fixtureId].fixtureId).length == 0, "Market already exists");
        
        markets[_fixtureId] = Market({
            fixtureId: _fixtureId,
            outcome: MatchOutcome.UNRESOLVED,
            isResolved: false,
            totalHomePool: 0,
            totalDrawPool: 0,
            totalAwayPool: 0
        });

        emit MarketCreated(_fixtureId);
    }

    /**
     * @dev Places a bet on a specific outcome using native OKB.
     */
    function placeBet(string memory _fixtureId, MatchOutcome _selection) external payable {
        require(msg.value > 0, "Stake must be greater than 0");
        require(bytes(markets[_fixtureId].fixtureId).length > 0, "Market does not exist");
        require(!markets[_fixtureId].isResolved, "Market already resolved");
        require(_selection != MatchOutcome.UNRESOLVED, "Invalid selection");
        require(bets[_fixtureId][msg.sender].amount == 0, "Already placed a bet on this market");

        if (_selection == MatchOutcome.HOME_WIN) {
            markets[_fixtureId].totalHomePool += msg.value;
        } else if (_selection == MatchOutcome.AWAY_WIN) {
            markets[_fixtureId].totalAwayPool += msg.value;
        } else if (_selection == MatchOutcome.DRAW) {
            markets[_fixtureId].totalDrawPool += msg.value;
        }

        bets[_fixtureId][msg.sender] = Bet({
            selection: _selection,
            amount: msg.value,
            claimed: false
        });

        emit BetPlaced(msg.sender, _fixtureId, _selection, msg.value);
    }

    /**
     * @dev Resolves the market. Only callable by the authorized Oracle Node.
     */
    function resolveMarket(string memory _fixtureId, MatchOutcome _winningOutcome) external onlyOracle {
        require(bytes(markets[_fixtureId].fixtureId).length > 0, "Market does not exist");
        require(!markets[_fixtureId].isResolved, "Market already resolved");
        require(_winningOutcome != MatchOutcome.UNRESOLVED, "Invalid winning outcome");

        markets[_fixtureId].outcome = _winningOutcome;
        markets[_fixtureId].isResolved = true;

        emit MarketResolved(_fixtureId, _winningOutcome);
    }

    /**
     * @dev Claims OKB winnings for a resolved market based on pari-mutuel pool calculations.
     */
    function claimWinnings(string memory _fixtureId) external {
        require(markets[_fixtureId].isResolved, "Market not yet resolved");
        
        Bet storage userBet = bets[_fixtureId][msg.sender];
        require(userBet.amount > 0, "No bet placed");
        require(!userBet.claimed, "Winnings already claimed");
        require(userBet.selection == markets[_fixtureId].outcome, "Bet lost");

        userBet.claimed = true;

        uint256 totalPool = markets[_fixtureId].totalHomePool + markets[_fixtureId].totalDrawPool + markets[_fixtureId].totalAwayPool;
        uint256 winningPool = 0;

        if (markets[_fixtureId].outcome == MatchOutcome.HOME_WIN) {
            winningPool = markets[_fixtureId].totalHomePool;
        } else if (markets[_fixtureId].outcome == MatchOutcome.AWAY_WIN) {
            winningPool = markets[_fixtureId].totalAwayPool;
        } else if (markets[_fixtureId].outcome == MatchOutcome.DRAW) {
            winningPool = markets[_fixtureId].totalDrawPool;
        }

        // Calculate payout: (User Stake / Winning Pool) * Total Pool (minus 2% platform fee)
        uint256 grossPayout = (userBet.amount * totalPool) / winningPool;
        uint256 platformFee = (grossPayout * 2) / 100;
        uint256 netPayout = grossPayout - platformFee;

        // Disburse OKB winnings securely to user
        (bool success, ) = payable(msg.sender).call{value: netPayout}("");
        require(success, "OKB transfer failed");

        emit WinningsClaimed(msg.sender, _fixtureId, netPayout);
    }

    /**
     * @dev Returns full details for a market, including the string fixtureId.
     */
    function getMarket(string memory _fixtureId) external view returns (
        string memory fixtureId,
        MatchOutcome outcome,
        bool isResolved,
        uint256 totalHomePool,
        uint256 totalDrawPool,
        uint256 totalAwayPool
    ) {
        Market memory m = markets[_fixtureId];
        return (m.fixtureId, m.outcome, m.isResolved, m.totalHomePool, m.totalDrawPool, m.totalAwayPool);
    }
}
