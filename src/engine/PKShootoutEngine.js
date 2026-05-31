export class PKShootoutEngine {
  constructor(canvas, onGameEnd, updateScoreboard) {
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

    this.keeper = { x: 590, y: 410, width: 89, height: 190 };
    this.ball = { x: 595, y: 660, width: 80, height: 80 };

    this.renderInterval = null;
    this.activeIntervals = []; // track all dive/ball intervals for cleanup
    this.isAnimating = false;
    this.boundKeyDown = this.handleKeyDown.bind(this);
  }

  loadAudio() {
    ['oleole', 'whistle', 'cheering', 'win', 'lose'].forEach(name => {
      const audio = new Audio(`/pk-shooter/audio/${name}.mp3`);
      audio.preload = "auto";
      this.audioCache[name] = audio;
    });
  }

  playSound(name) {
    if (this.audioCache[name]) {
      this.audioCache[name].currentTime = 0;
      this.audioCache[name].play().catch(() => {});
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
    setTimeout(() => {
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
    Object.values(this.audioCache).forEach(a => { a.pause(); a.currentTime = 0; });
  }

  clearAllIntervals() {
    if (this.renderInterval) {
      clearInterval(this.renderInterval);
      this.renderInterval = null;
    }
    this.activeIntervals.forEach(id => clearInterval(id));
    this.activeIntervals = [];
  }

  resetPositions() {
    this.keeper = { x: 590, y: 410, width: 89, height: 190 };
    this.ball = { x: 595, y: 660, width: 80, height: 80 };
    this.hopeSoloImageSource = "/pk-shooter/images/solo-ready.png";
  }

  startRenderLoop() {
    if (this.renderInterval) clearInterval(this.renderInterval);
    this.renderInterval = setInterval(() => {
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
      const keyMap = { 'a': 65, 'A': 65, 's': 83, 'S': 83, 'z': 90, 'Z': 90, 'x': 88, 'X': 88 };
      key = keyMap[event.key] || 0;
    }

    if (![65, 83, 90, 88].includes(key)) return;
    if (this.shotInProgress) return; // prevent double-firing

    event.preventDefault();
    this.shotInProgress = true;
    document.removeEventListener('keydown', this.boundKeyDown);

    // Determine goal or save: map key to target quadrant
    const keyToQuadrant = { 65: 1, 83: 2, 90: 3, 88: 4 };
    const shotQuadrant = keyToQuadrant[key];

    // If we have a predicted dive, use it, otherwise random
    if (this.predictedDive) {
      this.diveSelection = this.predictedDive;
      this.predictedDive = null; // consume it
    } else {
      this.diveSelection = [1, 2, 3, 4][Math.floor(Math.random() * 4)];
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

    switch (keyPressed) {
      case 65: start = setInterval(topLeft, 10); break;
      case 83: start = setInterval(topRight, 10); break;
      case 90: start = setInterval(bottomLeft, 10); break;
      case 88: start = setInterval(bottomRight, 10); break;
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
    switch (this.diveSelection) {
      case 1: start = setInterval(topLeft, 1); break;
      case 2: start = setInterval(topRight, 1); break;
      case 3: start = setInterval(bottomLeft, 1); break;
      case 4: start = setInterval(bottomRight, 1); break;
    }
    if (start) this.activeIntervals.push(start);

    // Determine goal or save: map key to target quadrant
    // A=65 → topLeft=1, S=83 → topRight=2, Z=90 → bottomLeft=3, X=88 → bottomRight=4
    const keyToQuadrant = { 65: 1, 83: 2, 90: 3, 88: 4 };
    const shotQuadrant = keyToQuadrant[keyPressed];

    this.attempt++;
    if (this.diveSelection === shotQuadrant) {
      this.scoresArr.push("save");
    } else {
      this.score++;
      this.scoresArr.push("goal");
    }

    if (this.updateScoreboard) this.updateScoreboard([...this.scoresArr]);
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
      setTimeout(() => {
        this.stop();
        this.onGameEnd({ won, score: this.score, attempts: 5 });
      }, 1100);
    } else {
      // Next shot — reset after delay
      this.playSound('cheering');
      setTimeout(() => {
        // Clear old ball/keeper movement intervals before resetting
        this.activeIntervals.forEach(id => clearInterval(id));
        this.activeIntervals = [];

        this.resetPositions();
        this.shotInProgress = false;
        document.addEventListener('keydown', this.boundKeyDown);
      }, 2200);
    }
  }
}
