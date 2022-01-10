const worldsJSON = require("../../sampleData/worlds.json");
const Game = require("../model/Game.js");
const Player = require("../model/Player.js");
const World = require("../model/World.js");
const WorldService = require("../services/WorldService.js");

class WorldController {
  constructor() {
    this._worldService = new WorldService(new Player());
  }

  async setScore(userName, worldType, score, time) {
    //set the score and time of the user world in the db
    return await this._worldService.setScore(userName, worldType, score, time);
  }

  async setStatus(userName, worldType, active) {
    //set the status of the user world in the db
    return await this._worldService.setStatus(userName, worldType, active);
  }

  async getUserWorlds(userName) {
    return await this._worldService.getUserWorlds(userName);
  }
}

module.exports = WorldController;
