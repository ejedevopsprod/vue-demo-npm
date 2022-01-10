const World = require("./World.js");
const Player = require("./Player.js");

class Game {
  constructor(
    player = new Player(),
    worlds = new Array(6).fill(undefined).map((e, i) => new World(i))
  ) {
    this._player = player;
    this._worlds = worlds;
  }

  get Player() {
    return this._player;
  }
  //??
  set Player(value) {
    this._player = value;
  }

  get Worlds() {
    return this._worlds;
  }
  //??
  set Worlds(value) {
    this._worlds = value;
  }
}

module.exports = Game;
