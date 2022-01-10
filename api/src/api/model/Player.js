const User = require("./User.js");

class Player extends User {
  constructor() {
    super();
    this._totalScore = 0;
  }

  get TotalScore() {
    return this._totalScore;
  }
  set TotalScore(value) {
    this._totalScore = value;
  }
}

module.exports = Player;
