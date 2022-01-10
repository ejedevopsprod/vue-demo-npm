//const User = require("./user");
const worldsJSON = require("../../sampleData/worlds.json");

class GameService {
    constructor() {
    }

    get UserWorlds(userId) {
        //get the user worlds from the db
        return worldsJSON
    }
}

module.exports = GameService;