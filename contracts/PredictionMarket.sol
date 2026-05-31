// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title IERC20
 * @dev Basic ERC20 Interface for USDT0 transactions.
 */
interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @title PredictionMarket
 * @dev A fully functional Web3 Prediction Market for X-Cup. 
 * Allows users to place bets on 1X2 outcomes in USDT0 and claim winnings after the Oracle resolves the market.
 */
contract PredictionMarket {
    
    address public owner;
    address public oracleNode; // The address authorized to resolve markets (e.g., pulling from RapidAPI)
    IERC20 public usdt0Token;  // The USDT0 token standard

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

    constructor(address _oracleNode, address _usdt0Token) {
        owner = msg.sender;
        oracleNode = _oracleNode;
        usdt0Token = IERC20(_usdt0Token);
    }

    /**
     * @dev Creates a new betting market for a fixture
     */
    function createMarket(string memory _fixtureId) external onlyOwner {
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
     * @dev Places a bet on a specific outcome using USDT0 tokens.
     */
    function placeBet(string memory _fixtureId, MatchOutcome _selection, uint256 _amount) external {
        require(_amount > 0, "Stake must be greater than 0");
        require(bytes(markets[_fixtureId].fixtureId).length > 0, "Market does not exist");
        require(!markets[_fixtureId].isResolved, "Market already resolved");
        require(_selection != MatchOutcome.UNRESOLVED, "Invalid selection");
        require(bets[_fixtureId][msg.sender].amount == 0, "Already placed a bet on this market");

        // Pull USDT0 tokens from user's wallet (requires pre-approval)
        require(usdt0Token.transferFrom(msg.sender, address(this), _amount), "USDT0 transfer failed");

        if (_selection == MatchOutcome.HOME_WIN) {
            markets[_fixtureId].totalHomePool += _amount;
        } else if (_selection == MatchOutcome.AWAY_WIN) {
            markets[_fixtureId].totalAwayPool += _amount;
        } else if (_selection == MatchOutcome.DRAW) {
            markets[_fixtureId].totalDrawPool += _amount;
        }

        bets[_fixtureId][msg.sender] = Bet({
            selection: _selection,
            amount: _amount,
            claimed: false
        });

        emit BetPlaced(msg.sender, _fixtureId, _selection, _amount);
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
     * @dev Claims USDT0 winnings for a resolved market based on pari-mutuel pool calculations.
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

        // Disburse USDT0 winnings securely to user
        require(usdt0Token.transfer(msg.sender, netPayout), "USDT0 transfer failed");

        emit WinningsClaimed(msg.sender, _fixtureId, netPayout);
    }
}
