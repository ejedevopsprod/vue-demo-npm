//const worldsJSON = require("../../sampleData/worlds.json");

const GameService = require("../services/GameService.js");

class GameController {
  constructor() {
    //this._worlds = [];
  }

  get UserWorlds(userId) {
    //get the user worlds from the db
    return GameService.UserWorlds(userId)
  }
}

module.exports = GameController;
